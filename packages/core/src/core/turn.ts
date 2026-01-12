/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  Part,
  PartListUnion,
  GenerateContentResponse,
  FunctionCall,
  FunctionDeclaration,
  FinishReason,
  GenerateContentResponseUsageMetadata,
} from '@google/genai';
import type {
  ToolCallConfirmationDetails,
  ToolResult,
  ToolResultDisplay,
} from '../tools/tools.js';
import type { ToolErrorType } from '../tools/tool-error.js';
import { getResponseText } from '../utils/partUtils.js';
import { reportError } from '../utils/errorReporting.js';
import {
  getErrorMessage,
  UnauthorizedError,
  toFriendlyError,
} from '../utils/errors.js';
import type { GeminiChat, StreamEvent } from './geminiChat.js';
import { StreamEventType } from './geminiChat.js';
import { parseThought, type ThoughtSummary } from '../utils/thoughtUtils.js';
import { ThoughtStreamParser } from '../utils/thoughtStreamParser.js';
import { ToolCallStreamParser } from '../utils/toolCallParser.js';

// Define a structure for tools passed to the server
export interface ServerTool {
  name: string;
  schema: FunctionDeclaration;
  // The execute method signature might differ slightly or be wrapped
  execute(
    params: Record<string, unknown>,
    signal?: AbortSignal,
  ): Promise<ToolResult>;
  shouldConfirmExecute(
    params: Record<string, unknown>,
    abortSignal: AbortSignal,
  ): Promise<ToolCallConfirmationDetails | false>;
}

export enum GeminiEventType {
  Content = 'content',
  ToolCallRequest = 'tool_call_request',
  ToolCallResponse = 'tool_call_response',
  ToolCallConfirmation = 'tool_call_confirmation',
  UserCancelled = 'user_cancelled',
  Error = 'error',
  ChatCompressed = 'chat_compressed',
  Thought = 'thought',
  MaxSessionTurns = 'max_session_turns',
  SessionTokenLimitExceeded = 'session_token_limit_exceeded',
  Finished = 'finished',
  LoopDetected = 'loop_detected',
  Citation = 'citation',
  Retry = 'retry',
}

export type ServerGeminiRetryEvent = {
  type: GeminiEventType.Retry;
};

export interface StructuredError {
  message: string;
  status?: number;
}

export interface GeminiErrorEventValue {
  error: StructuredError;
}

export interface SessionTokenLimitExceededValue {
  currentTokens: number;
  limit: number;
  message: string;
}

export interface GeminiFinishedEventValue {
  reason: FinishReason | undefined;
  usageMetadata: GenerateContentResponseUsageMetadata | undefined;
}

export interface ToolCallRequestInfo {
  callId: string;
  name: string;
  args: Record<string, unknown>;
  isClientInitiated: boolean;
  prompt_id: string;
  response_id?: string;
}

export interface ToolCallResponseInfo {
  callId: string;
  responseParts: Part[];
  resultDisplay: ToolResultDisplay | undefined;
  error: Error | undefined;
  errorType: ToolErrorType | undefined;
  outputFile?: string | undefined;
  contentLength?: number;
  toolRequest?: ToolCallRequestInfo;
}

export interface ServerToolCallConfirmationDetails {
  request: ToolCallRequestInfo;
  details: ToolCallConfirmationDetails;
}

export type ServerGeminiContentEvent = {
  type: GeminiEventType.Content;
  value: string;
};

export type ServerGeminiThoughtEvent = {
  type: GeminiEventType.Thought;
  value: ThoughtSummary;
};

export type ServerGeminiToolCallRequestEvent = {
  type: GeminiEventType.ToolCallRequest;
  value: ToolCallRequestInfo;
};

export type ServerGeminiToolCallResponseEvent = {
  type: GeminiEventType.ToolCallResponse;
  value: ToolCallResponseInfo;
};

export type ServerGeminiToolCallConfirmationEvent = {
  type: GeminiEventType.ToolCallConfirmation;
  value: ServerToolCallConfirmationDetails;
};

export type ServerGeminiUserCancelledEvent = {
  type: GeminiEventType.UserCancelled;
};

export type ServerGeminiErrorEvent = {
  type: GeminiEventType.Error;
  value: GeminiErrorEventValue;
};

export enum CompressionStatus {
  /** The compression was successful */
  COMPRESSED = 1,

  /** The compression failed due to the compression inflating the token count */
  COMPRESSION_FAILED_INFLATED_TOKEN_COUNT,

  /** The compression failed due to an error counting tokens */
  COMPRESSION_FAILED_TOKEN_COUNT_ERROR,

  /** The compression failed due to receiving an empty or null summary */
  COMPRESSION_FAILED_EMPTY_SUMMARY,

  /** The compression was not necessary and no action was taken */
  NOOP,
}

export interface ChatCompressionInfo {
  originalTokenCount: number;
  newTokenCount: number;
  compressionStatus: CompressionStatus;
}

export type ServerGeminiChatCompressedEvent = {
  type: GeminiEventType.ChatCompressed;
  value: ChatCompressionInfo | null;
};

export type ServerGeminiMaxSessionTurnsEvent = {
  type: GeminiEventType.MaxSessionTurns;
};

export type ServerGeminiSessionTokenLimitExceededEvent = {
  type: GeminiEventType.SessionTokenLimitExceeded;
  value: SessionTokenLimitExceededValue;
};

export type ServerGeminiFinishedEvent = {
  type: GeminiEventType.Finished;
  value: GeminiFinishedEventValue;
};

export type ServerGeminiLoopDetectedEvent = {
  type: GeminiEventType.LoopDetected;
};

export type ServerGeminiCitationEvent = {
  type: GeminiEventType.Citation;
  value: string;
};

// The original union type, now composed of the individual types
export type ServerGeminiStreamEvent =
  | ServerGeminiChatCompressedEvent
  | ServerGeminiCitationEvent
  | ServerGeminiContentEvent
  | ServerGeminiErrorEvent
  | ServerGeminiFinishedEvent
  | ServerGeminiLoopDetectedEvent
  | ServerGeminiMaxSessionTurnsEvent
  | ServerGeminiThoughtEvent
  | ServerGeminiToolCallConfirmationEvent
  | ServerGeminiToolCallRequestEvent
  | ServerGeminiToolCallResponseEvent
  | ServerGeminiUserCancelledEvent
  | ServerGeminiSessionTokenLimitExceededEvent
  | ServerGeminiRetryEvent;

function stableStringify(x: unknown): string {
  if (x === null || typeof x !== 'object') return JSON.stringify(x);
  if (Array.isArray(x)) return `[${x.map(stableStringify).join(',')}]`;
  const entries = Object.entries(x as Record<string, unknown>)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`);
  return `{${entries.join(',')}}`;
}

function stableArgsSig(obj: unknown): string {
  try {
    return stableStringify(obj);
  } catch {
    return JSON.stringify(obj);
  }
}

// A turn manages the agentic loop turn within the server context.
export class Turn {
  readonly pendingToolCalls: ToolCallRequestInfo[] = [];
  private debugResponses: GenerateContentResponse[] = [];
  private pendingCitations = new Set<string>();
  finishReason: FinishReason | undefined = undefined;
  private hasActionWords = false;
  private hadTruncatedToolCall = false;
  private currentResponseId?: string;
  private readonly thoughtTextParser = new ThoughtStreamParser();
  private retryCount: number = 0;
  private readonly MAX_RETRIES: number = 4;
  private emptyResponseErrorRetries = 0;
  private readonly MAX_EMPTY_RESPONSE_ERROR_RETRIES = 2;
  private seenToolCalls = new Set<string>();
  private hasVisibleContentOrToolCall = false;
  private toolCallParser = new ToolCallStreamParser();

  constructor(
    private readonly chat: GeminiChat,
    private readonly prompt_id: string,
  ) {}

  // The run method yields simpler events suitable for server logic
  async *run(
    model: string,
    req: PartListUnion,
    signal: AbortSignal,
    mode: 'stream' | 'sync' = 'sync',
  ): AsyncGenerator<ServerGeminiStreamEvent> {
    try {
      // Reset tool call text buffer at the start of each run
      this.toolCallParser.reset();
      this.thoughtTextParser.reset();
      this.hasVisibleContentOrToolCall = false;
      this.hasActionWords = false;
      this.hadTruncatedToolCall = false;

      let responseStream: AsyncGenerator<StreamEvent>;
      if (mode === 'stream') {
        responseStream = await this.chat.sendMessageStream(
          model,
          {
            message: req,
            config: {
              abortSignal: signal,
            },
          },
          this.prompt_id,
        );
      } else {
        const response = await this.chat.sendMessage(
          model,
          {
            message: req,
            config: {
              abortSignal: signal,
            },
          },
          this.prompt_id,
        );
        const pendingEvents = this.chat.drainPendingSyncStreamEvents();
        responseStream = (async function* () {
          for (const pendingEvent of pendingEvents) {
            yield pendingEvent;
          }
          yield { type: StreamEventType.CHUNK, value: response };
        })();
      }

      for await (const streamEvent of responseStream) {
        if (signal?.aborted) {
          yield { type: GeminiEventType.UserCancelled };
          return;
        }

        // Handle the new RETRY event
        if (streamEvent.type === 'retry') {
          yield { type: GeminiEventType.Retry };
          continue; // Skip to the next event in the stream
        }

        // Assuming other events are chunks with a `value` property
        const resp = streamEvent.value as GenerateContentResponse;
        if (!resp) continue; // Skip if there's no response body

        this.debugResponses.push(resp);

        // Track the current response ID for tool call correlation
        if (resp.responseId) {
          this.currentResponseId = resp.responseId;
        }

        // Проверяем, является ли ответ пустым
        // Support OpenAI-style "choices" payloads in addition to Gemini "candidates"
        const choice = (
          resp as unknown as {
            choices?: Array<{
              message?: { content?: string | null };
              finish_reason?: FinishReason | string | null;
            }>;
          }
        ).choices?.[0];

        const candidate = resp.candidates?.[0];
        const hasParts = (candidate?.content?.parts?.length ?? 0) > 0;
        const hasFunctionCalls = (resp.functionCalls?.length ?? 0) > 0;
        const openAiToolCalls = this.extractOpenAiToolCalls(resp);
        const hasOpenAiToolCalls = openAiToolCalls.length > 0;
        const choiceContent =
          typeof choice?.message?.content === 'string'
            ? (choice.message.content as string)
            : '';
        const finishReason =
          candidate?.finishReason ??
          (choice?.finish_reason as FinishReason | undefined | null) ??
          undefined;

        // Consider responses with no parts or function calls as empty. The
        // hasVisibleContentOrToolCall flag keeps us from retrying after we've
        // already seen meaningful output.
        const isResponseEmpty =
          !hasParts &&
          !hasFunctionCalls &&
          !hasOpenAiToolCalls &&
          !choiceContent &&
          !this.hasVisibleContentOrToolCall;

        if (isResponseEmpty && this.retryCount < this.MAX_RETRIES) {
          this.retryCount++;
          // Завершаем текущий стрим (если поддерживает return), чтобы не держать
          // открытое соединение перед повтором.
          if (typeof (responseStream as AsyncGenerator).return === 'function') {
            try {
              await (responseStream as AsyncGenerator).return(undefined);
            } catch {
              /* ignore */
            }
          }

          // Повторная отправка запроса при пустом ответе
          yield { type: GeminiEventType.Retry };
          // Повторяем текущий запрос
          for await (const event of this.run(model, req, signal, mode)) {
            yield event;
          }
          return;
        } else if (isResponseEmpty) {
          // Если превышено максимальное количество попыток, возвращаем ошибку
          yield {
            type: GeminiEventType.Error,
            value: {
              error: {
                message: `Превышено максимальное количество попыток (${this.MAX_RETRIES}) для получения непустого ответа`,
                status: 500,
              },
            },
          };
          return;
        }

        // Сбрасываем счетчик попыток при получении непустого ответа
        this.retryCount = 0;

        const parts = resp.candidates?.[0]?.content?.parts ?? [];
        const firstPart = parts[0];

        // Берём текст целиком, будем его по ходу чистить от <think>
        let text = getResponseText(resp) ?? choiceContent;

        // Track if we have seen any visible content or tool markers; helps
        // distinguish a terminating chunk with only finishReason from a
        // genuinely empty first chunk.
        this.hasVisibleContentOrToolCall ||= Boolean(
          (text && text.trim().length > 0) ||
          hasFunctionCalls ||
          hasOpenAiToolCalls,
        );

        // 1) Gemini-стиль: отдельное поле `thought` в первом part'е
        if (firstPart?.thought) {
          const rawThoughtText = firstPart.text ?? text;
          const thought = parseThought(rawThoughtText);
          yield {
            type: GeminiEventType.Thought,
            value: thought,
          };
        }

        // 2) Всегда прогоняем текст через стриминговый парсер <think>...</think>
        //    Он:
        //    - накапливает обрывки внутри себя
        //    - эмитит Thought-события, как только увидел закрывающий тег
        //    - возвращает "видимый" текст без мыслей
        if (text) {
          const { thoughts, visibleText } =
            this.thoughtTextParser.parseChunk(text);

          for (const rawThought of thoughts) {
            yield {
              type: GeminiEventType.Thought,
              value: parseThought(rawThought),
            };
          }

          text = visibleText;
        }

        const hasNativeCalls = (resp.functionCalls ?? []).length > 0;

        if (hasNativeCalls) {
          for (const fnCall of resp.functionCalls ?? []) {
            const event = this.handlePendingFunctionCall(fnCall);
            if (event) yield event;
          }
        }

        if (hasOpenAiToolCalls) {
          for (const fnCall of openAiToolCalls) {
            const event = this.handlePendingFunctionCall(fnCall);
            if (event) yield event;
          }
          if (text) {
            yield { type: GeminiEventType.Content, value: text };
          }
        } else if (!hasNativeCalls && text) {
          const { functionCalls, content } =
            this.toolCallParser.parseChunk(text);

          if (functionCalls.length) {
            this.hasVisibleContentOrToolCall = true;
            for (const fnCall of functionCalls) {
              const event = this.handlePendingFunctionCall(fnCall);
              if (event) yield event;
            }
          }

          if (content) {
            yield { type: GeminiEventType.Content, value: content };
          }
        }

        // Собираем цитаты (используем getCitations)
        for (const citation of getCitations(resp)) {
          this.pendingCitations.add(citation);
        }

        // Check if response was truncated or stopped for various reasons
        // finishReason already computed above

        // Check for unfinished todos or action words in the response text
        const responseText = getResponseText(resp) ?? choiceContent;
        const hasUnfinishedTodos = this.pendingToolCalls.length > 0;
        const hasActionWords =
          responseText &&
          (/\s*(обновляю|изменяю|редактирую|updating|modifying|editing|changing)\s*/i.test(
            responseText,
          ) ||
            (/\s*(todo|задачи)\s*/i.test(responseText) &&
              /\s*(осталось|остаются|не завершены)\s*/i.test(responseText)));

        // Новый признак: есть незакрытый <tool_call> в буфере сырых данных
        const hasTruncatedToolCall = this.toolCallParser.hasTruncatedToolCall;

        if (hasActionWords) {
          this.hasActionWords = true;
        }
        if (hasTruncatedToolCall) {
          this.hadTruncatedToolCall = true;
        }

        // Only yield 'Finished' if:
        //  - есть finishReason
        //  - нет незавершённых tool-коллов/ TODO
        //  - НЕТ подозрения на обрубленный <tool_call>
        if (
          finishReason &&
          !hasUnfinishedTodos &&
          !hasActionWords &&
          !hasTruncatedToolCall
        ) {
          if (this.pendingCitations.size > 0) {
            yield {
              type: GeminiEventType.Citation,
              value: `Citations:\n${[...this.pendingCitations].sort().join('\n')}`,
            };
            this.pendingCitations.clear();
          }

          this.finishReason = finishReason;
          yield {
            type: GeminiEventType.Finished,
            value: {
              reason: finishReason,
              usageMetadata: resp.usageMetadata,
            },
          };
        }
      }

      // Поток завершился без явного finishReason — допарсим хвосты, если остались
      const { functionCalls: tailCalls, content: tailContent } =
        this.toolCallParser.flush();
      if (tailCalls.length) {
        this.hasVisibleContentOrToolCall = true;
        for (const fnCall of tailCalls) {
          const event = this.handlePendingFunctionCall(fnCall);
          if (event) yield event;
        }
      }
      if (tailContent) {
        yield { type: GeminiEventType.Content, value: tailContent };
      }

      const { visibleText: tailThoughtText } =
        this.thoughtTextParser.flush();
      if (tailThoughtText) {
        yield { type: GeminiEventType.Content, value: tailThoughtText };
        this.hasVisibleContentOrToolCall = true;
      }

      // Дополнительная проверка: если поток завершился, но finishReason не был сгенерирован,
      // и нет незавершённых tool calls, генерируем событие Finished и завершаем цикл.
      // Это предотвращает зависание в non-interactive режимах.
      if (
        !this.finishReason &&
        this.pendingToolCalls.length === 0 &&
        !this.hasActionWords &&
        !this.hadTruncatedToolCall
      ) {
        if (this.pendingCitations.size > 0) {
          yield {
            type: GeminiEventType.Citation,
            value: `Citations:\n${[...this.pendingCitations].sort().join('\n')}`,
          };
          this.pendingCitations.clear();
        }

        // Генерируем событие Finished с reason: undefined, так как тип FinishReason не позволяет присвоить 'STOP' напрямую.
        yield {
          type: GeminiEventType.Finished,
          value: {
            reason: undefined,
            usageMetadata: undefined, // usageMetadata может быть недоступен
          },
        };
        this.emptyResponseErrorRetries = 0;
        return; // Критически важно: выходим из цикла run, чтобы закрыть поток
      }
    } catch (e) {
      if (mode === 'sync') {
        // Ensure no stale events leak into the next turn if an error occurs.
        this.chat.drainPendingSyncStreamEvents();
      }

      // Reset tool call text buffer on error to prevent state leakage
      this.toolCallParser.reset();
      this.thoughtTextParser.reset();

      if (signal.aborted) {
        yield { type: GeminiEventType.UserCancelled };
        // Regular cancellation error, fail gracefully.
        return;
      }

      const error = toFriendlyError(e);
      if (error instanceof UnauthorizedError) {
        throw error;
      }

      const errorMessage = getErrorMessage(error);
      if (
        errorMessage.includes('Model stream ended with empty response text.') &&
        this.emptyResponseErrorRetries < this.MAX_EMPTY_RESPONSE_ERROR_RETRIES
      ) {
        this.emptyResponseErrorRetries++;
        yield { type: GeminiEventType.Retry };
        for await (const event of this.run(model, req, signal, mode)) {
          yield event;
        }
        return;
      }

      const contextForReport = [...this.chat.getHistory(/*curated*/ true), req];
      const contextName =
        mode === 'stream'
          ? 'Turn.run-sendMessageStream'
          : 'Turn.run-sendMessage';
      await reportError(
        error,
        'Error when talking to API',
        contextForReport,
        contextName,
      );
      const status =
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof (error as { status: unknown }).status === 'number'
          ? (error as { status: number }).status
          : undefined;
      const structuredError: StructuredError = {
        message: getErrorMessage(error),
        status,
      };
      await this.chat.maybeIncludeSchemaDepthContext(structuredError);
      yield { type: GeminiEventType.Error, value: { error: structuredError } };
      return;
    }

    // Поток завершился без явного finishReason — допарсим хвосты, если остались
    const { functionCalls: tailCalls, content: tailContent } =
      this.toolCallParser.flush();
    if (tailCalls.length) {
      for (const fnCall of tailCalls) {
        const event = this.handlePendingFunctionCall(fnCall);
        if (event) yield event;
      }
    }
    if (tailContent) {
      yield { type: GeminiEventType.Content, value: tailContent };
    }

    // Если остался незавершённый <think>... — считаем его обычным текстом,
    // чтобы не потерять содержимое.
    const { visibleText: tailThoughtText } =
      this.thoughtTextParser.flush();
    if (tailThoughtText) {
      yield { type: GeminiEventType.Content, value: tailThoughtText };
    }

    // Успешное завершение — сбрасываем счётчик ретраев по пустому ответу
    this.emptyResponseErrorRetries = 0;
  }

  private extractOpenAiToolCalls(
    resp: unknown,
  ): Array<{ id?: string; name: string; args: Record<string, unknown> }> {
    const choice = (resp as { choices?: Array<{ message?: unknown }> })
      ?.choices?.[0];
    if (!choice || typeof choice !== 'object') return [];

    const message = (choice as { message?: unknown }).message;
    if (!message || typeof message !== 'object') return [];

    const toolCalls = Array.isArray(
      (message as { tool_calls?: unknown }).tool_calls,
    )
      ? ((message as { tool_calls?: unknown[] }).tool_calls as unknown[])
      : [];

    const out: Array<{
      id?: string;
      name: string;
      args: Record<string, unknown>;
    }> = [];

    for (const tc of toolCalls) {
      const fnCall = this.convertOpenAiToolCall(tc);
      if (fnCall) out.push(fnCall);
    }

    if (!toolCalls.length) {
      const functionCall = (message as { function_call?: unknown })
        .function_call;
      const fnCall = this.convertOpenAiFunctionCall(functionCall);
      if (fnCall) out.push(fnCall);
    }

    return out;
  }

  private convertOpenAiToolCall(raw: unknown): {
    id?: string;
    name: string;
    args: Record<string, unknown>;
  } | null {
    if (!raw || typeof raw !== 'object') return null;

    const fnObj =
      (raw as { function?: unknown }).function &&
      typeof (raw as { function?: unknown }).function === 'object'
        ? ((raw as { function?: unknown }).function as {
            name?: unknown;
            arguments?: unknown;
          })
        : undefined;

    const name =
      typeof fnObj?.name === 'string' && fnObj.name.trim().length > 0
        ? fnObj.name
        : undefined;
    if (!name) return null;

    const args = this.parseOpenAiArguments(fnObj?.arguments);
    const id =
      typeof (raw as { id?: unknown }).id === 'string'
        ? ((raw as { id?: string }).id as string)
        : undefined;

    return { id, name, args };
  }

  private convertOpenAiFunctionCall(raw: unknown): {
    name: string;
    args: Record<string, unknown>;
  } | null {
    if (!raw || typeof raw !== 'object') return null;

    const name =
      typeof (raw as { name?: unknown }).name === 'string' &&
      (raw as { name?: string }).name?.trim().length
        ? ((raw as { name?: string }).name as string)
        : undefined;
    if (!name) return null;

    const args = this.parseOpenAiArguments(
      (raw as { arguments?: unknown }).arguments,
    );
    return { name, args };
  }

  private parseOpenAiArguments(raw: unknown): Record<string, unknown> {
    if (typeof raw === 'string') {
      const trimmed = raw.trim();
      if (!trimmed) return {};
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          const unwrapped = unwrapValueContainers(parsed);
          if (
            unwrapped &&
            typeof unwrapped === 'object' &&
            !Array.isArray(unwrapped)
          ) {
            return unwrapped as Record<string, unknown>;
          }
          return parsed as Record<string, unknown>;
        }
        return { input: trimmed };
      } catch {
        return { input: trimmed };
      }
    }

    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      const unwrapped = unwrapValueContainers(raw);
      if (
        unwrapped &&
        typeof unwrapped === 'object' &&
        !Array.isArray(unwrapped)
      ) {
        return unwrapped as Record<string, unknown>;
      }
      return raw as Record<string, unknown>;
    }

    return {};
  }

  private handlePendingFunctionCall(
    fnCall: FunctionCall,
  ): ServerGeminiStreamEvent | null {
    const callId =
      fnCall.id ??
      `${fnCall.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const name = fnCall.name || 'undefined_tool_name';

    // ✅ НОРМАЛИЗАЦИЯ АРГУМЕНТОВ
    let rawArgs: unknown = fnCall.args ?? {};
    if (typeof rawArgs === 'string') {
      try {
        rawArgs = JSON.parse(rawArgs);
      } catch {
        /* ok, оставляем как строку */
      }
    }
    const args =
      rawArgs && typeof rawArgs === 'object'
        ? (rawArgs as Record<string, unknown>)
        : {};

    // ✅ МЯГКАЯ проверка наличия инструмента
    const hasToolFn = (
      this.chat as unknown as {
        hasTool?: (name: string) => boolean;
      }
    ).hasTool;

    if (typeof hasToolFn === 'function') {
      if (!hasToolFn(name)) {
        return {
          type: GeminiEventType.ToolCallResponse,
          value: {
            callId,
            responseParts: [
              {
                text: `Подсказка: инструмент '${name}' не найден. Проверьте правильность названия и доступность инструмента. Возможно, вы можете использовать другой инструмент или shell для выполнения этой задачи.`,
              },
            ],
            resultDisplay: undefined,
            error: undefined,
            errorType: undefined,
            toolRequest: {
              callId,
              name,
              args,
              isClientInitiated: false,
              prompt_id: this.prompt_id,
              response_id: this.currentResponseId,
            },
          },
        };
      }
    }

    // ✅ Дедуп по имени + аргументы
    const sig = `${name}:${stableArgsSig(args)}`;
    if (this.seenToolCalls.has(sig)) {
      return null;
    }
    this.seenToolCalls.add(sig);

    const toolCallRequest: ToolCallRequestInfo = {
      callId,
      name,
      args,
      isClientInitiated: false,
      prompt_id: this.prompt_id,
      response_id: this.currentResponseId,
    };

    this.pendingToolCalls.push(toolCallRequest);

    // ✅ Адаптивная работа с историей: используем только если методы есть
    const chatAny = this.chat as unknown as {
      getHistory?: () => Array<{ role: string; parts?: Part[] }>;
      addHistory?: (msg: { role: string; parts: Part[] }) => void;
    };

    const hist =
      typeof chatAny.getHistory === 'function' ? chatAny.getHistory() : [];

    const last = hist[hist.length - 1];

    const alreadyHas =
      last?.role === 'model' &&
      Array.isArray(last.parts) &&
      last.parts.some((p: Part) => 'functionCall' in p);

    if (!alreadyHas && typeof chatAny.addHistory === 'function') {
      chatAny.addHistory({
        role: 'model',
        parts: [{ functionCall: { id: callId, name, args } } as Part],
      });
    }

    return { type: GeminiEventType.ToolCallRequest, value: toolCallRequest };
  }

  getDebugResponses(): GenerateContentResponse[] {
    return this.debugResponses;
  }
}

type ValueContainer = {
  type: string;
  value: unknown;
};

function unwrapValueContainers(
  obj: unknown,
): Record<string, unknown> | unknown[] | unknown {
  if (obj && typeof obj === 'object') {
    if ('type' in obj && 'value' in obj) {
      // Рекурсивно распаковываем значение
      return unwrapValueContainers((obj as ValueContainer).value);
    }
    // Обрабатываем массивы и объекты
    if (Array.isArray(obj)) {
      return obj.map(unwrapValueContainers);
    }
    if (obj instanceof Object) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          unwrapValueContainers(value),
        ]),
      );
    }
  }
  return obj;
}

function getCitations(resp: GenerateContentResponse): string[] {
  return (resp.candidates?.[0]?.citationMetadata?.citations ?? [])
    .filter((citation) => citation.uri !== undefined)
    .map((citation) => {
      if (citation.title) {
        return `(${citation.title}) ${citation.uri}`;
      }
      return citation.uri!;
    });
}
