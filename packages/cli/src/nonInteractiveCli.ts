/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  Config,
  ServerGeminiStreamEvent,
  ToolCallRequestInfo,
  ToolCallResponseInfo,
} from '@psd-tech/gusqwen-core';
import { isSlashCommand } from './ui/utils/commandUtils.js';
import type { LoadedSettings } from './config/settings.js';
import {
  executeToolCall,
  shutdownTelemetry,
  isTelemetrySdkInitialized,
  GeminiEventType,
  FatalInputError,
  promptIdContext,
  OutputFormat,
  InputFormat,
  uiTelemetryService,
  ToolErrorType,
} from '@psd-tech/gusqwen-core';
import type { Content, Part, PartListUnion } from '@google/genai';
import type { CLIUserMessage, PermissionMode } from './nonInteractive/types.js';
import type { JsonOutputAdapterInterface } from './nonInteractive/io/BaseJsonOutputAdapter.js';
import { JsonOutputAdapter } from './nonInteractive/io/JsonOutputAdapter.js';
import { StreamJsonOutputAdapter } from './nonInteractive/io/StreamJsonOutputAdapter.js';
import type { ControlService } from './nonInteractive/control/ControlService.js';

import { handleSlashCommand } from './nonInteractiveCliCommands.js';
import { handleAtCommand } from './ui/hooks/atCommandProcessor.js';
import {
  handleError,
  handleToolError,
  handleCancellationError,
  handleMaxTurnsExceededError,
} from './utils/errors.js';
import {
  normalizePartList,
  extractPartsFromUserMessage,
  buildSystemMessage,
  createTaskToolProgressHandler,
  computeUsageFromMetrics,
} from './utils/nonInteractiveHelpers.js';

/**
 * Provides optional overrides for `runNonInteractive` execution.
 *
 * @param abortController - Optional abort controller for cancellation.
 * @param adapter - Optional JSON output adapter for structured output formats.
 * @param userMessage - Optional CLI user message payload for preformatted input.
 * @param controlService - Optional control service for future permission handling.
 */
export interface RunNonInteractiveOptions {
  abortController?: AbortController;
  adapter?: JsonOutputAdapterInterface;
  userMessage?: CLIUserMessage;
  controlService?: ControlService;
}

/**
 * Executes the non-interactive CLI flow for a single request.
 */
export async function runNonInteractive(
  config: Config,
  settings: LoadedSettings,
  input: string,
  prompt_id: string,
  options: RunNonInteractiveOptions = {},
): Promise<void> {
  return promptIdContext.run(prompt_id, async () => {
    // Create output adapter based on format
    let adapter: JsonOutputAdapterInterface | undefined;
    const outputFormat = config.getOutputFormat();

    if (options.adapter) {
      adapter = options.adapter;
    } else if (outputFormat === OutputFormat.JSON) {
      adapter = new JsonOutputAdapter(config);
    } else if (outputFormat === OutputFormat.STREAM_JSON) {
      adapter = new StreamJsonOutputAdapter(
        config,
        config.getIncludePartialMessages(),
      );
    }

    // Get readonly values once at the start
    const sessionId = config.getSessionId();
    const permissionMode = config.getApprovalMode() as PermissionMode;

    let turnCount = 0;
    let totalApiDurationMs = 0;
    const startTime = Date.now();
    let assistantMessageStarted = false;
    let assistantMessageFinalized = false;
    const debug = config.getDebugMode();

    const stdoutErrorHandler = (err: NodeJS.ErrnoException) => {
      if (err.code === 'EPIPE') {
        process.stdout.removeListener('error', stdoutErrorHandler);
        process.exit(0);
      }
    };

    const geminiClient = config.getGeminiClient();
    const abortController = options.abortController ?? new AbortController();

    // Setup signal handlers for graceful shutdown
    const shutdownHandler = () => {
      if (config.getDebugMode()) {
        console.error('[runNonInteractive] Shutdown signal received');
      }
      abortController.abort();
    };

    try {
      process.stdout.on('error', stdoutErrorHandler);

      process.on('SIGINT', shutdownHandler);
      process.on('SIGTERM', shutdownHandler);

      let initialPartList: PartListUnion | null = extractPartsFromUserMessage(
        options.userMessage,
      );

      if (!initialPartList) {
        let slashHandled = false;
        if (isSlashCommand(input)) {
          const slashCommandResult = await handleSlashCommand(
            input,
            abortController,
            config,
            settings,
          );
          if (slashCommandResult) {
            // A slash command can replace the prompt entirely; fall back to @-command processing otherwise.
            initialPartList = slashCommandResult as PartListUnion;
            slashHandled = true;
          }
        }

        if (!slashHandled) {
          const { processedQuery, shouldProceed } = await handleAtCommand({
            query: input,
            config,
            addItem: (_item, _timestamp) => 0,
            onDebugMessage: () => {},
            messageId: Date.now(),
            signal: abortController.signal,
          });

          if (!shouldProceed || !processedQuery) {
            // An error occurred during @include processing (e.g., file not found).
            // The error message is already logged by handleAtCommand.
            throw new FatalInputError(
              'Exiting due to an error processing the @ command.',
            );
          }
          initialPartList = processedQuery as PartListUnion;
        }
      }

      if (!initialPartList) {
        initialPartList = [{ text: input }];
      }

      const initialParts = normalizePartList(initialPartList);
      const originalUserParts = [...initialParts];
      const baseUserMessage: Content = { role: 'user', parts: initialParts };

      if (adapter) {
        const systemMessage = await buildSystemMessage(
          config,
          sessionId,
          permissionMode,
        );
        adapter.emitMessage(systemMessage);
      }

      // let isFirstTurn = true;
      while (true) {
        turnCount++;
        if (
          config.getMaxSessionTurns() >= 0 &&
          turnCount > config.getMaxSessionTurns()
        ) {
          handleMaxTurnsExceededError(config);
        }

        const shouldStream = config.shouldStreamResponses();
        if (config.getDebugMode()) {
          console.error(`[runNonInteractive] Streaming mode: ${shouldStream}`);
        }
        const apiStartTime = Date.now();
        let sawVisibleEvent = false;
        let sawAssistantContent = false;
        let streamError: Error | null = null;
        const toolCallRequests: ToolCallRequestInfo[] = [];

        // Start assistant message lazily on first visible event to avoid empty messages
        assistantMessageStarted = false;
        assistantMessageFinalized = false;
        const finalizeAssistantMessageIfNeeded = () => {
          if (adapter && assistantMessageStarted && !assistantMessageFinalized) {
            try {
              adapter.finalizeAssistantMessage();
              assistantMessageFinalized = true;
            } catch (finalizeError) {
              if (config.getDebugMode()) {
                console.error(
                  '[runNonInteractive] Failed to finalize assistant message after error:',
                  finalizeError,
                );
              }
            }
          }
        };

        const handleGeminiEvent = (event: ServerGeminiStreamEvent) => {
          if (abortController.signal.aborted) {
            handleCancellationError(config);
          }
          if (event.type === GeminiEventType.Error) {
            const message =
              event.value?.error?.message ??
              'Неизвестная ошибка модели (GeminiEventType.Error).';
            streamError = new Error(message);
            return;
          }

          if (event.type === GeminiEventType.SessionTokenLimitExceeded) {
            const message =
              event.value?.message ??
              'Превышен лимит токенов сессии (GeminiEventType.SessionTokenLimitExceeded).';
            streamError = new Error(message);
            return;
          }

          if (event.type === GeminiEventType.Retry) {
            // Очистим накопленное сообщение перед повторной попыткой,
            // чтобы не продублировать ранее эмиттированные куски.
            toolCallRequests.length = 0;
            finalizeAssistantMessageIfNeeded();
            assistantMessageStarted = false;
            assistantMessageFinalized = false;
            return;
          }

          if (adapter) {
            // Use adapter for all event processing
            if (!assistantMessageStarted) {
              adapter.startAssistantMessage();
              assistantMessageStarted = true;
              assistantMessageFinalized = false;
            }
            adapter.processEvent(event);
            if (event.type === GeminiEventType.ToolCallRequest) {
              toolCallRequests.push(event.value);
            }
          } else {
            // Text output mode - direct stdout
            if (event.type === GeminiEventType.Thought) {
              process.stdout.write(event.value.description);
            } else if (event.type === GeminiEventType.Content) {
              process.stdout.write(event.value);
            } else if (event.type === GeminiEventType.ToolCallRequest) {
              toolCallRequests.push(event.value);
            }
          }

          if (
            event.type === GeminiEventType.Content ||
            event.type === GeminiEventType.ToolCallRequest ||
            event.type === GeminiEventType.ToolCallResponse ||
            event.type === GeminiEventType.Thought ||
            event.type === GeminiEventType.Citation
          ) {
            sawVisibleEvent = true;
          }

          if (
            event.type === GeminiEventType.Content ||
            event.type === GeminiEventType.ToolCallResponse ||
            event.type === GeminiEventType.Thought ||
            event.type === GeminiEventType.Citation
          ) {
            sawAssistantContent = true;
          }
        };

        if (shouldStream) {
          // --- STREAM MODE ---
          const responseStream = geminiClient.sendMessageStream(
            baseUserMessage.parts || [],
            abortController.signal,
            prompt_id,
          );

          try {
            for await (const event of responseStream) {
              handleGeminiEvent(event);
              if (debug) {
                const payload =
                  event.type === GeminiEventType.Content ||
                  event.type === GeminiEventType.Thought ||
                  event.type === GeminiEventType.Citation
                    ? String(
                        (event as { value?: unknown }).value ?? '',
                      ).slice(0, 120)
                    : '';
                console.error(
                  `[runNonInteractive][turn=${turnCount}] event=${event.type}${payload ? ` payload="${payload.replace(/\n/g, ' ')}"` : ''}`,
                );
              }
            }
          } catch (err) {
            streamError = err instanceof Error ? err : new Error(String(err));
          }
        } else {
          // --- SYNC MODE ---
          const responseStream = geminiClient.sendMessageSync(
            baseUserMessage.parts || [],
            abortController.signal,
            prompt_id,
          );

          try {
            for await (const event of responseStream) {
              handleGeminiEvent(event);
              if (debug) {
                const payload =
                  event.type === GeminiEventType.Content ||
                  event.type === GeminiEventType.Thought ||
                  event.type === GeminiEventType.Citation
                    ? String(
                        (event as { value?: unknown }).value ?? '',
                      ).slice(0, 120)
                    : '';
                console.error(
                  `[runNonInteractive][turn=${turnCount}] event=${event.type}${payload ? ` payload="${payload.replace(/\n/g, ' ')}"` : ''}`,
                );
              }
            }
          } catch (err) {
            streamError = err instanceof Error ? err : new Error(String(err));
          }
        }

        totalApiDurationMs += Date.now() - apiStartTime;

        // --- Обработка ошибок потока (общая для обоих режимов) ---
        if (streamError) {
          const errorMessage = `Ошибка отправки запроса к модели: ${streamError.message}`;
          if (adapter) {
            finalizeAssistantMessageIfNeeded();
            const metrics = uiTelemetryService.getMetrics();
            const usage = computeUsageFromMetrics(metrics);
            const stats =
              outputFormat === OutputFormat.JSON
                ? uiTelemetryService.getMetrics()
                : undefined;
            adapter.emitResult({
              isError: true,
              durationMs: Date.now() - startTime,
              apiDurationMs: totalApiDurationMs,
              numTurns: turnCount,
              errorMessage,
              usage,
              stats,
            });
            return;
          } else {
            handleError(streamError, config);
            return;
          }
        }

        // --- Обработка пустого ответа (только если не было ошибок) ---
        if (!sawVisibleEvent) {
          const emptyErrorMessage = 'Модель вернула пустой ответ.';
          if (adapter) {
            const metrics = uiTelemetryService.getMetrics();
            const usage = computeUsageFromMetrics(metrics);
            const stats =
              outputFormat === OutputFormat.JSON
                ? uiTelemetryService.getMetrics()
                : undefined;
            adapter.emitResult({
              isError: true,
              durationMs: Date.now() - startTime,
              apiDurationMs: totalApiDurationMs,
              numTurns: turnCount,
              errorMessage: emptyErrorMessage,
              usage,
              stats,
            });
            return;
          } else {
            handleError(new Error(emptyErrorMessage), config);
            return;
          }
        }

        if (toolCallRequests.length > 0) {
          const toolResponseParts: Part[] = [];

          for (const requestInfo of toolCallRequests) {
            const finalRequestInfo = requestInfo;

            const inputFormat =
              typeof config.getInputFormat === 'function'
                ? config.getInputFormat()
                : InputFormat.TEXT;
            const toolCallUpdateCallback =
              inputFormat === InputFormat.STREAM_JSON && options.controlService
                ? options.controlService.permission.getToolCallUpdateCallback()
                : undefined;

            // Only pass outputUpdateHandler for Task tool
            const isTaskTool = finalRequestInfo.name === 'task';
            const taskToolProgress = isTaskTool
              ? createTaskToolProgressHandler(
                  config,
                  finalRequestInfo.callId,
                  adapter,
                )
              : undefined;
            const taskToolProgressHandler = taskToolProgress?.handler;
            let toolResponse: ToolCallResponseInfo;
            try {
              toolResponse = await executeToolCall(
                config,
                finalRequestInfo,
                abortController.signal,
                isTaskTool && taskToolProgressHandler
                  ? {
                    outputUpdateHandler: taskToolProgressHandler,
                    onToolCallsUpdate: toolCallUpdateCallback,
                  }
                : toolCallUpdateCallback
                  ? {
                      onToolCallsUpdate: toolCallUpdateCallback,
                    }
                  : undefined,
              );
            } catch (toolErr) {
              const error =
                toolErr instanceof Error ? toolErr : new Error(String(toolErr));
              toolResponse = {
                callId: finalRequestInfo.callId,
                responseParts: [],
                resultDisplay: error.message,
                error,
                errorType: ToolErrorType.EXECUTION_FAILED,
              };
              if (debug) {
                console.error(
                  `[runNonInteractive] Tool execution threw: ${error.message}`,
                );
              }
            }

            // Log the tool call result to stdout
            // process.stdout.write(
            //   `[TOOL_CALL_RESULT] ${JSON.stringify(toolResponse)}\n`,
            // );

            // Note: In JSON mode, subagent messages are automatically added to the main
            // adapter's messages array and will be output together on emitResult()

            if (toolResponse.error) {
              if (!adapter) {
                // In text mode, still log via handler
                handleToolError(
                  finalRequestInfo.name,
                  toolResponse.error,
                  config,
                  toolResponse.errorType || 'TOOL_EXECUTION_ERROR',
                  typeof toolResponse.resultDisplay === 'string'
                    ? toolResponse.resultDisplay
                    : undefined,
                );
              } else if (debug) {
                console.error(
                  `[runNonInteractive] Tool error (non-fatal in JSON/STREAM_JSON): ${toolResponse.error.message}`,
                );
              }
            }

            if (adapter) {
              adapter.emitToolResult(finalRequestInfo, toolResponse);
            }

            if (toolResponse.responseParts) {
              toolResponseParts.push(...toolResponse.responseParts);
            } else {
              const fallbackText =
                (typeof toolResponse.resultDisplay === 'string'
                  ? toolResponse.resultDisplay
                  : null) ??
                (toolResponse.error ? toolResponse.error.message : null) ??
                `Инструмент ${finalRequestInfo.name} не вернул данных.`;

              toolResponseParts.push({ text: fallbackText });
            }
          }
          // Следующий запрос строим из исходного запроса + ответов инструментов,
          // чтобы модель не теряла контекст задачи.
          baseUserMessage.parts = [...originalUserParts, ...toolResponseParts];
          if (debug) {
            const preview =
              (baseUserMessage.parts[0] && 'text' in baseUserMessage.parts[0]
                ? (baseUserMessage.parts[0] as { text?: string }).text ?? ''
                : ''
              ).slice(0, 120);
            console.error(
              `[runNonInteractive][turn=${turnCount}] next prompt parts=${baseUserMessage.parts.length} preview="${preview.replace(/\n/g, ' ')}"`,
            );
          }
        } else {
          // Пустой ответ без контента/тулколов считаем ошибкой, чтобы не возвращать "успех" с пустым result.
          if (!sawVisibleEvent) {
            const emptyErrorMessage = 'Модель вернула пустой ответ.';
            if (adapter) {
              finalizeAssistantMessageIfNeeded();
              const metrics = uiTelemetryService.getMetrics();
              const usage = computeUsageFromMetrics(metrics);
              const stats =
                outputFormat === OutputFormat.JSON
                  ? uiTelemetryService.getMetrics()
                  : undefined;
              adapter.emitResult({
                isError: true,
                durationMs: Date.now() - startTime,
                apiDurationMs: totalApiDurationMs,
                numTurns: turnCount,
                errorMessage: emptyErrorMessage,
                usage,
                stats,
              });
              return;
            } else {
              handleError(new Error(emptyErrorMessage), config);
            }
          }

          // Если не получили ни одного текстового/мыслительного события — считаем отсутствие финального ответа.
          if (!sawAssistantContent) {
            const noContentMessage =
              'Модель не вернула финальный ответ (нет текстовых событий).';
            if (adapter) {
              finalizeAssistantMessageIfNeeded();
              const metrics = uiTelemetryService.getMetrics();
              const usage = computeUsageFromMetrics(metrics);
              const stats =
                outputFormat === OutputFormat.JSON
                  ? uiTelemetryService.getMetrics()
                  : undefined;
              adapter.emitResult({
                isError: true,
                durationMs: Date.now() - startTime,
                apiDurationMs: totalApiDurationMs,
                numTurns: turnCount,
                errorMessage: noContentMessage,
                usage,
                stats,
              });
              return;
            } else {
              handleError(new Error(noContentMessage), config);
              return;
            }
          }

          // For JSON and STREAM_JSON modes, compute usage from metrics
          if (adapter) {
            finalizeAssistantMessageIfNeeded();
            const metrics = uiTelemetryService.getMetrics();
            const usage = computeUsageFromMetrics(metrics);
            // Get stats for JSON format output
            const stats =
              outputFormat === OutputFormat.JSON
                ? uiTelemetryService.getMetrics()
                : undefined;
            adapter.emitResult({
              isError: false,
              durationMs: Date.now() - startTime,
              apiDurationMs: totalApiDurationMs,
              numTurns: turnCount,
              usage,
              stats,
            });
          } else {
            // Text output mode - no usage needed
            process.stdout.write('\n');
          }
          return;
        }
      }
    } catch (error) {
      // For JSON and STREAM_JSON modes, compute usage from metrics
      const message = error instanceof Error ? error.message : String(error);
      // process.stdout.write(`[AGENT_ERROR] ${message}\n`);
      if (adapter) {
        // Ensure the assistant message is closed so streaming consumers receive message_stop
        if (assistantMessageStarted && !assistantMessageFinalized) {
          try {
            adapter.finalizeAssistantMessage();
            assistantMessageFinalized = true;
          } catch (finalizeError) {
            if (config.getDebugMode()) {
              console.error(
                '[runNonInteractive] Failed to finalize assistant message in error path:',
                finalizeError,
              );
            }
          }
        }
        const metrics = uiTelemetryService.getMetrics();
        const usage = computeUsageFromMetrics(metrics);
        // Get stats for JSON format output
        const stats =
          outputFormat === OutputFormat.JSON
            ? uiTelemetryService.getMetrics()
            : undefined;
        adapter.emitResult({
          isError: true,
          durationMs: Date.now() - startTime,
          apiDurationMs: totalApiDurationMs,
          numTurns: turnCount,
          errorMessage: message,
          usage,
          stats,
        });
      }
      handleError(error, config);
    } finally {
      process.stdout.removeListener('error', stdoutErrorHandler);
      // Cleanup signal handlers
      process.removeListener('SIGINT', shutdownHandler);
      process.removeListener('SIGTERM', shutdownHandler);
      if (isTelemetrySdkInitialized()) {
        await shutdownTelemetry(config);
      }
    }
  });
}
