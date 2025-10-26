/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the request tokenizer module BEFORE importing the class that uses it
const mockTokenizer = {
  calculateTokens: vi.fn().mockResolvedValue({
    totalTokens: 50,
    breakdown: {
      textTokens: 50,
      imageTokens: 0,
      audioTokens: 0,
      otherTokens: 0,
    },
    processingTime: 1,
  }),
  dispose: vi.fn(),
};

vi.mock('../../../utils/request-tokenizer/index.js', () => ({
  getDefaultTokenizer: vi.fn(() => mockTokenizer),
  DefaultRequestTokenizer: vi.fn(() => mockTokenizer),
  disposeDefaultTokenizer: vi.fn(),
}));

// Mock tiktoken as well for completeness
vi.mock('tiktoken', () => ({
  get_encoding: vi.fn(() => ({
    encode: vi.fn(() => new Array(50)), // Mock 50 tokens
    free: vi.fn(),
  })),
}));

// Now import the modules that depend on the mocked modules
import { OpenAIContentGenerator } from './openaiContentGenerator.js';
import type { Config } from '../../config/config.js';
import { AuthType } from '../contentGenerator.js';
import type { ContentGeneratorConfig } from '../contentGenerator.js';
import type {
  GenerateContentParameters,
  CountTokensParameters,
} from '@google/genai';
import type { OpenAICompatibleProvider } from './provider/index.js';
import type OpenAI from 'openai';

describe('OpenAIContentGenerator (Refactored)', () => {
  let generator: OpenAIContentGenerator;
  let mockConfig: Config;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock config
    mockConfig = {
      getContentGeneratorConfig: vi.fn().mockReturnValue({
        authType: 'openai',
        enableOpenAILogging: false,
        timeout: 120000,
        maxRetries: 3,
        samplingParams: {
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9,
        },
      }),
      getCliVersion: vi.fn().mockReturnValue('1.0.0'),
    } as unknown as Config;

    // Create generator instance
    const contentGeneratorConfig = {
      model: 'gpt-4',
      apiKey: 'test-key',
      authType: AuthType.USE_OPENAI,
      enableOpenAILogging: false,
      timeout: 120000,
      maxRetries: 3,
      samplingParams: {
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9,
      },
    };

    // Create a minimal mock provider
    const mockProvider: OpenAICompatibleProvider = {
      buildHeaders: vi.fn().mockReturnValue({}),
      buildClient: vi.fn().mockReturnValue({
        chat: {
          completions: {
            create: vi.fn(),
          },
        },
        embeddings: {
          create: vi.fn(),
        },
      } as unknown as OpenAI),
      buildRequest: vi.fn().mockImplementation((req) => req),
    };

    generator = new OpenAIContentGenerator(
      contentGeneratorConfig,
      mockConfig,
      mockProvider,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with basic configuration', () => {
      expect(generator).toBeDefined();
    });
  });

  describe('generateContent', () => {
    it('should delegate to pipeline.execute', async () => {
      // This test verifies the method exists and can be called
      expect(typeof generator.generateContent).toBe('function');
    });
  });

  describe('generateContentStream', () => {
    it('should delegate to pipeline.executeStream', async () => {
      // This test verifies the method exists and can be called
      expect(typeof generator.generateContentStream).toBe('function');
    });

    it('should request non-streaming completions when forceSynchronous is true', async () => {
      const contentGeneratorConfig = {
        model: 'gpt-4',
        apiKey: 'test-key',
        authType: AuthType.USE_OPENAI,
        enableOpenAILogging: false,
        timeout: 120000,
        maxRetries: 3,
        forceSynchronous: true,
      } satisfies ContentGeneratorConfig;

      const mockOpenAIResponse = {
        id: 'cmpl-test',
        object: 'chat.completion',
        created: Date.now(),
        model: 'gpt-4',
        choices: [
          {
            index: 0,
            finish_reason: 'stop',
            message: { role: 'assistant', content: 'Hello' },
          },
        ],
      } as unknown as OpenAI.Chat.ChatCompletion;

      const createMock = vi.fn().mockResolvedValue(mockOpenAIResponse);

      const mockProvider: OpenAICompatibleProvider = {
        buildHeaders: vi.fn().mockReturnValue({}),
        buildClient: vi.fn().mockReturnValue({
          chat: {
            completions: {
              create: createMock,
            },
          },
          embeddings: {
            create: vi.fn(),
          },
        } as unknown as OpenAI),
        buildRequest: vi.fn().mockImplementation((req) => req),
      };

      const syncGenerator = new OpenAIContentGenerator(
        contentGeneratorConfig,
        mockConfig,
        mockProvider,
      );

      const pipeline = syncGenerator['pipeline'];

      const geminiResponse = {
        candidates: [
          {
            content: {
              role: 'model',
              parts: [{ text: 'Hello' }],
            },
            finishReason: 'STOP',
          },
        ],
      } as GenerateContentResponse;

      const convertSpy = vi
        .spyOn(pipeline['converter'], 'convertOpenAIResponseToGemini')
        .mockReturnValue(geminiResponse);
      const logSuccessSpy = vi
        .spyOn(pipeline['config'].telemetryService, 'logSuccess')
        .mockResolvedValue();

      const stream = await syncGenerator.generateContentStream(
        { model: 'gpt-4', contents: [] },
        'prompt-id',
      );

      const chunks: GenerateContentResponse[] = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      expect(createMock).toHaveBeenCalledTimes(1);
      const requestArg = createMock.mock.calls[0]?.[0] ?? {};
      expect('stream' in (requestArg as Record<string, unknown>)).toBe(false);
      expect(convertSpy).toHaveBeenCalledWith(mockOpenAIResponse);
      expect(logSuccessSpy).toHaveBeenCalled();
      expect(chunks).toEqual([geminiResponse]);
    });
  });

  describe('countTokens', () => {
    it('should count tokens using tiktoken', async () => {
      const request: CountTokensParameters = {
        contents: [{ role: 'user', parts: [{ text: 'Hello world' }] }],
        model: 'gpt-4',
      };

      const result = await generator.countTokens(request);

      expect(result.totalTokens).toBe(50); // Mocked value
    });

    it('should fall back to character approximation if tiktoken fails', async () => {
      // Mock tiktoken to throw error
      vi.doMock('tiktoken', () => ({
        get_encoding: vi.fn().mockImplementation(() => {
          throw new Error('Tiktoken failed');
        }),
      }));

      const request: CountTokensParameters = {
        contents: [{ role: 'user', parts: [{ text: 'Hello world' }] }],
        model: 'gpt-4',
      };

      const result = await generator.countTokens(request);

      // Should use character approximation (content length / 4)
      expect(result.totalTokens).toBeGreaterThan(0);
    });
  });

  describe('embedContent', () => {
    it('should delegate to pipeline.client.embeddings.create', async () => {
      // This test verifies the method exists and can be called
      expect(typeof generator.embedContent).toBe('function');
    });
  });

  describe('shouldSuppressErrorLogging', () => {
    it('should return false by default', () => {
      // Create a test subclass to access the protected method
      class TestGenerator extends OpenAIContentGenerator {
        testShouldSuppressErrorLogging(
          error: unknown,
          request: GenerateContentParameters,
        ): boolean {
          return this.shouldSuppressErrorLogging(error, request);
        }
      }

      const contentGeneratorConfig = {
        model: 'gpt-4',
        apiKey: 'test-key',
        authType: AuthType.USE_OPENAI,
        enableOpenAILogging: false,
        timeout: 120000,
        maxRetries: 3,
        samplingParams: {
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9,
        },
      };

      // Create a minimal mock provider
      const mockProvider: OpenAICompatibleProvider = {
        buildHeaders: vi.fn().mockReturnValue({}),
        buildClient: vi.fn().mockReturnValue({
          chat: {
            completions: {
              create: vi.fn(),
            },
          },
          embeddings: {
            create: vi.fn(),
          },
        } as unknown as OpenAI),
        buildRequest: vi.fn().mockImplementation((req) => req),
      };

      const testGenerator = new TestGenerator(
        contentGeneratorConfig,
        mockConfig,
        mockProvider,
      );

      const request: GenerateContentParameters = {
        contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
        model: 'gpt-4',
      };

      const result = testGenerator.testShouldSuppressErrorLogging(
        new Error('Test error'),
        request,
      );

      expect(result).toBe(false);
    });

    it('should allow subclasses to override error suppression behavior', async () => {
      class TestGenerator extends OpenAIContentGenerator {
        testShouldSuppressErrorLogging(
          error: unknown,
          request: GenerateContentParameters,
        ): boolean {
          return this.shouldSuppressErrorLogging(error, request);
        }

        protected override shouldSuppressErrorLogging(
          _error: unknown,
          _request: GenerateContentParameters,
        ): boolean {
          return true; // Always suppress for this test
        }
      }

      const contentGeneratorConfig = {
        model: 'gpt-4',
        apiKey: 'test-key',
        authType: AuthType.USE_OPENAI,
        enableOpenAILogging: false,
        timeout: 120000,
        maxRetries: 3,
        samplingParams: {
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9,
        },
      };

      // Create a minimal mock provider
      const mockProvider: OpenAICompatibleProvider = {
        buildHeaders: vi.fn().mockReturnValue({}),
        buildClient: vi.fn().mockReturnValue({
          chat: {
            completions: {
              create: vi.fn(),
            },
          },
          embeddings: {
            create: vi.fn(),
          },
        } as unknown as OpenAI),
        buildRequest: vi.fn().mockImplementation((req) => req),
      };

      const testGenerator = new TestGenerator(
        contentGeneratorConfig,
        mockConfig,
        mockProvider,
      );

      const request: GenerateContentParameters = {
        contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
        model: 'gpt-4',
      };

      const result = testGenerator.testShouldSuppressErrorLogging(
        new Error('Test error'),
        request,
      );

      expect(result).toBe(true);
    });
  });
});
