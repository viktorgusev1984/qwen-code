/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, type Mock } from 'vitest';
import {
  StreamEventType,
  type Config,
  type GeminiChat,
} from '@qwen-code/qwen-code-core';
import type { PromptRequest, Client } from './acp.js';
import { TEST_ONLY } from './zedIntegration.js';

const { Session } = TEST_ONLY;

describe('Session prompt streaming modes', () => {
  const basePrompt: PromptRequest = {
    sessionId: 'session-1',
    prompt: [{ type: 'text', text: 'Hello' }],
  };

  const createSession = (options?: { shouldStream?: boolean }) => {
    const chat = {
      sendMessageStream: vi.fn(),
      sendMessage: vi.fn(),
      drainPendingSyncStreamEvents: vi.fn().mockReturnValue([]),
      addHistory: vi.fn(),
    } as unknown as GeminiChat;

    const config = {
      getModel: vi.fn(() => 'test-model'),
      isInFallbackMode: vi.fn(() => false),
      shouldStreamResponses: vi.fn(() => options?.shouldStream ?? true),
      getToolRegistry: vi.fn(() => ({ getTool: vi.fn() })),
    } as unknown as Config;

    const client = {
      sessionUpdate: vi.fn().mockResolvedValue(undefined),
    } as unknown as Client;

    const session = new Session('session-1', chat, config, client);
    return { session, chat, config, client };
  };

  it('streams responses when streaming mode is enabled', async () => {
    const { session, chat, client, config } = createSession({
      shouldStream: true,
    });
    const stream = (async function* () {
      yield {
        type: StreamEventType.CHUNK,
        value: {
          candidates: [
            {
              content: {
                parts: [{ text: 'Streamed reply' }],
              },
            },
          ],
        },
      } as const;
    })();
    (chat.sendMessageStream as Mock).mockResolvedValue(stream);

    await session.prompt(basePrompt);
    await Promise.resolve();

    expect(chat.sendMessageStream).toHaveBeenCalled();
    expect(config.shouldStreamResponses).toHaveBeenCalled();
    expect(client.sessionUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionId: 'session-1',
        update: expect.objectContaining({
          sessionUpdate: 'agent_message_chunk',
          content: { type: 'text', text: 'Streamed reply' },
        }),
      }),
    );
  });

  it('uses synchronous responses when streaming mode is disabled', async () => {
    const { session, chat, client, config } = createSession({
      shouldStream: false,
    });
    const response = {
      candidates: [
        {
          content: {
            parts: [{ text: 'Buffered reply' }],
          },
        },
      ],
      functionCalls: [],
    };
    (chat.sendMessage as Mock).mockResolvedValue(response);

    await session.prompt(basePrompt);

    expect(chat.sendMessage).toHaveBeenCalled();
    expect(chat.sendMessageStream).not.toHaveBeenCalled();
    expect(config.shouldStreamResponses).toHaveBeenCalled();
    expect(client.sessionUpdate).toHaveBeenCalledTimes(1);
    expect(client.sessionUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionId: 'session-1',
        update: expect.objectContaining({
          sessionUpdate: 'agent_message_chunk',
          content: { type: 'text', text: 'Buffered reply' },
        }),
      }),
    );
  });
});
