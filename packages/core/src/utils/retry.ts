/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { GenerateContentResponse } from '@google/genai';
import { AuthType } from '../core/contentGenerator.js';
import {
  isProQuotaExceededError,
  isGenericQuotaExceededError,
  isQwenQuotaExceededError,
  isQwenThrottlingError,
} from './quotaErrorDetection.js';

export interface HttpError extends Error {
  status?: number;
}

export interface RetryOptions {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  shouldRetryOnError: (error: Error) => boolean;
  shouldRetryOnContent?: (content: GenerateContentResponse) => boolean;
  onPersistent429?: (
    authType?: string,
    error?: unknown,
  ) => Promise<string | boolean | null>;
  authType?: string;
  retryDelayBufferPercent?: number; // Percentage to add to retry delay for more effective operation
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxAttempts: 5,
  initialDelayMs: 5000,
  maxDelayMs: 30000, // 30 seconds
  shouldRetryOnError: defaultShouldRetry,
  retryDelayBufferPercent: 10, // Add 10% buffer to retry delays by default
};

type HttpErrorLike = {
  status?: number;
  statusCode?: number;
  response?: { status?: number; statusCode?: number };
  cause?: { status?: number } | unknown;
  code?: number | string;
  message?: string;
};

function readMessage(err: unknown): string {
  if (err instanceof Error && typeof err.message === 'string')
    return err.message;
  const e = err as { message?: unknown };
  if (typeof e?.message === 'string') return e.message;
  return String(err ?? '');
}

function readCode(err: unknown): string {
  const raw = (err as { code?: unknown })?.code;
  return typeof raw === 'string'
    ? raw.toLowerCase()
    : String(raw ?? '').toLowerCase();
}

/**
 * Default predicate function to determine if a retry should be attempted.
 * Retries on 429 (Too Many Requests), 5xx server errors, and request timeouts.
 * @param error The error object.
 * @returns True if the error is a transient error, false otherwise.
 */
export function defaultShouldRetry(error: unknown): boolean {
  const status = getErrorStatus(error);
  if (status === 429) return true;
  if (typeof status === 'number' && status >= 500 && status < 600) return true;

  const msg = readMessage(error).toLowerCase();
  if (/\b429\b/.test(msg)) return true;
  if (/rate[\s-]?limit/.test(msg)) return true;
  if (/temporar(il)?y (unavailable|overloaded|busy)/.test(msg)) return true;
  if (/request timeout/.test(msg)) return true;

  const code = readCode(error);
  if (code === 'etimedout' || code === 'econnreset' || code === 'ecanceled')
    return true;

  return false;
}

/**
 * Delays execution for a specified number of milliseconds.
 * @param ms The number of milliseconds to delay.
 * @returns A promise that resolves after the delay.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retries a function with exponential backoff and jitter.
 * Supports adding a buffer percentage to retry delays for more effective operation under rate limits.
 * @param fn The asynchronous function to retry.
 * @param options Optional retry configuration.
 * @returns A promise that resolves with the result of the function if successful.
 * @throws The last error encountered if all attempts fail.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options?: Partial<RetryOptions>,
): Promise<T> {
  if (options?.maxAttempts !== undefined && options.maxAttempts <= 0) {
    throw new Error('maxAttempts must be a positive number.');
  }

  const cleanOptions = options
    ? Object.fromEntries(Object.entries(options).filter(([_, v]) => v != null))
    : {};

  const {
    maxAttempts,
    initialDelayMs,
    maxDelayMs,
    onPersistent429,
    authType,
    shouldRetryOnError,
    shouldRetryOnContent,
    retryDelayBufferPercent,
  } = {
    ...DEFAULT_RETRY_OPTIONS,
    ...cleanOptions,
  };

  let attempt = 0;
  let currentDelay = initialDelayMs;
  let consecutive429Count = 0;

  while (attempt < maxAttempts) {
    attempt++;
    try {
      const result = await fn();

      if (
        shouldRetryOnContent &&
        shouldRetryOnContent(result as GenerateContentResponse)
      ) {
        const jitter = currentDelay * 0.3 * (Math.random() * 2 - 1);
        const delayWithJitter = Math.max(0, currentDelay + jitter);
        await delay(delayWithJitter);
        currentDelay = Math.min(maxDelayMs, currentDelay * 2);
        continue;
      }

      return result;
    } catch (error) {
      const errorStatus = getErrorStatus(error);

      // Check for Pro quota exceeded error first - immediate fallback for OAuth users
      if (
        errorStatus === 429 &&
        authType === AuthType.QWEN_OAUTH &&
        isProQuotaExceededError(error) &&
        onPersistent429
      ) {
        try {
          const fallbackModel = await onPersistent429(authType, error);
          if (fallbackModel !== false && fallbackModel !== null) {
            // Reset attempt counter and try with new model
            attempt = 0;
            consecutive429Count = 0;
            currentDelay = initialDelayMs;
            // With the model updated, we continue to the next attempt
            continue;
          } else {
            // Fallback handler returned null/false, meaning don't continue - stop retry process
            throw error;
          }
        } catch (fallbackError) {
          // If fallback fails, continue with original error
          console.warn('Fallback to Flash model failed:', fallbackError);
        }
      }

      // Check for generic quota exceeded error (but not Pro, which was handled above) - immediate fallback for OAuth users
      if (
        errorStatus === 429 &&
        authType === AuthType.QWEN_OAUTH &&
        !isProQuotaExceededError(error) &&
        isGenericQuotaExceededError(error) &&
        onPersistent429
      ) {
        try {
          const fallbackModel = await onPersistent429(authType, error);
          if (fallbackModel !== false && fallbackModel !== null) {
            // Reset attempt counter and try with new model
            attempt = 0;
            consecutive429Count = 0;
            currentDelay = initialDelayMs;
            // With the model updated, we continue to the next attempt
            continue;
          } else {
            // Fallback handler returned null/false, meaning don't continue - stop retry process
            throw error;
          }
        } catch (fallbackError) {
          // If fallback fails, continue with original error
          console.warn('Fallback to Flash model failed:', fallbackError);
        }
      }

      // Check for Gus Qwen OAuth quota exceeded error - throw immediately without retry
      // But allow retry for throttling errors (e.g., TPM rate limits)
      if (
        authType === AuthType.QWEN_OAUTH &&
        isQwenQuotaExceededError(error) &&
        !isQwenThrottlingError(error)
      ) {
        throw new Error(
          `Qwen API quota exceeded: Your Qwen API quota has been exhausted. Please wait for your quota to reset.`,
        );
      }

      // Track consecutive 429 errors, but handle Qwen throttling differently
      if (errorStatus === 429) {
        // For Qwen throttling errors, we still want to track them for exponential backoff
        // but not for quota fallback logic (since Qwen doesn't have model fallback)
        if (authType === AuthType.QWEN_OAUTH && isQwenThrottlingError(error)) {
          // Keep track of 429s but reset the consecutive count to avoid fallback logic
          consecutive429Count = 0;
        } else {
          consecutive429Count++;
        }
      } else {
        consecutive429Count = 0;
      }

      // If we have persistent 429s and a fallback callback for OAuth
      if (
        consecutive429Count >= 2 &&
        onPersistent429 &&
        authType === AuthType.QWEN_OAUTH
      ) {
        try {
          const fallbackModel = await onPersistent429(authType, error);
          if (fallbackModel !== false && fallbackModel !== null) {
            // Reset attempt counter and try with new model
            attempt = 0;
            consecutive429Count = 0;
            currentDelay = initialDelayMs;
            // With the model updated, we continue to the next attempt
            continue;
          } else {
            // Fallback handler returned null/false, meaning don't continue - stop retry process
            throw error;
          }
        } catch (fallbackError) {
          // If fallback fails, continue with original error
          console.warn('Fallback to Flash model failed:', fallbackError);
        }
      }

      // Check if we've exhausted retries or shouldn't retry
      if (attempt >= maxAttempts || !shouldRetryOnError(error as Error)) {
        throw error;
      }

      const { delayDurationMs, errorStatus: delayErrorStatus } =
        getDelayDurationAndStatus(error);

      if (delayDurationMs > 0) {
        // Respect Retry-After header if present and parsed, but add buffer percentage for more effective operation
        const bufferedDelayMs = Math.round(
          delayDurationMs * (1 + (retryDelayBufferPercent || 0) / 100),
        );
        console.warn(
          `Attempt ${attempt} failed with status ${
            delayErrorStatus ?? 'unknown'
          }. Retrying after explicit delay of ${bufferedDelayMs}ms (original: ${delayDurationMs}ms, +${retryDelayBufferPercent}% buffer)...`,
          error,
        );
        await delay(bufferedDelayMs);
        // Reset currentDelay for next potential non-429 error, or if Retry-After is not present next time
        currentDelay = initialDelayMs;
      } else {
        // Fall back to exponential backoff with jitter
        logRetryAttempt(attempt, error, errorStatus);
        // Add jitter: +/- 30% of currentDelay
        const jitter = currentDelay * 0.3 * (Math.random() * 2 - 1);
        const delayWithJitter = Math.max(0, currentDelay + jitter);
        await delay(delayWithJitter);
        currentDelay = Math.min(maxDelayMs, currentDelay * 2);
      }
    }
  }
  // This line should theoretically be unreachable due to the throw in the catch block.
  // Added for type safety and to satisfy the compiler that a promise is always returned.
  throw new Error('Retry attempts exhausted');
}

/**
 * Extracts the HTTP status code from an error object.
 * @param error The error object.
 * @returns The HTTP status code, or undefined if not found.
 */
export function getErrorStatus(error: unknown): number | undefined {
  const e = error as HttpErrorLike;
  return (
    (typeof e?.status === 'number' && e.status) ||
    (typeof e?.statusCode === 'number' && e.statusCode) ||
    (typeof e?.response?.status === 'number' && e.response.status) ||
    (typeof e?.response?.statusCode === 'number' && e.response.statusCode) ||
    (typeof (e?.cause as { status?: number })?.status === 'number'
      ? (e!.cause as { status: number }).status
      : undefined) ||
    (typeof e?.code === 'number' ? e.code : undefined)
  );
}

type HeadersLike =
  | Record<string, unknown>
  | Map<string, unknown>
  | { get(name: string): string | null }
  | undefined;

interface ResponseLike {
  headers?: HeadersLike;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return (
    typeof v === 'object' &&
    v !== null &&
    !(v instanceof Map) &&
    !('get' in (v as object))
  );
}

function isHeadersGet(v: unknown): v is { get(name: string): string | null } {
  return (
    typeof v === 'object' &&
    v !== null &&
    'get' in v &&
    typeof (v as { get?: unknown }).get === 'function'
  );
}

function isMap(v: unknown): v is Map<string, unknown> {
  return v instanceof Map;
}

function readHeader(headers: HeadersLike, name: string): string | undefined {
  if (!headers) return undefined;
  const lower = name.toLowerCase();

  if (isHeadersGet(headers)) {
    return headers.get(name) ?? headers.get(lower) ?? undefined;
  }
  if (isMap(headers)) {
    for (const [k, v] of headers.entries()) {
      if (String(k).toLowerCase() === lower)
        return typeof v === 'string' ? v : String(v);
    }
    return undefined;
  }
  if (isRecord(headers)) {
    const key = Object.keys(headers).find((k) => k.toLowerCase() === lower);
    if (!key) return undefined;
    const val = headers[key];
    return typeof val === 'string'
      ? val
      : val != null
        ? String(val)
        : undefined;
  }
  return undefined;
}

function getResponseFromError(error: unknown): ResponseLike | undefined {
  if (typeof error !== 'object' || error === null) return undefined;
  const maybe = error as { response?: unknown };
  if (maybe.response && typeof maybe.response === 'object') {
    return maybe.response as ResponseLike;
  }
  return undefined;
}

/**
 * Extracts the Retry-After delay from an error object's headers or message.
 * First checks for Retry-After header, then parses error message for delay information.
 * @param error The error object.
 * @returns The delay in milliseconds, or 0 if not found or invalid.
 */
export function getRetryAfterDelayMs(error: unknown): number {
  // 1) Пробуем заголовки ответа
  const resp = getResponseFromError(error);
  const headers = resp?.headers;

  const retryAfterHeader =
    readHeader(headers, 'Retry-After') ?? readHeader(headers, 'retry-after');

  if (retryAfterHeader) {
    const secs = Number(retryAfterHeader);
    if (!Number.isNaN(secs)) return secs * 1000;

    const asDate = new Date(retryAfterHeader);
    if (!Number.isNaN(asDate.getTime())) {
      return Math.max(0, asDate.getTime() - Date.now());
    }
  }

  // 2) OpenAI-подобные хедеры сброса лимита (секунды до сброса)
  const oaReset =
    readHeader(headers, 'x-ratelimit-reset-requests') ??
    readHeader(headers, 'x-ratelimit-reset-tokens');

  if (oaReset) {
    const s = Number(oaReset);
    if (!Number.isNaN(s)) return Math.max(0, s) * 1000;
  }

  // 3) Парсим текст ошибки: "retry after 2.9s" / "431.9ms" / "4m26.80809158s"
  const msg =
    error instanceof Error
      ? error.message
      : typeof (error as { message?: unknown })?.message === 'string'
        ? (error as { message: string }).message
        : String(error ?? '');

  // Обработка формата с минутами и секундами (4m26.80809158s)
  const m1 = msg.match(/retry after (\d+)m([\d.]+)s/i);
  if (m1) {
    const minutes = Number(m1[1]);
    const seconds = Number(m1[2]);
    if (!Number.isNaN(minutes) && !Number.isNaN(seconds)) {
      return (minutes * 60 + seconds) * 1000;
    }
  }

  // Обработка формата только с минутами (4m)
  const m2 = msg.match(/retry after (\d+)m/i);
  if (m2) {
    const minutes = Number(m2[1]);
    if (!Number.isNaN(minutes)) {
      return minutes * 60 * 1000;
    }
  }

  // Обработка формата с секундами и миллисекундами (2.9s, 431.9ms)
  const m3 = msg.match(/retry after (\d+\.?\d*)\s*(s|ms)/i);
  if (m3) {
    const value = Number(m3[1]);
    if (!Number.isNaN(value)) {
      return m3[2].toLowerCase() === 's' ? value * 1000 : value;
    }
  }

  return 0;
}

/**
 * Determines the delay duration based on the error, prioritizing Retry-After header.
 * @param error The error object.
 * @returns An object containing the delay duration in milliseconds and the error status.
 */
function getDelayDurationAndStatus(error: unknown): {
  delayDurationMs: number;
  errorStatus: number | undefined;
} {
  const errorStatus = getErrorStatus(error);
  let delayDurationMs = 0;

  if (errorStatus === 429 || errorStatus === 503) {
    delayDurationMs = getRetryAfterDelayMs(error);
  }
  return { delayDurationMs, errorStatus };
}

/**
 * Logs a message for a retry attempt when using exponential backoff.
 * @param attempt The current attempt number.
 * @param error The error that caused the retry.
 * @param errorStatus The HTTP status code of the error, if available.
 */
function logRetryAttempt(
  attempt: number,
  error: unknown,
  errorStatus?: number,
): void {
  let message = `Attempt ${attempt} failed. Retrying with backoff...`;
  if (errorStatus) {
    message = `Attempt ${attempt} failed with status ${errorStatus}. Retrying with backoff...`;
  }

  if (errorStatus === 429) {
    console.warn(message, error);
  } else if (errorStatus && errorStatus >= 500 && errorStatus < 600) {
    console.error(message, error);
  } else if (error instanceof Error) {
    // Fallback for errors that might not have a status but have a message
    if (error.message.includes('429')) {
      console.warn(
        `Attempt ${attempt} failed with 429 error (no Retry-After header). Retrying with backoff...`,
        error,
      );
    } else if (error.message.match(/5\d{2}/)) {
      console.error(
        `Attempt ${attempt} failed with 5xx error. Retrying with backoff...`,
        error,
      );
    } else {
      console.warn(message, error); // Default to warn for other errors
    }
  } else {
    console.warn(message, error); // Default to warn if error type is unknown
  }
}

/**
 * Retries a function with exponential backoff and jitter, with the ability to reset the attempt counter on 429 errors.
 * This is useful for rate limits where a successful retry after the specified delay should start a new series of attempts.
 * @param fn The asynchronous function to retry.
 * @param options Optional retry configuration.
 * @returns A promise that resolves with the result of the function if successful.
 * @throws The last error encountered if all attempts fail.
 */
export async function retryWithBackoffAndResetOn429<T>(
  fn: () => Promise<T>,
  options?: Partial<RetryOptions>,
): Promise<T> {
  // Используем внутренний счетчик для отслеживания общего числа попыток, если это нужно
  let totalAttempts = 0;
  const maxTotalAttempts =
    options?.maxAttempts || DEFAULT_RETRY_OPTIONS.maxAttempts;
  const retryDelayBufferPercent =
    options?.retryDelayBufferPercent ??
    DEFAULT_RETRY_OPTIONS.retryDelayBufferPercent;

  while (totalAttempts < maxTotalAttempts) {
    try {
      // Выполняем основную логику повторных попыток
      return await retryWithBackoff(fn, options);
    } catch (error) {
      totalAttempts++;

      // Проверяем, является ли ошибка 429
      const errorStatus = getErrorStatus(error);
      if (errorStatus === 429) {
        // Сначала пробуем получить задержку из заголовка
        let { delayDurationMs } = getDelayDurationAndStatus(error);

        // Если заголовок Retry-After отсутствует, пробуем распарсить тело ответа
        if (delayDurationMs === 0) {
          const resp = getResponseFromError(error);
          if (resp && 'text' in resp) {
            try {
              // Предполагаем, что у ответа есть метод text()
              const bodyText = await (
                resp as { text(): Promise<string> }
              ).text();
              // Ищем в тексте тела шаблон, например, "6.25824207s"
              const match = bodyText.match(/(\d+\.?\d*)s/);
              if (match) {
                const seconds = parseFloat(match[1]);
                if (!isNaN(seconds)) {
                  delayDurationMs = seconds * 1000;
                }
              }
            } catch (parseError) {
              console.warn(
                'Failed to parse response body for retry delay:',
                parseError,
              );
            }
          }
        }

        if (delayDurationMs > 0) {
          const bufferedDelayMs = Math.round(
            delayDurationMs * (1 + (retryDelayBufferPercent || 0) / 100),
          );
          // Сбрасываем логику retryWithBackoff, начиная цикл заново
          // Это имитирует "сброс" счетчика попыток
          console.warn(
            `429 error with delay detected (from header or body). Resetting attempt counter and retrying after ${bufferedDelayMs}ms.`,
          );
          await delay(bufferedDelayMs);
          continue; // Начинаем цикл while заново
        }
      }

      // Если это не 429 с задержкой, или достигнуто максимальное количество попыток, пробрасываем ошибку
      throw error;
    }
  }

  throw new Error('Total retry attempts exhausted');
}
