/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type {
  ServerGeminiToolCallRequestEvent,
  ServerGeminiErrorEvent,
  ServerGeminiStreamEvent,
  ServerGeminiContentEvent,
} from './turn.js';
import { Turn, GeminiEventType } from './turn.js';
import type { GenerateContentResponse, Part, Content } from '@google/genai';
import { reportError } from '../utils/errorReporting.js';
import type { GeminiChat } from './geminiChat.js';
import { StreamEventType } from './geminiChat.js';

const mockSendMessage = vi.fn();
const mockDrainPendingSyncStreamEvents = vi.fn();

// Оставляем для совместимости с моками @google/genai (хотя в sync не используем)
const mockSendMessageStream = vi.fn();
const mockGetHistory = vi.fn();
const mockMaybeIncludeSchemaDepthContext = vi.fn();

vi.mock('@google/genai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@google/genai')>();
  const MockChat = vi.fn().mockImplementation(() => ({
    sendMessageStream: mockSendMessageStream,
    sendMessage: mockSendMessage,
    drainPendingSyncStreamEvents: mockDrainPendingSyncStreamEvents,
    getHistory: mockGetHistory,
    maybeIncludeSchemaDepthContext: mockMaybeIncludeSchemaDepthContext,
  }));
  return {
    ...actual,
    Chat: MockChat,
  };
});

vi.mock('../utils/errorReporting', () => ({
  reportError: vi.fn(),
}));

vi.mock('../utils/generateContentResponseUtilities', () => ({
  getResponseText: (resp: GenerateContentResponse) =>
    resp.candidates?.[0]?.content?.parts?.map((part) => part.text).join('') ||
    undefined,
}));

describe('Turn (sync mode)', () => {
  let turn: Turn;

  type MockedChatInstance = {
    sendMessageStream: typeof mockSendMessageStream;
    getHistory: typeof mockGetHistory;
    maybeIncludeSchemaDepthContext: typeof mockMaybeIncludeSchemaDepthContext;
    hasTool: (name: string) => boolean;
    sendMessage: typeof mockSendMessage;
    drainPendingSyncStreamEvents: typeof mockDrainPendingSyncStreamEvents;
  };

  let mockChatInstance: MockedChatInstance;

  beforeEach(() => {
    vi.resetAllMocks();

    mockChatInstance = {
      sendMessageStream: mockSendMessageStream,
      getHistory: mockGetHistory,
      maybeIncludeSchemaDepthContext: mockMaybeIncludeSchemaDepthContext,
      hasTool: vi.fn().mockReturnValue(true),
      sendMessage: mockSendMessage,
      drainPendingSyncStreamEvents: mockDrainPendingSyncStreamEvents,
    };

    turn = new Turn(mockChatInstance as unknown as GeminiChat, 'prompt-id-1');
    mockGetHistory.mockReturnValue([]);
    mockDrainPendingSyncStreamEvents.mockReturnValue([]);
    mockSendMessage.mockResolvedValue({} as GenerateContentResponse);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize pendingToolCalls and debugResponses', () => {
      expect(turn.pendingToolCalls).toEqual([]);
      expect(turn.getDebugResponses()).toEqual([]);
    });
  });

  describe('run (sync)', () => {
    it('should yield content events for text parts', async () => {
      const resp1 = {
        candidates: [{ content: { parts: [{ text: 'Hello' }] } }],
      } as GenerateContentResponse;
      const resp2 = {
        candidates: [{ content: { parts: [{ text: ' world' }] } }],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([
        { type: StreamEventType.CHUNK, value: resp1 },
      ]);
      mockSendMessage.mockResolvedValue(resp2);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'Hi' }];

      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(mockSendMessage).toHaveBeenCalledWith(
        'test-model',
        {
          message: reqParts,
          config: { abortSignal: expect.any(AbortSignal) },
        },
        'prompt-id-1',
      );

      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'Hello' },
        { type: GeminiEventType.Content, value: ' world' },
        {
          type: GeminiEventType.Finished,
          value: { reason: undefined, usageMetadata: undefined },
        },
      ]);
      expect(turn.getDebugResponses()).toEqual([resp1, resp2]);
    });

    // NEW:<think> — базовый кейс
    it('should emit Thought and Content events when response contains <think> block', async () => {
      const resp = {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: '<think>internal reasoning here</think>Visible answer',
                },
              ],
            },
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'question' }];

      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events.length).toBe(3);
      expect(events[0].type).toBe(GeminiEventType.Thought);

      const contentEvent = events[1] as ServerGeminiContentEvent;
      expect(contentEvent.type).toBe(GeminiEventType.Content);
      expect(contentEvent.value).toBe('Visible answer');
      expect(events[2].type).toBe(GeminiEventType.Finished);
    });

    // NEW:<think> — незакрытый <think> не должен падать и в конце идёт как обычный Content
    it('should treat unfinished <think> block as plain content when stream ends', async () => {
      const rawText = '<think>internal reasoning without closing tag';
      const resp = {
        candidates: [
          {
            content: {
              parts: [{ text: rawText }],
            },
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'question' }];

      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      // никаких Thought, только один Content с исходным текстом
      expect(events).toHaveLength(2);
      expect(events[0].type).toBe(GeminiEventType.Content);
      const contentEvent = events[0] as ServerGeminiContentEvent;
      expect(contentEvent.value).toBe(rawText);
      expect(events[1].type).toBe(GeminiEventType.Finished);
    });

    it('should treat bare JSON function call as tool_call_request and unwrap value containers', async () => {
      const text = JSON.stringify({
        type: 'function',
        name: 'list_directory',
        parameters: {
          file_filtering_options: { type: 'object', value: {} },
          ignore: { type: 'array', value: [] },
          path: {
            type: 'string',
            value: '/Users/v.n.gusev/Documents/code/gusqwen',
          },
        },
      });

      const resp = {
        candidates: [
          {
            content: {
              parts: [{ text }],
            },
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const hasToolMock = vi.fn((name: string) => name === 'list_directory');
      (
        mockChatInstance as unknown as { hasTool: (name: string) => boolean }
      ).hasTool = hasToolMock;

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'bare json tool call' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toHaveLength(1);

      const toolCallEvent = events[0] as ServerGeminiToolCallRequestEvent;
      expect(toolCallEvent.type).toBe(GeminiEventType.ToolCallRequest);

      expect(hasToolMock).toHaveBeenCalledWith('list_directory');
      expect(toolCallEvent.value.name).toBe('list_directory');
      expect(toolCallEvent.value.args).toEqual({
        file_filtering_options: {},
        ignore: [],
        path: '/Users/v.n.gusev/Documents/code/gusqwen',
      });
    });

    it('should handle multiple <tool_call> blocks in a single message', async () => {
      const text =
        '<tool_call>' +
        JSON.stringify({
          name: 'todo_write',
          arguments: { foo: 'bar' },
        }) +
        '</tool_call>' +
        '\n' +
        '<tool_call>' +
        JSON.stringify({
          name: 'exit_plan_mode',
          arguments: { plan: 'ok' },
        }) +
        '</tool_call>';

      const resp = {
        candidates: [{ content: { parts: [{ text }] } }],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'multi tool_call' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      const toolEvents = events.filter(
        (e) => e.type === GeminiEventType.ToolCallRequest,
      ) as ServerGeminiToolCallRequestEvent[];

      expect(toolEvents).toHaveLength(2);
      expect(toolEvents[0].value.name).toBe('todo_write');
      expect(toolEvents[1].value.name).toBe('exit_plan_mode');
    });

    it('should yield tool_call_request events for function calls', async () => {
      const resp = {
        functionCalls: [
          {
            id: 'fc1',
            name: 'tool1',
            args: { arg1: 'val1' },
            isClientInitiated: false,
          },
          {
            name: 'tool2',
            args: { arg2: 'val2' },
            isClientInitiated: false,
          },
        ],
      } as unknown as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'Use tools' }];
      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events.length).toBe(2);
      const event1 = events[0] as ServerGeminiToolCallRequestEvent;
      expect(event1.type).toBe(GeminiEventType.ToolCallRequest);
      expect(event1.value).toEqual(
        expect.objectContaining({
          callId: 'fc1',
          name: 'tool1',
          args: { arg1: 'val1' },
          isClientInitiated: false,
        }),
      );
      expect(turn.pendingToolCalls[0]).toEqual(event1.value);

      const event2 = events[1] as ServerGeminiToolCallRequestEvent;
      expect(event2.type).toBe(GeminiEventType.ToolCallRequest);
      expect(event2.value).toEqual(
        expect.objectContaining({
          name: 'tool2',
          args: { arg2: 'val2' },
          isClientInitiated: false,
        }),
      );
      expect(event2.value.callId).toEqual(
        expect.stringMatching(/^tool2-\d{13}-\w{10,}$/),
      );
      expect(turn.pendingToolCalls[1]).toEqual(event2.value);
      expect(turn.getDebugResponses()).toEqual([resp]);
    });

    it('should parse bracket-style tool_call with key-value args', async () => {
      const text =
        'I\'ll create a file named test.txt with the content "123" at the repository root.\n\n' +
        "[tool_call: write_file for path '/Users/a.krygin/IdeaProjects/prospects/test.txt' with content '123']";

      const resp = {
        candidates: [
          {
            content: {
              parts: [{ text }],
            },
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const hasToolMock = vi.fn((name: string) => name === 'write_file');
      mockChatInstance.hasTool = hasToolMock;

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'create file' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toHaveLength(1);

      const toolCallEvent = events[0] as ServerGeminiToolCallRequestEvent;
      expect(hasToolMock).toHaveBeenCalledWith('write_file');
      expect(toolCallEvent.type).toBe(GeminiEventType.ToolCallRequest);
      expect(toolCallEvent.value.name).toBe('write_file');
      expect(toolCallEvent.value.args).toEqual({
        path: '/Users/a.krygin/IdeaProjects/prospects/test.txt',
        content: '123',
      });
    });

    it('should parse bracket-style run_shell_command with plain string arg', async () => {
      const text = "[tool_call: run_shell_command for 'echo 123']";

      const resp = {
        candidates: [
          {
            content: { parts: [{ text }] },
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const hasToolMock = vi.fn((name: string) => name === 'run_shell_command');
      mockChatInstance.hasTool = hasToolMock;

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'run shell' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toHaveLength(1);
      const toolCallEvent = events[0] as ServerGeminiToolCallRequestEvent;
      expect(toolCallEvent.type).toBe(GeminiEventType.ToolCallRequest);
      expect(toolCallEvent.value.name).toBe('run_shell_command');
      expect(toolCallEvent.value.args).toEqual({
        command: 'echo 123',
        is_background: false,
      });
    });

    it('should convert <tool_call> text into tool call request events', async () => {
      const resp = {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: '<tool_call>{"name":"text_tool","arguments":{"foo":"bar"}}</tool_call>',
                },
              ],
            },
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'Use tools' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toHaveLength(1);
      const [event] = events as ServerGeminiToolCallRequestEvent[];
      expect(event.type).toBe(GeminiEventType.ToolCallRequest);
      expect(event.value.name).toBe('text_tool');
      expect(event.value.args).toEqual({ foo: 'bar' });
      expect(event.value.callId).toBeDefined();
      expect(turn.pendingToolCalls).toHaveLength(1);
    });

    it('should handle OpenAI-style tool_calls array', async () => {
      const resp = {
        choices: [
          {
            message: {
              role: 'assistant',
              content: null,
              tool_calls: [
                {
                  id: 'call_1',
                  type: 'function',
                  function: {
                    name: 'edit',
                    arguments:
                      '{"file_path":"/tmp/file.txt","old_string":"a","new_string":"b"}',
                  },
                },
              ],
            },
            finish_reason: 'stop',
          },
        ],
      } as unknown as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'call tool' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toHaveLength(1);
      const toolEvent = events[0] as ServerGeminiToolCallRequestEvent;
      expect(toolEvent.type).toBe(GeminiEventType.ToolCallRequest);
      expect(toolEvent.value.callId).toBe('call_1');
      expect(toolEvent.value.name).toBe('edit');
      expect(toolEvent.value.args).toEqual({
        file_path: '/tmp/file.txt',
        old_string: 'a',
        new_string: 'b',
      });
    });

    it('should handle OpenAI-style function_call payloads', async () => {
      const resp = {
        choices: [
          {
            message: {
              role: 'assistant',
              content: 'Executing command',
              function_call: {
                name: 'run_shell_command',
                arguments: '{"command":"echo 42"}',
              },
            },
          },
        ],
      } as unknown as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'call tool' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toHaveLength(2);
      const toolEvent = events[0] as ServerGeminiToolCallRequestEvent;
      expect(toolEvent.type).toBe(GeminiEventType.ToolCallRequest);
      expect(toolEvent.value.name).toBe('run_shell_command');
      expect(toolEvent.value.args).toEqual({ command: 'echo 42' });

      const contentEvent = events[1] as ServerGeminiContentEvent;
      expect(contentEvent.type).toBe(GeminiEventType.Content);
      expect(contentEvent.value).toBe('Executing command');
    });

    it('should convert single functionCall payloads without tool call arrays', async () => {
      const toolCallMessage = {
        role: 'assistant',
        text: 'Running shell command',
        functionCall: {
          name: 'shell',
          args: JSON.stringify({ command: 'ls' }),
        },
      };

      const resp = {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: `<tool_call>${JSON.stringify(toolCallMessage)}</tool_call>`,
                },
              ],
            },
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'trigger single function call' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toHaveLength(2);
      const toolCallEvent = events[0] as ServerGeminiToolCallRequestEvent;
      expect(toolCallEvent.type).toBe(GeminiEventType.ToolCallRequest);
      expect(toolCallEvent.value.name).toBe('shell');
      expect(toolCallEvent.value.args).toEqual({ command: 'ls' });

      const contentEvent = events[1];
      expect(contentEvent).toEqual({
        type: GeminiEventType.Content,
        value: 'Running shell command',
      });
    });

    it('should yield UserCancelled event if signal is aborted', async () => {
      const abortController = new AbortController();

      const resp1 = {
        candidates: [{ content: { parts: [{ text: 'First part' }] } }],
      } as GenerateContentResponse;
      const resp2 = {
        candidates: [
          {
            content: {
              parts: [{ text: 'Second part - should not be processed' }],
            },
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([
        { type: StreamEventType.CHUNK, value: resp1 },
      ]);
      mockSendMessage.mockResolvedValue(resp2);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'Test abort' }];
      for await (const event of turn.run(
        'test-model',
        reqParts,
        abortController.signal,
        'sync',
      )) {
        events.push(event);
        if (events.length === 1) {
          abortController.abort();
        }
      }
      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'First part' },
        { type: GeminiEventType.UserCancelled },
      ]);
      expect(turn.getDebugResponses()).toEqual([resp1]);
    });

    it('should yield Error event and report if sendMessage throws', async () => {
      const error = new Error('API Error');
      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockRejectedValue(error);
      const reqParts: Part[] = [{ text: 'Trigger error' }];
      const historyContent: Content[] = [
        { role: 'model', parts: [{ text: 'Previous history' }] },
      ];
      mockGetHistory.mockReturnValue(historyContent);
      mockMaybeIncludeSchemaDepthContext.mockResolvedValue(undefined);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events.length).toBe(1);
      const errorEvent = events[0] as ServerGeminiErrorEvent;
      expect(errorEvent.type).toBe(GeminiEventType.Error);
      expect(errorEvent.value).toEqual({
        error: { message: 'API Error', status: undefined },
      });
      expect(turn.getDebugResponses().length).toBe(0);
      expect(reportError).toHaveBeenCalledWith(
        error,
        'Error when talking to API',
        [...historyContent, reqParts],
        'Turn.run-sendMessage',
      );
    });

    it('retries twice on empty stream response error before surfacing it', async () => {
      const streamError = new Error(
        'Model stream ended with empty response text.',
      );
      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage
        .mockRejectedValueOnce(streamError)
        .mockRejectedValueOnce(streamError)
        .mockRejectedValueOnce(streamError);
      mockMaybeIncludeSchemaDepthContext.mockResolvedValue(undefined);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'Trigger retries' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(mockSendMessage).toHaveBeenCalledTimes(3);
      expect(events[0]).toEqual({ type: GeminiEventType.Retry });
      expect(events[1]).toEqual({ type: GeminiEventType.Retry });
      expect(events).toHaveLength(3);

      const errorEvent = events[events.length - 1] as ServerGeminiErrorEvent;
      expect(errorEvent.type).toBe(GeminiEventType.Error);
      expect(errorEvent.value).toEqual({
        error: {
          message: 'Model stream ended with empty response text.',
          status: undefined,
        },
      });
      expect(reportError).toHaveBeenCalledTimes(1);
    });

    it('resets emptyResponseErrorRetries after a successful retry', async () => {
      const streamError = new Error(
        'Model stream ended with empty response text.',
      );
      const successResponse = {
        candidates: [
          {
            content: { parts: [{ text: 'Recovered response' }] },
            finishReason: 'STOP',
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage
        .mockRejectedValueOnce(streamError)
        .mockResolvedValueOnce(successResponse);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'Trigger retry reset' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events[0]).toEqual({ type: GeminiEventType.Retry });
      expect(events).toContainEqual({
        type: GeminiEventType.Content,
        value: 'Recovered response',
      });
      expect(events).toContainEqual({
        type: GeminiEventType.Finished,
        value: { reason: 'STOP', usageMetadata: undefined },
      });

      // @ts-expect-error accessing private field for test verification
      expect(turn.emptyResponseErrorRetries).toBe(0);
    });

    it('should handle function calls with undefined name or args', async () => {
      const resp = {
        candidates: [],
        functionCalls: [
          { id: 'fc1', name: undefined, args: { arg1: 'val1' } },
          { id: 'fc2', name: 'tool2', args: undefined },
          { id: 'fc3', name: undefined, args: undefined },
        ],
      } as unknown as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'Test undefined tool parts' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events.length).toBe(3);

      const event1 = events[0] as ServerGeminiToolCallRequestEvent;
      expect(event1.value).toMatchObject({
        callId: 'fc1',
        name: 'undefined_tool_name',
        args: { arg1: 'val1' },
      });

      const event2 = events[1] as ServerGeminiToolCallRequestEvent;
      expect(event2.value).toMatchObject({
        callId: 'fc2',
        name: 'tool2',
        args: {},
      });

      const event3 = events[2] as ServerGeminiToolCallRequestEvent;
      expect(event3.value).toMatchObject({
        callId: 'fc3',
        name: 'undefined_tool_name',
        args: {},
      });
    });

    it('should yield finished event when response has finish reason', async () => {
      const resp = {
        candidates: [
          {
            content: { parts: [{ text: 'Partial response' }] },
            finishReason: 'STOP',
          },
        ],
        usageMetadata: {
          promptTokenCount: 17,
          candidatesTokenCount: 50,
          cachedContentTokenCount: 10,
          thoughtsTokenCount: 5,
          toolUsePromptTokenCount: 2,
        },
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'Test finish reason' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'Partial response' },
        {
          type: GeminiEventType.Finished,
          value: {
            reason: 'STOP',
            usageMetadata: {
              promptTokenCount: 17,
              candidatesTokenCount: 50,
              cachedContentTokenCount: 10,
              thoughtsTokenCount: 5,
              toolUsePromptTokenCount: 2,
            },
          },
        },
      ]);
    });

    it('should yield finished event for MAX_TOKENS finish reason', async () => {
      const resp = {
        candidates: [
          {
            content: {
              parts: [{ text: 'This is a long response that was cut off...' }],
            },
            finishReason: 'MAX_TOKENS',
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'Generate long text' }];
      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([
        {
          type: GeminiEventType.Content,
          value: 'This is a long response that was cut off...',
        },
        {
          type: GeminiEventType.Finished,
          value: { reason: 'MAX_TOKENS', usageMetadata: undefined },
        },
      ]);
    });

    it('should yield finished event for SAFETY finish reason', async () => {
      const resp = {
        candidates: [
          {
            content: { parts: [{ text: 'Content blocked' }] },
            finishReason: 'SAFETY',
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'Test safety' }];
      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'Content blocked' },
        {
          type: GeminiEventType.Finished,
          value: { reason: 'SAFETY', usageMetadata: undefined },
        },
      ]);
    });

    it('should yield finished event with undefined reason when there is no finish reason', async () => {
      const resp = {
        candidates: [
          {
            content: {
              parts: [{ text: 'Response without finish reason' }],
            },
            // no finishReason
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'Test no finish reason' }];
      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([
        {
          type: GeminiEventType.Content,
          value: 'Response without finish reason',
        },
        {
          type: GeminiEventType.Finished,
          value: { reason: undefined, usageMetadata: undefined },
        },
      ]);
    });

    it('should handle multiple responses with different finish reasons (sync mode)', async () => {
      mockDrainPendingSyncStreamEvents.mockReturnValue([
        {
          type: StreamEventType.CHUNK,
          value: {
            candidates: [
              {
                content: { parts: [{ text: 'First part' }] },
              },
            ],
          } as GenerateContentResponse,
        },
      ]);

      mockSendMessage.mockResolvedValue({
        candidates: [
          {
            content: { parts: [{ text: 'Second part' }] },
            finishReason: 'OTHER',
          },
        ],
      } as GenerateContentResponse);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'Test multiple responses' }];
      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'First part' },
        { type: GeminiEventType.Content, value: 'Second part' },
        {
          type: GeminiEventType.Finished,
          value: { reason: 'OTHER', usageMetadata: undefined },
        },
      ]);
    });

    it('should yield citation and finished events when response has citationMetadata', async () => {
      const resp = {
        candidates: [
          {
            content: { parts: [{ text: 'Some text.' }] },
            citationMetadata: {
              citations: [
                {
                  uri: 'https://example.com/source1',
                  title: 'Source 1 Title',
                },
              ],
            },
            finishReason: 'STOP',
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'Test citations' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'Some text.' },
        {
          type: GeminiEventType.Citation,
          value: 'Citations:\n(Source 1 Title) https://example.com/source1',
        },
        {
          type: GeminiEventType.Finished,
          value: { reason: 'STOP', usageMetadata: undefined },
        },
      ]);
    });

    it('should yield a single citation event for multiple citations in one response', async () => {
      const resp = {
        candidates: [
          {
            content: { parts: [{ text: 'Some text.' }] },
            citationMetadata: {
              citations: [
                {
                  uri: 'https://example.com/source2',
                  title: 'Title2',
                },
                {
                  uri: 'https://example.com/source1',
                  title: 'Title1',
                },
              ],
            },
            finishReason: 'STOP',
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'test' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'Some text.' },
        {
          type: GeminiEventType.Citation,
          value:
            'Citations:\n(Title1) https://example.com/source1\n(Title2) https://example.com/source2',
        },
        {
          type: GeminiEventType.Finished,
          value: { reason: 'STOP', usageMetadata: undefined },
        },
      ]);
    });

    it('should not yield Finished event if there are unfinished todos', async () => {
      const resp = {
        candidates: [
          {
            content: { parts: [{ text: 'I have more work to do' }] },
            finishReason: 'STOP',
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      // Add a pending tool call
      turn.pendingToolCalls.push({
        callId: 'test-call-id',
        name: 'test-tool',
        args: {},
        isClientInitiated: false,
        prompt_id: 'prompt-id-1',
      });

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'test' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      // Should have Content event but no Finished event
      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'I have more work to do' },
      ]);
      expect(events.some((e) => e.type === GeminiEventType.Finished)).toBe(
        false,
      );
    });

    it('should not yield Finished event if response contains action words', async () => {
      const resp = {
        candidates: [
          {
            content: { parts: [{ text: 'Обновляю реализацию...' }] },
            finishReason: 'STOP',
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'test' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      // Should have Content event but no Finished event
      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'Обновляю реализацию...' },
      ]);
      expect(events.some((e) => e.type === GeminiEventType.Finished)).toBe(
        false,
      );
    });

    it('should yield Finished event if no unfinished todos and no action words', async () => {
      const resp = {
        candidates: [
          {
            content: { parts: [{ text: 'Work is complete' }] },
            finishReason: 'STOP',
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'test' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      // Should have both Content and Finished events
      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'Work is complete' },
        {
          type: GeminiEventType.Finished,
          value: { reason: 'STOP', usageMetadata: undefined },
        },
      ]);
    });

    it('should not yield citation event if there is no finish reason', async () => {
      const resp = {
        candidates: [
          {
            content: { parts: [{ text: 'Some text.' }] },
            citationMetadata: {
              citations: [
                {
                  uri: 'https://example.com/source1',
                  title: 'Source 1 Title',
                },
              ],
            },
            // no finishReason
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'test' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'Some text.' },
        {
          type: GeminiEventType.Citation,
          value: 'Citations:\n(Source 1 Title) https://example.com/source1',
        },
        {
          type: GeminiEventType.Finished,
          value: { reason: undefined, usageMetadata: undefined },
        },
      ]);
    });

    it('should ignore citations without a URI', async () => {
      const resp = {
        candidates: [
          {
            content: { parts: [{ text: 'Some text.' }] },
            citationMetadata: {
              citations: [
                {
                  uri: 'https://example.com/source1',
                  title: 'Good Source',
                },
                {
                  title: 'Bad Source',
                },
              ],
            },
            finishReason: 'STOP',
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'test' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([
        { type: GeminiEventType.Content, value: 'Some text.' },
        {
          type: GeminiEventType.Citation,
          value: 'Citations:\n(Good Source) https://example.com/source1',
        },
        {
          type: GeminiEventType.Finished,
          value: { reason: 'STOP', usageMetadata: undefined },
        },
      ]);
    });

    it('should not crash when cancelled request has malformed error', async () => {
      const abortController = new AbortController();

      const errorToThrow = {
        response: {
          data: undefined,
        },
      };

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);

      mockSendMessage.mockImplementation(async () => {
        abortController.abort();
        throw errorToThrow;
      });

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'Test malformed error handling' }];

      for await (const event of turn.run(
        'test-model',
        reqParts,
        abortController.signal,
        'sync',
      )) {
        events.push(event);
      }

      expect(events).toEqual([{ type: GeminiEventType.UserCancelled }]);
      expect(reportError).not.toHaveBeenCalled();
    });

    // it('should yield a Retry event when it receives one from the chat stream', async () => {
    //   const resp = {
    //     candidates: [
    //       {
    //         content: { parts: [{ text: 'Success' }] },
    //       },
    //     ],
    //   } as GenerateContentResponse;
    //
    //   mockDrainPendingSyncStreamEvents.mockReturnValue([
    //     { type: StreamEventType.RETRY },
    //     { type: StreamEventType.CHUNK, value: resp },
    //   ]);
    //   mockSendMessage.mockResolvedValue({} as GenerateContentResponse);
    //
    //   const events: ServerGeminiStreamEvent[] = [];
    //   for await (const event of turn.run(
    //     'test-model',
    //     [],
    //     new AbortController().signal,
    //     'sync',
    //   )) {
    //     events.push(event);
    //   }
    //
    //   expect(events).toEqual([
    //     { type: GeminiEventType.Retry },
    //     { type: GeminiEventType.Content, value: 'Success' },
    //   ]);
    // });

    it('should tolerate malformed JSON inside <tool_call> and still emit tool call', async () => {
      const text =
        '<tool_call>' +
        '{"name":"edit","arguments":{"file_path":"/tmp/x","old_string":"A"},"new_string":"B",}' +
        '</tool_call>';

      const resp = {
        candidates: [
          {
            content: { parts: [{ text }] },
          },
        ],
      } as GenerateContentResponse;

      mockDrainPendingSyncStreamEvents.mockReturnValue([]);
      mockSendMessage.mockResolvedValue(resp);

      const hasToolMock = vi.fn((name: string) => name === 'edit');
      mockChatInstance.hasTool = hasToolMock;

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'malformed tool_call' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      const toolEvents = events.filter(
        (e) => e.type === GeminiEventType.ToolCallRequest,
      ) as ServerGeminiToolCallRequestEvent[];

      expect(toolEvents).toHaveLength(1);

      const args = toolEvents[0].value.args as Record<string, unknown>;
      expect(args['file_path']).toBe('/tmp/x');
    });

    it('should parse trailing <tool_call> JSON in sync mode even without closing tag', async () => {
      const text =
        '<think>\n' +
        'Хорошо, пользователь попросил создать отдельные файлы...\n' +
        '</think>\n\n' +
        '<tool_call>\n' +
        JSON.stringify({
          name: 'write_file',
          arguments: {
            file_path:
              '/Users/v.n.gusev/Documents/code/ai-review/docs/services/summary_review_runner.md',
            content: '### SummaryReviewRunner\n\nОписание...',
          },
        });

      // sync-режим: pending stream events пустые
      mockChatInstance.drainPendingSyncStreamEvents.mockReturnValue([]);

      // sync-ответ от модели: один completion с нашим текстом, без </tool_call>
      mockChatInstance.sendMessage.mockResolvedValue({
        candidates: [
          {
            content: { parts: [{ text }] },
            finishReason: 'length', // как в реальном кейсе (finish_reason: "length")
          },
        ],
      } as unknown as GenerateContentResponse);

      const hasToolMock = vi.fn((name: string) => name === 'write_file');
      mockChatInstance.hasTool = hasToolMock;

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'create summary_review_runner spec' }];

      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync', // ⬅️ важно: явно включаем sync-режим
      )) {
        events.push(event);
      }

      const toolEvents = events.filter(
        (e) => e.type === GeminiEventType.ToolCallRequest,
      ) as ServerGeminiToolCallRequestEvent[];

      expect(toolEvents).toHaveLength(1);

      const toolCall = toolEvents[0].value;
      expect(toolCall.name).toBe('write_file');
      expect(toolCall.args).toEqual({
        file_path:
          '/Users/v.n.gusev/Documents/code/ai-review/docs/services/summary_review_runner.md',
        content: '### SummaryReviewRunner\n\nОписание...',
      });

      expect(hasToolMock).toHaveBeenCalledWith('write_file');

      // так как есть незавершённый tool_call, Finished не должен эмититься
      expect(events.some((e) => e.type === GeminiEventType.Finished)).toBe(
        false,
      );
    });

    it('should NOT emit Finished when sync response has truncated <tool_call> JSON', async () => {
      const text =
        '<think>\n' +
        'Хорошо, пользователь попросил создать отдельные файлы...\n' +
        '</think>\n\n' +
        '<tool_call>\n' +
        // специально делаем JSON обрубленным, как в реальном примере
        '{"name": "write_file", "arguments": {' +
        '"file_path": "/Users/v.n.gusev/Documents/code/ai-review/docs/services/summary_review_runner.md",' +
        '"content": "### SummaryReviewRunner\\n\\nОписание...';

      // В sync-режиме pending stream events могут быть, но в этом кейсе их нет
      mockChatInstance.drainPendingSyncStreamEvents.mockReturnValue([]);

      // sendMessage возвращает один completion с обрубленным tool_call и finishReason = 'length'
      mockChatInstance.sendMessage.mockResolvedValue({
        candidates: [
          {
            content: { parts: [{ text }] },
            finishReason: 'length',
          },
        ],
      } as unknown as GenerateContentResponse);

      const events: ServerGeminiStreamEvent[] = [];
      const reqParts: Part[] = [{ text: 'create summary_review_runner spec' }];

      for await (const event of turn.run(
        'test-model',
        reqParts,
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      const contentEvents = events.filter(
        (e) => e.type === GeminiEventType.Content,
      );
      const finishedEvents = events.filter(
        (e) => e.type === GeminiEventType.Finished,
      );
      const toolEvents = events.filter(
        (e) => e.type === GeminiEventType.ToolCallRequest,
      );

      // 1) Парсер не падает, хотя бы один Content есть
      expect(contentEvents.length).toBe(1);
      expect((contentEvents[0] as ServerGeminiContentEvent).value).toContain(
        '<tool_call>',
      );

      // 2) Из-за обрубленного JSON tool_call не создаётся
      expect(toolEvents.length).toBe(0);

      // 3) И главное: НЕ эмитим Finished, несмотря на finishReason='length'
      expect(finishedEvents.length).toBe(0);
      expect(events.some((e) => e.type === GeminiEventType.Finished)).toBe(
        false,
      );
    });

    it('should parse qwen-style tool_call with messy JSON in sync mode', async () => {
      const text =
        '<tool_call>\n' +
        '{"name": "write_file", "arguments": {' +
        '"file_path": "/Users/v.n.gusev/Documents/code/ai-review/docs/hunk_processing.md",' +
        '"content": "print(\\"hello\\")\\n"}' +
        '}\n</tool_call>';

      // sync-режим → используем sendMessage + drainPendingSyncStreamEvents
      mockChatInstance.drainPendingSyncStreamEvents.mockReturnValue([]);
      mockChatInstance.sendMessage.mockResolvedValue({
        candidates: [
          {
            content: { parts: [{ text }] },
          },
        ],
      } as unknown as GenerateContentResponse);

      // убедимся, что инструмент существует
      const hasToolMock = vi.fn((name: string) => name === 'write_file');
      mockChatInstance.hasTool = hasToolMock;

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'qwen sync tool_call' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      const toolEvents = events.filter(
        (e): e is ServerGeminiToolCallRequestEvent =>
          e.type === GeminiEventType.ToolCallRequest,
      );

      expect(toolEvents).toHaveLength(1); // ⬅️ вот эта проверка у тебя сейчас падает
      expect(toolEvents[0].value.name).toBe('write_file');
      expect(toolEvents[0].value.args).toMatchObject({
        file_path:
          '/Users/v.n.gusev/Documents/code/ai-review/docs/hunk_processing.md',
      });

      const args = toolEvents[0].value.args as Record<string, unknown>;
      expect(typeof args['content']).toBe('string');
    });

    it('should ignore <tool_call> markers inside string arguments', async () => {
      const toolCallPayload = {
        name: 'grep_search',
        arguments: {
          pattern: '<tool_call>\n{"name": "grep_search"}',
          path: '/Users/v.n.gusev/Documents/code/gusqwen',
        },
      };

      const text =
        '<tool_call>\n' + JSON.stringify(toolCallPayload) + '\n</tool_call>';

      mockChatInstance.drainPendingSyncStreamEvents.mockReturnValue([]);
      mockChatInstance.sendMessage.mockResolvedValue({
        candidates: [
          {
            content: { parts: [{ text }] },
          },
        ],
      } as unknown as GenerateContentResponse);

      mockChatInstance.hasTool = vi.fn(
        (name: string) => name === 'grep_search',
      );

      const events: ServerGeminiStreamEvent[] = [];
      for await (const event of turn.run(
        'test-model',
        [{ text: 'nested tool marker in args' }],
        new AbortController().signal,
        'sync',
      )) {
        events.push(event);
      }

      const toolEvents = events.filter(
        (e): e is ServerGeminiToolCallRequestEvent =>
          e.type === GeminiEventType.ToolCallRequest,
      );

      expect(toolEvents).toHaveLength(1);
      expect(toolEvents[0].value.name).toBe('grep_search');
      expect(toolEvents[0].value.args).toMatchObject({
        pattern: '<tool_call>\n{"name": "grep_search"}',
        path: '/Users/v.n.gusev/Documents/code/gusqwen',
      });
    });
  });

  // describe('getDebugResponses (sync)', () => {
  //   it('should return collected debug responses', async () => {
  //     const resp1 = {
  //       candidates: [{ content: { parts: [{ text: 'Debug 1' }] } }],
  //     } as unknown as GenerateContentResponse;
  //     const resp2 = {
  //       functionCalls: [{ name: 'debugTool' }],
  //     } as unknown as GenerateContentResponse;
  //
  //     mockDrainPendingSyncStreamEvents.mockReturnValue([
  //       { type: StreamEventType.CHUNK, value: resp1 },
  //       { type: StreamEventType.CHUNK, value: resp2 },
  //     ]);
  //     mockSendMessage.mockResolvedValue({} as GenerateContentResponse);
  //
  //     const reqParts: Part[] = [{ text: 'Hi' }];
  //     for await (const _ of turn.run(
  //       'test-model',
  //       reqParts,
  //       new AbortController().signal,
  //       'sync',
  //     )) {
  //       // consume events
  //     }
  //     expect(turn.getDebugResponses()).toEqual([resp1, resp2]);
  //   });
  // });
});
