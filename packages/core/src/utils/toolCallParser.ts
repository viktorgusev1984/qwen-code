/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { FunctionCall } from '@google/genai';

const OPEN_TAG = '<tool_call>';
const CLOSE_TAG = '</tool_call>';
const MAX_RAW = 200_000;

export type ToolCallParseResult = {
  functionCalls: FunctionCall[];
  content: string;
};

export class ToolCallStreamParser {
  private toolCallRawBuffer = '';

  reset(): void {
    this.toolCallRawBuffer = '';
  }

  parseChunk(text: string): ToolCallParseResult {
    if (!text) {
      return { functionCalls: [], content: '' };
    }

    const hasToolMarkers =
      text.includes(OPEN_TAG) || text.includes('[tool_call:');

    if (hasToolMarkers) {
      if (!this.toolCallRawBuffer) {
        if (text.includes(OPEN_TAG) && text.includes(CLOSE_TAG)) {
          return processToolCallText(text);
        }
        if (text.includes('[tool_call:') && text.includes(']')) {
          return processToolCallText(text);
        }
      }

      this.toolCallRawBuffer += text;
      if (this.toolCallRawBuffer.length > MAX_RAW) {
        this.toolCallRawBuffer = this.toolCallRawBuffer.slice(-MAX_RAW);
      }

      if (this.toolCallRawBuffer.includes(CLOSE_TAG)) {
        const result = processToolCallText(this.toolCallRawBuffer);
        this.toolCallRawBuffer = '';
        return result;
      }

      if (
        this.toolCallRawBuffer.includes('[tool_call:') &&
        this.toolCallRawBuffer.includes(']')
      ) {
        const result = processToolCallText(this.toolCallRawBuffer);
        this.toolCallRawBuffer = '';
        return result;
      }

      return { functionCalls: [], content: '' };
    }

    return tryParseBareFunctionJson(text);
  }

  flush(): ToolCallParseResult {
    if (!this.toolCallRawBuffer) {
      return { functionCalls: [], content: '' };
    }

    const result = processToolCallText(this.toolCallRawBuffer);
    this.toolCallRawBuffer = '';
    return result;
  }

  get hasTruncatedToolCall(): boolean {
    return (
      !!this.toolCallRawBuffer &&
      this.toolCallRawBuffer.includes(OPEN_TAG) &&
      !this.toolCallRawBuffer.includes(CLOSE_TAG)
    );
  }
}

// Parses "path '...'/\"...\"/`...` with content '...'" -> { path: "...", content: "..." }
function parseKeyValueArgString(s: string): Record<string, unknown> {
  const args: Record<string, unknown> = {};
  const normalized = normalizeQuotes(s);
  // Allow "for ... with ... and ..." - ignore connector words.
  const re = /\b([a-zA-Z0-9_./:-]+)\s+(['"`])([\s\S]*?)\2/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(normalized)) !== null) {
    const key = m[1].toLowerCase();
    if (key === 'with' || key === 'and' || key === 'for' || key === 'equals') {
      continue;
    }
    const val = unescapeCommon((m[3] ?? '').trim());
    args[key] = val;
  }
  return args;
}

function unescapeCommon(str: string): string {
  if (str.includes('\\n') || str.includes('\\t') || str.includes('\\r')) {
    try {
      const escaped = str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return JSON.parse(`"${escaped}"`);
    } catch {
      return str
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t');
    }
  }
  return str;
}

function normalizeQuotes(str: string): string {
  return str.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
}

function stripCodeFence(raw: string): string {
  let s = raw.trim();
  if (!s.startsWith('```')) return s;
  const firstNl = s.indexOf('\n');
  if (firstNl === -1) return s;
  s = s.slice(firstNl + 1);
  const fence = s.lastIndexOf('```');
  if (fence !== -1) s = s.slice(0, fence);
  return s.trim();
}

type ToolCallMarker = { index: number; type: 'open' | 'close' };

function findToolCallMarkersOutsideStrings(
  text: string,
  openTag: string,
  closeTag: string,
): ToolCallMarker[] {
  const markers: ToolCallMarker[] = [];
  let inSingle = false;
  let inDouble = false;
  let inBacktick = false;
  let escapeNext = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (ch === '\\') {
      escapeNext = true;
      continue;
    }

    if (!inDouble && !inBacktick && ch === "'") {
      inSingle = !inSingle;
      continue;
    }

    if (!inSingle && !inBacktick && ch === '"') {
      inDouble = !inDouble;
      continue;
    }

    if (!inSingle && !inDouble && ch === '`') {
      inBacktick = !inBacktick;
      continue;
    }

    if (inSingle || inDouble || inBacktick) continue;

    if (text.startsWith(openTag, i)) {
      markers.push({ index: i, type: 'open' });
      i += openTag.length - 1;
      continue;
    }

    if (text.startsWith(closeTag, i)) {
      markers.push({ index: i, type: 'close' });
      i += closeTag.length - 1;
    }
  }

  return markers;
}

function tryParseBracketToolCalls(text: string): FunctionCall[] {
  const calls: FunctionCall[] = [];
  const outer = /\[tool_call:\s*([\w.:/-]+)([\s\S]*?)]/gi;
  let m: RegExpExecArray | null;

  while ((m = outer.exec(text)) !== null) {
    const name = m[1];
    const tail = (m[2] ?? '').trim();
    let args: Record<string, unknown> = {};

    const forMatch = /\bfor\b([\s\S]*)$/i.exec(tail);
    const rawAfterFor = forMatch ? forMatch[1].trim() : '';

    if (rawAfterFor) {
      const namedArgs = parseForWithArguments(rawAfterFor);
      if (namedArgs) {
        const parsedArgs = parseLooseObject(namedArgs.argText) ?? {};

        if (name === 'task') {
          const taskArgs: Record<string, unknown> = { ...parsedArgs };
          if (!('subagent_type' in taskArgs)) {
            taskArgs['subagent_type'] = namedArgs.target;
          }

          let prompt = '';
          if (typeof taskArgs['prompt'] === 'string') {
            prompt = taskArgs['prompt'] as string;
          } else if (typeof taskArgs['query'] === 'string') {
            prompt = taskArgs['query'] as string;
            taskArgs['prompt'] = prompt;
          }

          if (!('description' in taskArgs)) {
            taskArgs['description'] = createShortDescription(
              prompt || namedArgs.target,
            );
          }

          args = taskArgs;
        } else if (Object.keys(parsedArgs).length > 0) {
          args = { input: namedArgs.target, ...parsedArgs };
        } else {
          args = { input: namedArgs.target };
        }
      }

      if (name === 'todo_write' && !Object.keys(args).length) {
        const todoArgs = parseTodoWriteArgs(rawAfterFor);
        if (todoArgs) {
          args = todoArgs;
        }
      }

      if (!Object.keys(args).length && name === 'read_file') {
        const filePath = extractSingleArgString(rawAfterFor);
        if (filePath) {
          args = { absolute_path: filePath };
        }
      }

      if (!Object.keys(args).length) {
        const normalized = normalizeQuotes(rawAfterFor);
        const argsMatch = /\barguments\b\s+([\s\S]+)$/i.exec(normalized);
        const argText = argsMatch ? argsMatch[1].trim() : normalized;
        const looseArgs = parseLooseObject(argText);
        if (looseArgs) {
          args = looseArgs;
        }
      }

      if (!Object.keys(args).length) {
        const normalized = normalizeQuotes(rawAfterFor);
        const q = /^(['"`])([\s\S]*?)\1\s*$/.exec(normalized);
        if (q) {
          const rawArg = (q[2] ?? '').trim();
          try {
            const maybe = JSON.parse(rawArg);
            if (maybe && typeof maybe === 'object') {
              args = maybe as Record<string, unknown>;
            } else {
              args = { input: unescapeCommon(rawArg) };
            }
          } catch {
            args = { input: unescapeCommon(rawArg) };
          }
        } else {
          const kv = parseKeyValueArgString(normalized);
          if (Object.keys(kv).length > 0) {
            args = kv;
          } else {
            args = { input: unescapeCommon(normalized) };
          }
        }
      }
    }

    if (
      name === 'run_shell_command' &&
      'input' in args &&
      typeof args['input'] === 'string'
    ) {
      const command = args['input'] as string;
      args = { command, is_background: false };
    }

    calls.push({ name, args } as FunctionCall);
  }

  return calls;
}

function extractSingleArgString(raw: string): string | null {
  const normalized = normalizeQuotes(raw).trim();
  if (!normalized) return null;
  const q = /^(['"`])([\s\S]*?)\1\s*$/.exec(normalized);
  if (q) {
    return unescapeCommon((q[2] ?? '').trim());
  }
  return unescapeCommon(normalized);
}

function parseForWithArguments(
  raw: string,
): { target: string; argText: string } | null {
  const normalized = normalizeQuotes(raw).trim();
  const match =
    /^(['"`])([\s\S]*?)\1\s+with\s+arguments\s+([\s\S]+)$/i.exec(normalized);
  if (!match) return null;
  return {
    target: unescapeCommon(match[2].trim()),
    argText: match[3].trim(),
  };
}

function parseLooseObject(raw: string): Record<string, unknown> | null {
  let text = normalizeQuotes(raw).trim();
  if (!text) return null;
  if (!text.startsWith('{') || !text.endsWith('}')) return null;

  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // continue
  }

  const singleToDouble = text.replace(
    /'([^'\\]*(?:\\.[^'\\]*)*)'/g,
    (_match, inner: string) => `"${inner.replace(/"/g, '\\"')}"`,
  );

  try {
    const parsed = JSON.parse(singleToDouble);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    return null;
  }

  return null;
}

function createShortDescription(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return 'Task';
  const words = trimmed.split(/\s+/).slice(0, 5).join(' ');
  return words.length > 0 ? words : 'Task';
}

function parseTodoWriteArgs(rawAfterFor: string): Record<string, unknown> | null {
  const normalized = normalizeQuotes(rawAfterFor);
  const markerMatch = /\btodos?\s*:\s*/i.exec(normalized);
  const listSource = markerMatch
    ? normalized.slice(markerMatch.index + markerMatch[0].length)
    : normalized;

  const todos = parseTodoLines(listSource);
  if (!todos.length) return null;
  return { todos };
}

function parseTodoLines(
  text: string,
): Array<{ id: string; content: string; status: string }> {
  const lines = text.split('\n');
  const todos: Array<{ id: string; content: string; status: string }> = [];
  let idx = 1;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const m = /^(?:\d+[\).\s-]|[-*+]\s+)(.+)$/.exec(line);
    const payload = (m ? m[1] : line).trim();
    if (!payload) continue;

    const { content, status } = extractTodoStatus(payload);
    if (!content) continue;

    todos.push({
      id: `todo-${idx}`,
      content,
      status,
    });
    idx += 1;
  }

  return todos;
}

function extractTodoStatus(payload: string): {
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
} {
  const statusMatch =
    /(?:\s*[-–—]\s*|\s*\[\s*|\s*\(\s*)(pending|in_progress|completed|in progress)\s*(?:\]|\))?\s*$/i.exec(
      payload,
    );

  if (!statusMatch) {
    return { content: payload.trim(), status: 'pending' };
  }

  const rawStatus = statusMatch[1].toLowerCase().replace(/\s+/g, '_');
  const status =
    rawStatus === 'in_progress' || rawStatus === 'completed'
      ? (rawStatus as 'in_progress' | 'completed')
      : 'pending';

  const content = payload.slice(0, statusMatch.index).trim();
  return { content, status };
}

function tryParseBareFunctionJson(text: string): ToolCallParseResult {
  const functionCalls: FunctionCall[] = [];
  let s = stripCodeFence(text);

  if (!s.includes('{') || !s.includes('}')) {
    return { functionCalls, content: text };
  }

  if (!/^\s*[[{]/.test(s)) {
    const b = s.indexOf('{');
    const e = s.lastIndexOf('}');
    if (b >= 0 && e > b) {
      s = s.slice(b, e + 1).trim();
    }
  }

  const parsed = createToolCallsFromJson(s);
  if (!parsed || !parsed.functionCalls.length) {
    return { functionCalls, content: text };
  }

  functionCalls.push(...parsed.functionCalls);

  const content =
    parsed.fallbackContent && !/^\s*[{[]/.test(parsed.fallbackContent)
      ? parsed.fallbackContent
      : '';

  return { functionCalls, content };
}

function processToolCallText(text: string): ToolCallParseResult {
  const functionCalls: FunctionCall[] = [];
  let content = '';

  if (!text.includes(OPEN_TAG) && !text.includes('[tool_call:')) {
    return { functionCalls: [], content: text };
  }

  type Pair = { open: number; close: number };
  const pairs: Pair[] = [];
  const stack: number[] = [];
  const markers = findToolCallMarkersOutsideStrings(text, OPEN_TAG, CLOSE_TAG);

  for (const marker of markers) {
    if (marker.type === 'open') {
      stack.push(marker.index);
    } else if (stack.length > 0) {
      const openIdx = stack.pop()!;
      pairs.push({ open: openIdx, close: marker.index });
    }
  }

  if (!pairs.length) {
    const lastOpenIdx = text.lastIndexOf(OPEN_TAG);

    if (lastOpenIdx !== -1) {
      const beforeToolCall = text.slice(0, lastOpenIdx);
      const afterToolCall = text.slice(lastOpenIdx + OPEN_TAG.length);
      const { functionCalls: tailCalls, content: tailContent } =
        tryParseBareFunctionJson(afterToolCall);

      if (tailCalls.length > 0) {
        return {
          functionCalls: tailCalls,
          content: beforeToolCall + (tailContent ?? ''),
        };
      }
    }

    const { functionCalls: bareCalls } = tryParseBareFunctionJson(text);
    if (bareCalls.length) {
      return { functionCalls: bareCalls, content: '' };
    }

    const bracketCalls = tryParseBracketToolCalls(text);
    if (bracketCalls.length) {
      return { functionCalls: bracketCalls, content: '' };
    }

    return { functionCalls: [], content: text };
  }

  const outerPairs = pairs.filter(
    (p) =>
      !pairs.some(
        (other) =>
          other !== p && other.open <= p.open && other.close >= p.close,
      ),
  );

  outerPairs.sort((a, b) => a.open - b.open);

  const stripInnerTags = (s: string) => {
    const innerMarkers = findToolCallMarkersOutsideStrings(
      s,
      OPEN_TAG,
      CLOSE_TAG,
    );
    if (!innerMarkers.length) return s;

    let cursor = 0;
    let result = '';

    for (const marker of innerMarkers) {
      result += s.slice(cursor, marker.index);
      cursor =
        marker.index +
        (marker.type === 'open' ? OPEN_TAG.length : CLOSE_TAG.length);
    }

    result += s.slice(cursor);
    return result;
  };

  let cursor = 0;

  for (const p of outerPairs) {
    if (cursor < p.open) {
      content += text.slice(cursor, p.open);
    }

    const rawPayload = text.slice(p.open + OPEN_TAG.length, p.close).trim();
    const sanitized = stripInnerTags(rawPayload);
    const result = createToolCallsFromJson(sanitized);

    if (!result) {
      const { functionCalls: bareCalls, content: bareContent } =
        tryParseBareFunctionJson(sanitized);

      if (bareCalls.length) {
        functionCalls.push(...bareCalls);
        if (bareContent) {
          content += bareContent;
        }
        cursor = p.close + CLOSE_TAG.length;
        continue;
      }
    }

    if (result) {
      functionCalls.push(...result.functionCalls);
      if (result.fallbackContent && !/^\s*[{[]/.test(result.fallbackContent)) {
        content += result.fallbackContent;
      }
    } else {
      content += text.slice(p.open, p.close + CLOSE_TAG.length);
    }

    cursor = p.close + CLOSE_TAG.length;
  }

  if (cursor < text.length) {
    content += text.slice(cursor);
  }

  if (!functionCalls.length) {
    const bracketCalls = tryParseBracketToolCalls(text);
    if (bracketCalls.length) {
      return { functionCalls: bracketCalls, content: '' };
    }
  }

  return { functionCalls, content };
}

function createToolCallsFromJson(
  jsonPayload: string,
): { functionCalls: FunctionCall[]; fallbackContent: string } | null {
  if (!jsonPayload) return null;

  let trimmed = jsonPayload.trim();
  if (trimmed.startsWith('```')) {
    const firstNl = trimmed.indexOf('\n');
    if (firstNl !== -1) {
      trimmed = trimmed.slice(firstNl + 1);
      const fence = trimmed.lastIndexOf('```');
      if (fence !== -1) trimmed = trimmed.slice(0, fence).trim();
    }
  }

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      const unquoted = JSON.parse(trimmed);
      if (typeof unquoted === 'string') {
        trimmed = unquoted.trim();
      }
    } catch {
      // leave as-is
    }
  }

  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    const s = trimmed.indexOf('{');
    const e = trimmed.lastIndexOf('}');
    if (s >= 0 && e > s) trimmed = trimmed.slice(s, e + 1).trim();
  }

  let parsed: unknown | null = null;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    const s = trimmed.indexOf('{');
    const e = trimmed.lastIndexOf('}');
    if (s >= 0 && e > s) {
      const candidateJson = trimmed.slice(s, e + 1);
      try {
        parsed = JSON.parse(candidateJson);
      } catch {
        const repaired = candidateJson.replace(/,\s*([}\]])/g, '$1');
        try {
          parsed = JSON.parse(repaired);
        } catch {
          parsed = null;
        }
      }
    }
  }

  if (!parsed || typeof parsed !== 'object') {
    const fallbackCall = createToolCallFromBrokenPayload(trimmed);
    if (!fallbackCall) return null;
    return { functionCalls: [fallbackCall], fallbackContent: '' };
  }

  const candidate = parsed as Record<string, unknown>;

  const fallbackContent =
    typeof candidate['content'] === 'string'
      ? (candidate['content'] as string)
      : typeof candidate['text'] === 'string'
        ? (candidate['text'] as string)
        : '';

  const functionCalls: FunctionCall[] = [];

  const toolCallsCandidate =
    candidate['tool_calls'] ??
    candidate['toolCalls'] ??
    candidate['function_calls'] ??
    candidate['functionCalls'];

  if (Array.isArray(toolCallsCandidate)) {
    for (const item of toolCallsCandidate as unknown[]) {
      if (!item || typeof item !== 'object') continue;
      const fnCall = createFunctionCallFromCandidate(
        item as Record<string, unknown>,
      );
      if (fnCall) {
        functionCalls.push(fnCall);
      }
    }
  } else {
    const fnCall = createFunctionCallFromCandidate(candidate);
    if (fnCall) {
      functionCalls.push(fnCall);
    }
  }

  if (!functionCalls.length) {
    const fallbackCall = createToolCallFromBrokenPayload(trimmed);
    if (!fallbackCall) return null;
    return { functionCalls: [fallbackCall], fallbackContent };
  }

  return { functionCalls, fallbackContent };
}

function createToolCallFromBrokenPayload(raw: string): FunctionCall | null {
  const nameMatch = /"name"\s*:\s*"([^"]+)"/.exec(raw);
  if (!nameMatch) return null;
  const name = nameMatch[1];

  const args: Record<string, unknown> = {};

  const filePathMatch = /"file_path"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(raw);
  if (filePathMatch) {
    args['file_path'] = unescapeCommon(filePathMatch[1]);
  }

  const contentMatch = /"content"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(raw);
  if (contentMatch) {
    args['content'] = unescapeCommon(contentMatch[1]);
  }

  const commandMatch = /"command"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(raw);
  if (commandMatch) {
    args['command'] = unescapeCommon(commandMatch[1]);
  }

  const argsMatch = /"arguments"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(raw);
  if (argsMatch) {
    const rawArgs = unescapeCommon(argsMatch[1]);
    try {
      const parsed = JSON.parse(rawArgs);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        Object.assign(args, parsed as Record<string, unknown>);
      } else {
        args['input'] = rawArgs;
      }
    } catch {
      args['input'] = rawArgs;
    }
  }

  const objectArgs = extractJsonObjectAfterKey(raw, 'arguments');
  if (objectArgs) {
    try {
      const parsed = JSON.parse(objectArgs);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        Object.assign(args, parsed as Record<string, unknown>);
      }
    } catch {
      // ignore
    }
  }

  if (!Object.keys(args).length) return null;

  return { name, args } as FunctionCall;
}

function extractJsonObjectAfterKey(raw: string, key: string): string | null {
  const keyIdx = raw.indexOf(`"${key}"`);
  if (keyIdx === -1) return null;

  const braceStart = raw.indexOf('{', keyIdx);
  if (braceStart === -1) return null;

  let depth = 0;
  for (let i = braceStart; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === '{') depth++;
    else if (ch === '}') depth--;

    if (depth === 0) {
      return raw.slice(braceStart, i + 1);
    }
  }
  return null;
}

function createFunctionCallFromCandidate(
  candidate: Record<string, unknown>,
): FunctionCall | null {
  if (
    (candidate['type'] === 'function' || candidate['object'] === 'function') &&
    (candidate['name'] ||
      (candidate['function'] && typeof candidate['function'] === 'object'))
  ) {
    const topName =
      typeof candidate['name'] === 'string'
        ? (candidate['name'] as string)
        : undefined;
    const fnObj =
      candidate['function'] && typeof candidate['function'] === 'object'
        ? (candidate['function'] as Record<string, unknown>)
        : undefined;

    const name =
      topName ??
      (typeof fnObj?.['name'] === 'string'
        ? (fnObj['name'] as string)
        : undefined);
    if (!name) return null;

    const params: unknown =
      candidate['parameters'] ??
      candidate['arguments'] ??
      fnObj?.['parameters'] ??
      fnObj?.['arguments'] ??
      {};

    let args: Record<string, unknown> = {};
    if (typeof params === 'string') {
      try {
        args = JSON.parse(params) as Record<string, unknown>;
      } catch {
        args = { input: params };
      }
    } else if (params && typeof params === 'object') {
      args = params as Record<string, unknown>;
    }

    const unwrappedArgs = unwrapValueContainers(args);
    if (
      unwrappedArgs &&
      typeof unwrappedArgs === 'object' &&
      !Array.isArray(unwrappedArgs)
    ) {
      args = unwrappedArgs as Record<string, unknown>;
    }

    const id =
      (candidate['id'] as string | undefined) ??
      (candidate['callId'] as string | undefined) ??
      (candidate['tool_call_id'] as string | undefined) ??
      (fnObj?.['id'] as string | undefined);

    return { id, name, args } as FunctionCall;
  }

  if (candidate['function'] && typeof candidate['function'] === 'object') {
    const fnObj = candidate['function'] as Record<string, unknown>;
    const nameCandidate = fnObj['name'];
    const argsCandidate =
      fnObj['arguments'] ?? fnObj['params'] ?? fnObj['parameters'];

    if (typeof nameCandidate === 'string' && nameCandidate.length > 0) {
      let args: Record<string, unknown> = {};
      if (typeof argsCandidate === 'string') {
        try {
          args = JSON.parse(argsCandidate);
        } catch {
          args = { input: argsCandidate };
        }
      } else if (argsCandidate && typeof argsCandidate === 'object') {
        args = argsCandidate as Record<string, unknown>;
      }

      const unwrappedArgs = unwrapValueContainers(args);
      if (
        unwrappedArgs &&
        typeof unwrappedArgs === 'object' &&
        !Array.isArray(unwrappedArgs)
      ) {
        args = unwrappedArgs as Record<string, unknown>;
      }
      const id =
        (candidate['id'] as string | undefined) ??
        (candidate['callId'] as string | undefined) ??
        (candidate['tool_call_id'] as string | undefined) ??
        (fnObj['id'] as string | undefined);
      return { id, name: nameCandidate, args } as FunctionCall;
    }
  }

  const functionDataRaw =
    candidate['function'] ??
    candidate['function_call'] ??
    candidate['functionCall'];
  const functionData =
    functionDataRaw && typeof functionDataRaw === 'object'
      ? (functionDataRaw as Record<string, unknown>)
      : undefined;

  const nameCandidate = candidate['name'] ?? functionData?.['name'];
  const idCandidate =
    candidate['id'] ??
    candidate['callId'] ??
    candidate['call_id'] ??
    candidate['tool_call_id'] ??
    functionData?.['id'] ??
    functionData?.['callId'] ??
    functionData?.['call_id'] ??
    functionData?.['tool_call_id'];

  const argsCandidate =
    candidate['arguments'] ??
    candidate['args'] ??
    functionData?.['arguments'] ??
    functionData?.['args'];

  if (typeof nameCandidate !== 'string' || !nameCandidate.length) return null;

  let args: Record<string, unknown> = {};
  if (typeof argsCandidate === 'string') {
    const trimmedArgs = argsCandidate.trim();
    if (trimmedArgs) {
      try {
        const parsedArgs = JSON.parse(trimmedArgs);
        if (parsedArgs && typeof parsedArgs === 'object') {
          args = parsedArgs as Record<string, unknown>;
        } else {
          args = { input: trimmedArgs };
        }
      } catch {
        args = { input: trimmedArgs };
      }
    }
  } else if (argsCandidate && typeof argsCandidate === 'object') {
    args = argsCandidate as Record<string, unknown>;
  }

  const unwrappedArgs = unwrapValueContainers(args);
  if (
    unwrappedArgs &&
    typeof unwrappedArgs === 'object' &&
    !Array.isArray(unwrappedArgs)
  ) {
    args = unwrappedArgs as Record<string, unknown>;
  }

  return {
    id: typeof idCandidate === 'string' ? idCandidate : undefined,
    name: nameCandidate as string,
    args,
  } as FunctionCall;
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
      return unwrapValueContainers((obj as ValueContainer).value);
    }
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
