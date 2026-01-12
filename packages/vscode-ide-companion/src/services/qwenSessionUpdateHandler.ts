/**
 * @license
 * Copyright 2025 Gus Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Qwen Session Update Handler
 *
 * Handles session updates from ACP and dispatches them to appropriate callbacks
 */

import type { AcpSessionUpdate } from '../types/acpTypes.js';
import type { ApprovalModeValue } from '../types/approvalModeValueTypes.js';
import type { QwenAgentCallbacks } from '../types/chatTypes.js';

/**
 * Qwen Session Update Handler class
 * Processes various session update events and calls appropriate callbacks
 */
export class QwenSessionUpdateHandler {
  private callbacks: QwenAgentCallbacks;

  constructor(callbacks: QwenAgentCallbacks) {
    this.callbacks = callbacks;
  }

  /**
   * Update callbacks
   *
   * @param callbacks - New callback collection
   */
  updateCallbacks(callbacks: QwenAgentCallbacks): void {
    this.callbacks = callbacks;
  }

  /**
   * Handle session update
   *
   * @param data - ACP session update data
   */
  handleSessionUpdate(data: AcpSessionUpdate): void {
    const update = data.update;
    console.log(
      '[SessionUpdateHandler] Processing update type:',
      update.sessionUpdate,
    );

    switch (update.sessionUpdate) {
      case 'user_message_chunk':
        if (update.content?.text && this.callbacks.onStreamChunk) {
          this.callbacks.onStreamChunk(update.content.text);
        }
        break;

      case 'agent_message_chunk':
        if (update.content?.text && this.callbacks.onStreamChunk) {
          this.callbacks.onStreamChunk(update.content.text);
        }
        break;

      case 'agent_thought_chunk':
        if (update.content?.text) {
          if (this.callbacks.onThoughtChunk) {
            this.callbacks.onThoughtChunk(update.content.text);
          } else if (this.callbacks.onStreamChunk) {
            // Fallback to regular stream processing
            console.log(
              '[SessionUpdateHandler] 🧠 Falling back to onStreamChunk',
            );
            this.callbacks.onStreamChunk(update.content.text);
          }
        }
        break;

      case 'tool_call': {
        // Handle new tool call
        if (this.callbacks.onToolCall && 'toolCallId' in update) {
          this.callbacks.onToolCall({
            toolCallId: update.toolCallId as string,
            kind: (update.kind as string) || undefined,
            title: (update.title as string) || undefined,
            status: (update.status as string) || undefined,
            rawInput: update.rawInput,
            content: update.content as
              | Array<Record<string, unknown>>
              | undefined,
            locations: update.locations as
              | Array<{ path: string; line?: number | null }>
              | undefined,
          });
        }
        break;
      }

      case 'tool_call_update': {
        if (this.callbacks.onToolCall && 'toolCallId' in update) {
          this.callbacks.onToolCall({
            toolCallId: update.toolCallId as string,
            kind: (update.kind as string) || undefined,
            title: (update.title as string) || undefined,
            status: (update.status as string) || undefined,
            rawInput: update.rawInput,
            content: update.content as
              | Array<Record<string, unknown>>
              | undefined,
            locations: update.locations as
              | Array<{ path: string; line?: number | null }>
              | undefined,
          });
        }
        break;
      }

      case 'plan': {
        if ('entries' in update) {
          const entries = update.entries as Array<{
            content: string;
            priority: 'high' | 'medium' | 'low';
            status: 'pending' | 'in_progress' | 'completed';
          }>;

          if (this.callbacks.onPlan) {
            this.callbacks.onPlan(entries);
          } else if (this.callbacks.onStreamChunk) {
            // Fallback to stream processing
            const planText =
              '\n📋 Plan:\n' +
              entries
                .map(
                  (entry, i) =>
                    `${i + 1}. [${entry.priority}] ${entry.content}`,
                )
                .join('\n');
            this.callbacks.onStreamChunk(planText);
          }
        }
        break;
      }

      case 'chat_compression': {
        const info = {
          originalTokenCount: update.originalTokenCount,
          newTokenCount: update.newTokenCount,
          trigger: update.trigger,
        };
        if (this.callbacks.onCompression) {
          this.callbacks.onCompression(info);
        } else if (this.callbacks.onStreamChunk) {
          this.callbacks.onStreamChunk(
            `IMPORTANT: A compressed context will be sent for future messages (compressed from: ${info.originalTokenCount} to ${info.newTokenCount} tokens).`,
          );
        }
        break;
      }

      case 'confirm_action': {
        const notice = {
          prompt: update.prompt,
          originalInvocation: update.originalInvocation,
        };
        if (this.callbacks.onConfirmAction) {
          this.callbacks.onConfirmAction(notice);
        } else if (this.callbacks.onStreamChunk) {
          const fallback = notice.originalInvocation?.raw
            ? `Confirm to continue: ${notice.originalInvocation.raw}`
            : 'Confirmation required to continue.';
          this.callbacks.onStreamChunk(`${notice.prompt} ${fallback}`);
        }
        break;
      }

      case 'current_mode_update': {
        // Notify UI about mode change
        try {
          const modeId = (update as unknown as { modeId?: ApprovalModeValue })
            .modeId;
          if (modeId && this.callbacks.onModeChanged) {
            this.callbacks.onModeChanged(modeId);
          }
        } catch (err) {
          console.warn(
            '[SessionUpdateHandler] Failed to handle mode update',
            err,
          );
        }
        break;
      }

      case 'available_commands_update': {
        // Notify UI about available commands
        try {
          if (
            this.callbacks.onAvailableCommands &&
            Array.isArray(update.availableCommands)
          ) {
            this.callbacks.onAvailableCommands(update.availableCommands);
          }
        } catch (err) {
          console.warn(
            '[SessionUpdateHandler] Failed to handle available commands update',
            err,
          );
        }
        break;
      }

      default:
        console.log('[QwenAgentManager] Unhandled session update type');
        break;
    }
  }
}
