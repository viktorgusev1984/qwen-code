/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as Diff from 'diff';
import type {
  ToolCallConfirmationDetails,
  ToolEditConfirmationDetails,
  ToolInvocation,
  ToolLocation,
  ToolResult,
} from './tools.js';
import { BaseDeclarativeTool, Kind, ToolConfirmationOutcome } from './tools.js';
import { ToolErrorType } from './tool-error.js';
import { makeRelative, shortenPath } from '../utils/paths.js';
import { isNodeError } from '../utils/errors.js';
import type { Config } from '../config/config.js';
import { ApprovalMode } from '../config/config.js';
import { DEFAULT_DIFF_OPTIONS, getDiffStat } from './diffOptions.js';
import { ReadFileTool } from './read-file.js';
import { ToolNames, ToolDisplayNames } from './tool-names.js';
import { logFileOperation } from '../telemetry/loggers.js';
import { FileOperationEvent } from '../telemetry/types.js';
import { FileOperation } from '../telemetry/metrics.js';
import { getSpecificMimeType } from '../utils/fileUtils.js';
import { getLanguageFromFilePath } from '../utils/language-detection.js';
import type {
  ModifiableDeclarativeTool,
  ModifyContext,
} from './modifiable-tool.js';
import { IdeClient } from '../ide/ide-client.js';
import { safeLiteralReplace } from '../utils/textUtils.js';

const HINT_READFILE = ` Hint: Use the ${ReadFileTool.Name} tool to read the file. Then, copy the EXACT text (including all whitespace, indentation, and newlines) from the output to use as the 'old_string' in your edit request.`;

const HINT_NOOP = ` Hint: Use the ${ReadFileTool.Name} tool to read the file 'old_string' and 'new_string' are identical. Do NOT call ${ToolNames.EDIT} when there are no actual changes.`;

function normalizeEols(input: string): string {
  // Normalize CRLF and bare CR to LF
  return input.replace(/\r\n?/g, '\n');
}

function unescapeLiteralNewlines(input: string): string {
  // Replace literal backslash-n with real LF (do not touch other escapes)
  return input.replace(/\\n/g, '\n');
}

// Однопроходное "псевдо-разэкранирование" для \n, \r, \t (остальные экраны не трогаем)
function unescapeLiteralNewlinesOnce(input: string): string {
  return input
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t');
}

// Двойное экранирование: "\\n" -> "\n" (сначала схлопываем \\n, затем обычный pass)
function unescapeDoubleEscapedNewlines(input: string): string {
  // Важно: порядок замен — сначала двойные, потом одинарные
  return input
    .replace(/\\\\n/g, '\n')
    .replace(/\\\\r/g, '\r')
    .replace(/\\\\t/g, '\t')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t');
}

// Осторожная JSON-«расковка» строкового литерала, если похоже на экранированный блок.
// Работает только если предварительные варианты дали 0 совпадений.
function tryJsonUnquoteLiteral(input: string): string | null {
  // эвристика: много обратных слэшей или \uXXXX — похоже на JSON-литерал
  const isLikelyEscaped =
    /\\[nrt"\\]/.test(input) || /\\u[0-9a-fA-F]{4}/.test(input);
  if (!isLikelyEscaped) return null;
  try {
    // экранируем обратные слэши и кавычки, чтобы собрать валидную JSON-строку
    const escaped = input.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return JSON.parse(`"${escaped}"`);
  } catch {
    return null;
  }
}

function normalizeIndentOnlyLines(input: string): string {
  // \n[пробелы/табуляция]+\n  ->  \n\n
  return input.replace(/\n[ \t]+\n/g, '\n\n');
}

function buildLineOffsets(content: string): number[] {
  const offsets: number[] = [];
  const lines = content.split('\n');
  let offset = 0;
  for (let i = 0; i < lines.length; i++) {
    offsets.push(offset);
    offset += lines[i].length + 1; // +1 for '\n'
  }
  return offsets;
}

function indexToLine(offsets: number[], index: number): number {
  let line = 0;
  while (line + 1 < offsets.length && offsets[line + 1] <= index) {
    line++;
  }
  return line;
}

function collectLineContexts(
  content: string,
  needle: string,
  maxContexts = 3,
  radius = 2,
): string[] {
  if (!needle) return [];
  const contexts: string[] = [];
  const lines = content.split('\n');
  const offsets = buildLineOffsets(content);

  let idx = content.indexOf(needle);
  while (idx !== -1 && contexts.length < maxContexts) {
    const line = indexToLine(offsets, idx);
    const from = Math.max(0, line - radius);
    const to = Math.min(lines.length - 1, line + radius);
    const snippet = lines.slice(from, to + 1).join('\n');
    contexts.push(`L${from + 1}-${to + 1}: ${snippet}`);
    idx = content.indexOf(needle, idx + Math.max(needle.length, 1));
  }

  return contexts;
}

function probeLine(oldString: string): string | null {
  for (const line of oldString.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.length >= 3) {
      return trimmed;
    }
  }
  return null;
}

function findLooseBlockMatch(
  currentContent: string,
  pattern: string,
): { start: number; end: number } | null {
  const cur = normalizeEols(currentContent);
  const pat = normalizeEols(pattern);

  const curLines = cur.split('\n');
  const patLines = pat.split('\n');

  if (patLines.length === 0) return null;

  // Предварительно посчитаем смещения начала каждой строки в cur
  const lineOffsets: number[] = new Array(curLines.length);
  let offset = 0;
  for (let i = 0; i < curLines.length; i++) {
    lineOffsets[i] = offset;
    offset += curLines[i].length;
    if (i < curLines.length - 1) offset += 1; // '\n'
  }

  outer: for (let i = 0; i + patLines.length <= curLines.length; i++) {
    for (let j = 0; j < patLines.length; j++) {
      const patLine = patLines[j].replace(/[ \t]+$/g, '');
      const curLine = curLines[i + j].replace(/[ \t]+$/g, '');

      const patEmpty = patLine === '';

      if (patEmpty) {
        // В old_string строка пустая → в файле допускаем пустую или только пробелы/табы
        if (!/^[ \t]*$/.test(curLines[i + j])) {
          continue outer;
        }
      } else {
        // Непустые строки должны совпасть (без trailing spaces)
        if (patLine !== curLine) {
          continue outer;
        }
      }
    }

    // Совпадение найдено, считаем индекс начала/конца в исходной строке
    const start = lineOffsets[i];
    const lastLineIndex = i + patLines.length - 1;
    const end =
      lineOffsets[lastLineIndex] +
      curLines[lastLineIndex].length +
      (lastLineIndex < curLines.length - 1 ? 1 : 0); // включаем завершающий \n, если он есть

    return { start, end };
  }

  return null;
}

function findLooseBlockMatchIgnoreIndent(
  currentContent: string,
  pattern: string,
): { start: number; end: number } | null {
  const cur = normalizeEols(currentContent);
  const pat = normalizeEols(pattern);

  const curLines = cur.split('\n');
  const patLines = pat.split('\n');

  if (patLines.length === 0) return null;

  const lineOffsets: number[] = new Array(curLines.length);
  let offset = 0;
  for (let i = 0; i < curLines.length; i++) {
    lineOffsets[i] = offset;
    offset += curLines[i].length;
    if (i < curLines.length - 1) offset += 1;
  }

  outer: for (let i = 0; i + patLines.length <= curLines.length; i++) {
    for (let j = 0; j < patLines.length; j++) {
      const patLine = patLines[j].trim();
      const curLine = curLines[i + j].trim();

      const patEmpty = patLine === '';
      if (patEmpty) {
        if (!/^[ \t]*$/.test(curLines[i + j])) continue outer;
      } else if (patLine !== curLine) {
        continue outer;
      }
    }

    const start = lineOffsets[i];
    const lastLineIndex = i + patLines.length - 1;
    const end =
      lineOffsets[lastLineIndex] +
      curLines[lastLineIndex].length +
      (lastLineIndex < curLines.length - 1 ? 1 : 0);

    return { start, end };
  }

  return null;
}

function makeVariants(s: string): string[] {
  // v1: как есть
  const v1 = s;

  // v2: нормализация EOL (CRLF/CR -> LF)
  const v2 = normalizeEols(v1);

  // v3: одинарные \n/\r/\t -> реальные переводы
  const v3 = unescapeLiteralNewlinesOnce(v2);

  // v4: двойные экранирования \\n/\\r/\\t -> реальные переводы
  const v4 = unescapeDoubleEscapedNewlines(v2);

  // v5: осторожный JSON-unquote (только если это действительно похоже на экранированный блок)
  const v5maybe = tryJsonUnquoteLiteral(v2);
  const v5 = v5maybe ?? v4; // если не получилось — просто повтор v4 (дедуп фильтранёт)
  // v6: нормализация пустых строк из пробелов
  const v6 = normalizeIndentOnlyLines(v2);

  // Дедуп с сохранением порядка
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of [v1, v2, v3, v4, v5, v6]) {
    if (!seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

export function applyReplacement(
  currentContent: string | null,
  oldString: string,
  newString: string,
  isNewFile: boolean,
): string {
  if (isNewFile) {
    // Always normalize new file content to LF and expand literal \n
    return normalizeEols(unescapeLiteralNewlines(newString));
  }
  if (currentContent === null) {
    // Should not happen if not a new file, but defensively return empty or newString if oldString is also empty
    return oldString === '' ? newString : '';
  }
  // If oldString is empty and it's not a new file, do not modify the content.
  if (oldString === '' && !isNewFile) {
    return currentContent;
  }

  // Use intelligent replacement that handles $ sequences safely
  return safeLiteralReplace(currentContent, oldString, newString);
}

/**
 * Parameters for the Edit tool
 */
export interface EditToolParams {
  /**
   * The absolute path to the file to modify
   */
  file_path: string;

  /**
   * The text to replace
   */
  old_string: string;

  /**
   * The text to replace it with
   */
  new_string: string;

  /**
   * Replace every occurrence of old_string instead of requiring a unique match.
   */
  replace_all?: boolean;

  /**
   * Whether the edit was modified manually by the user.
   */
  modified_by_user?: boolean;

  /**
   * Initially proposed content.
   */
  ai_proposed_content?: string;
}

interface CalculatedEdit {
  currentContent: string | null;
  newContent: string;
  occurrences: number;
  error?: { display: string; raw: string; type: ToolErrorType };
  isNewFile: boolean;
}

class EditToolInvocation implements ToolInvocation<EditToolParams, ToolResult> {
  constructor(
    private readonly config: Config,
    public params: EditToolParams,
  ) {}

  toolLocations(): ToolLocation[] {
    return [{ path: this.params.file_path }];
  }

  /**
   * Calculates the potential outcome of an edit operation.
   * @param params Parameters for the edit operation
   * @returns An object describing the potential edit outcome
   * @throws File system errors if reading the file fails unexpectedly (e.g., permissions)
   */
  private async calculateEdit(params: EditToolParams): Promise<CalculatedEdit> {
    const replaceAll = params.replace_all === true;
    const expectedReplacements = replaceAll ? null : 1;
    let currentContent: string | null = null;
    let fileExists = false;
    let isNewFile = false;

    // Will be finalized after fallback strategy
    let finalNewString = params.new_string;
    let finalOldString = params.old_string;
    let occurrences = 0;

    let error:
      | { display: string; raw: string; type: ToolErrorType }
      | undefined = undefined;

    try {
      currentContent = await this.config
        .getFileSystemService()
        .readTextFile(params.file_path);
      // Normalize line endings for consistent processing.
      currentContent = normalizeEols(currentContent);
      fileExists = true;
    } catch (err: unknown) {
      if (!isNodeError(err) || err.code !== 'ENOENT') {
        // Rethrow unexpected FS errors (permissions, etc.)
        throw err;
      }
      fileExists = false;
    }

    if (params.old_string === '' && !fileExists) {
      // Creating a new file
      isNewFile = true;
    } else if (!fileExists) {
      // Trying to edit a nonexistent file (and old_string is not empty)
      error = {
        display: `File not found. Cannot apply edit. Use an empty old_string to create a new file.`,
        raw: `File not found: ${params.file_path}`,
        type: ToolErrorType.FILE_NOT_FOUND,
      };
    } else if (currentContent !== null) {
      if (params.old_string === '') {
        // Error: Trying to create a file that already exists
        error = {
          display: `Failed to edit. Attempted to create a file that already exists.`,
          raw: `File already exists, cannot create: ${params.file_path}`,
          type: ToolErrorType.ATTEMPT_TO_CREATE_EXISTING_FILE,
        };
      } else {
        // ---------- Fallback search with multiple attempts ----------
        // Для old_string оставляем агрессивную нормализацию (makeVariants),
        // чтобы как можно надёжнее найти совпадение в файле.
        const oldVariants = makeVariants(params.old_string);

        // А для new_string НЕЛЬЗЯ делать unescape/JSON-unquote:
        // JSON-декодер уже выдал то, что нужно положить в файл.
        // Здесь только нормализуем переводы строк (CRLF/CR -> LF),
        // но НЕ трогаем последовательности \n, \t, \r и т.п.
        const newVariants = [normalizeEols(params.new_string)];

        type Attempt = {
          oldV: string;
          newV: string;
          occ: number;
          ok: boolean;
          reason?: string;
        };
        const attempts: Attempt[] = [];
        let matched: Attempt | null = null;

        // Try pairs with same index first
        const maxLen = Math.max(oldVariants.length, newVariants.length);
        const pairs: Array<{ oldV: string; newV: string }> = [];
        for (let i = 0; i < maxLen; i++) {
          if (i < oldVariants.length && i < newVariants.length) {
            pairs.push({ oldV: oldVariants[i], newV: newVariants[i] });
          }
        }
        // Cross-combinations if not already included
        for (const ov of oldVariants) {
          for (const nv of newVariants) {
            if (!pairs.find((p) => p.oldV === ov && p.newV === nv)) {
              pairs.push({ oldV: ov, newV: nv });
            }
          }
        }

        for (const { oldV, newV } of pairs) {
          const occ = this.countOccurrences(currentContent, oldV);
          const ok =
            oldV !== newV &&
            (expectedReplacements === null
              ? occ > 0
              : occ === expectedReplacements);
          attempts.push({
            oldV,
            newV,
            occ,
            ok,
            reason: ok ? 'matched' : occ === 0 ? 'not found' : `found ${occ}`,
          });
          if (ok) {
            matched = { oldV, newV, occ, ok };
            break;
          }
        }

          if (matched) {
            finalOldString = matched.oldV;
            finalNewString = matched.newV;
            occurrences = matched.occ;
          } else {
            const anyFound = attempts.find(
              (a) => a.occ > 0 && a.oldV !== a.newV,
            );
            const allSame =
              attempts.length > 0 && attempts.every((a) => a.oldV === a.newV);

            if (allSame) {
              error = {
              display:
                'No changes to apply. The provided old_string and new_string are identical, so there is nothing to edit.' +
                HINT_NOOP,
              raw:
                `Edit request is a no-op for file: ${params.file_path}. ` +
                `All fallback variants have old_string === new_string. The tool will not apply an edit.` +
                HINT_NOOP,
              type: ToolErrorType.EDIT_NO_CHANGE,
            };
          } else if (anyFound && expectedReplacements === 1) {
            finalOldString = anyFound.oldV;
            finalNewString = anyFound.newV;
            occurrences = anyFound.occ;

            // --- context snippet around the first occurrence (±60 chars) ---
              const firstIdx = currentContent.indexOf(anyFound.oldV);
              const ctx =
                firstIdx >= 0
                  ? currentContent.slice(
                      Math.max(0, firstIdx - 60),
                    Math.min(
                      currentContent.length,
                      firstIdx + anyFound.oldV.length + 60,
                    ),
                  )
                : '(not located)';
            // ---------------------------------------------------------------

            const lineContexts = collectLineContexts(
              currentContent,
              anyFound.oldV,
            );

            const occurrenceTerm =
              expectedReplacements === 1 ? 'occurrence' : 'occurrences';
            error = {
              display:
                `Failed to edit, expected ${expectedReplacements} ${occurrenceTerm} but found ${occurrences}.` +
                (lineContexts.length
                  ? ` Found matches at ${lineContexts.join(' | ')}.`
                  : '') +
                HINT_READFILE,
              raw:
                `Fallback tried ${attempts.length} variants; best found ${occurrences} occurrences for old_string in file: ${params.file_path}. ` +
                `First occurrence context (±60 chars): ${JSON.stringify(ctx)}. ` +
                `Variants tried: ` +
                attempts
                  .map((a, i) => `[${i + 1}] occ=${a.occ}; reason=${a.reason}`)
                  .join('; ') +
                `.` +
                (lineContexts.length
                  ? ` Line contexts: ${lineContexts.join(' || ')}.`
                  : '') +
                HINT_READFILE,
              type: ToolErrorType.EDIT_EXPECTED_OCCURRENCE_MISMATCH,
            };
          } else if (expectedReplacements === 1 && currentContent !== null) {
            // НОВОЕ: попытка найти блок построчно, позволяя различие только в пустых строках/пробелах
            const loose =
              findLooseBlockMatch(currentContent, params.old_string) ||
              findLooseBlockMatchIgnoreIndent(
                currentContent,
                params.old_string,
              );

            if (loose) {
              const realOld = currentContent.slice(loose.start, loose.end);
              const occLoose = this.countOccurrences(currentContent, realOld);

              if (occLoose === 1) {
                finalOldString = realOld;
                finalNewString = normalizeEols(params.new_string);
                occurrences = 1;
                // critical: НЕ ставим error, считаем, что матч нашёлся
                error = undefined;
              } else {
                // На всякий случай, если блок встретился несколько раз — лучше честно упасть
                error = {
                  display:
                    `Failed to edit, found multiple loose matches for the provided old_string.` +
                    HINT_READFILE,
                  raw:
                    `Loose block search found ${occLoose} matches for old_string in ${params.file_path}.` +
                    HINT_READFILE,
                  type: ToolErrorType.EDIT_EXPECTED_OCCURRENCE_MISMATCH,
                };
              }
            } else {
              // Вообще ничего не нашли — старое поведение
              const probe = probeLine(params.old_string);
              const probeContexts =
                probe !== null
                  ? collectLineContexts(currentContent, probe)
                  : [];
              error = {
                display:
                  `Failed to edit, could not find the string to replace.` +
                  (probeContexts.length
                    ? ` Closest matches by line: ${probeContexts.join(' | ')}.`
                    : '') +
                  HINT_READFILE,
                raw:
                  `Failed to edit after ${attempts.length} fallback attempts. 0 usable occurrences found for all normalized variants in ${params.file_path}. ` +
                  `Diagnostics: ` +
                  attempts
                    .map(
                      (a, i) => `[${i + 1}] occ=${a.occ}; reason=${a.reason}`,
                    )
                    .join('; ') +
                  `.` +
                  (probeContexts.length
                    ? ` Closest matches by line (probe=${probe ?? 'n/a'}): ${probeContexts.join(' || ')}.`
                    : '') +
                  HINT_READFILE,
                type: ToolErrorType.EDIT_NO_OCCURRENCE_FOUND,
              };
            }
          } else {
            // expectedReplacements != 1 — оставляем старое поведение
            error = {
              display:
                `Failed to edit, could not find the string to replace.` +
                HINT_READFILE,
              raw:
                `Failed to edit after ${attempts.length} fallback attempts. 0 usable occurrences found for all normalized variants in ${params.file_path}. ` +
                `Diagnostics: ` +
                attempts
                  .map((a, i) => `[${i + 1}] occ=${a.occ}; reason=${a.reason}`)
                  .join('; ') +
                `.` +
                HINT_READFILE,
              type: ToolErrorType.EDIT_NO_OCCURRENCE_FOUND,
            };
          }
        }

        // Дополнительный safety: если по какой-то причине ошибку не поставили,
        // но finalOldString и finalNewString совпадают — это всё равно no-op.
        if (!error && finalOldString === finalNewString) {
          error = {
            display:
              'No changes to apply. old_string and new_string are identical, so there is nothing to change.' +
              HINT_NOOP,
            raw:
              `No changes to apply. old_string and new_string are identical for file: ${params.file_path}.` +
              HINT_NOOP,
            type: ToolErrorType.EDIT_NO_CHANGE,
          };
        }
      }
    } else {
      // Should not happen if fileExists and no exception was thrown, but defensively:
      error = {
        display: `Failed to read content of file.`,
        raw: `Failed to read content of existing file: ${params.file_path}`,
        type: ToolErrorType.READ_CONTENT_FAILURE,
      };
    }

    // ---------- Двухшаговое применение замены (агрессивное + консервативное) ----------
    let newContent: string;

    if (!error) {
      const preparedNew = normalizeEols(finalNewString);

      if (isNewFile) {
        // Для новых файлов просто создаём содержимое из new_string
        newContent = applyReplacement(
          currentContent,
          '',
          preparedNew,
          isNewFile,
        );
      } else {
        // 1) Агрессивная попытка: разэкраниваем \n/\r/\t
        const preparedOldAggressive = unescapeLiteralNewlines(
          normalizeEols(finalOldString),
        );
        const attemptAggressive = applyReplacement(
          currentContent,
          preparedOldAggressive,
          preparedNew,
          isNewFile,
        );

        if (attemptAggressive !== currentContent) {
          // Агрессивный вариант сработал — используем его
          newContent = attemptAggressive;
        } else {
          // 2) Консервативная попытка: не трогаем \n, только нормализуем EOL
          const preparedOldConservative = normalizeEols(finalOldString);
          const attemptConservative = applyReplacement(
            currentContent,
            preparedOldConservative,
            preparedNew,
            isNewFile,
          );
          newContent = attemptConservative;
        }
      }
    } else {
      newContent = currentContent ?? '';
    }

    // --- Final no-op safeguard (after aggressive + conservative attempts) ---
    if (!error && fileExists && currentContent === newContent) {
      error = {
        display:
          'No changes to apply. The file already matches the requested new content.' +
          HINT_NOOP,
        raw:
          `No changes to apply. The file already matches the requested new content: ${params.file_path}.` +
          HINT_NOOP,
        type: ToolErrorType.EDIT_NO_CHANGE,
      };
    }

    return {
      currentContent,
      newContent,
      occurrences,
      error,
      isNewFile,
    };
  }

  /**
   * Counts occurrences of a substring in a string
   */
  private countOccurrences(str: string, substr: string): number {
    if (substr === '') {
      return 0;
    }
    let count = 0;
    let pos = str.indexOf(substr);
    while (pos !== -1) {
      count++;
      pos = str.indexOf(substr, pos + substr.length); // Start search after the current match
    }
    return count;
  }

  /**
   * Handles the confirmation prompt for the Edit tool in the CLI.
   * It needs to calculate the diff to show the user.
   */
  async shouldConfirmExecute(
    abortSignal: AbortSignal,
  ): Promise<ToolCallConfirmationDetails | false> {
    if (this.config.getApprovalMode() === ApprovalMode.AUTO_EDIT) {
      return false;
    }

    let editData: CalculatedEdit;
    try {
      editData = await this.calculateEdit(this.params);
    } catch (error) {
      if (abortSignal.aborted) {
        throw error;
      }
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.log(`Error preparing edit: ${errorMsg}`);
      return false;
    }

    if (editData.error) {
      console.log(`Error: ${editData.error.display}`);
      return false;
    }

    const fileName = path.basename(this.params.file_path);
    const fileDiff = Diff.createPatch(
      fileName,
      editData.currentContent ?? '',
      editData.newContent,
      'Current',
      'Proposed',
      DEFAULT_DIFF_OPTIONS,
    );
    const ideClient = await IdeClient.getInstance();
    const ideConfirmation =
      this.config.getIdeMode() && ideClient.isDiffingEnabled()
        ? ideClient.openDiff(this.params.file_path, editData.newContent)
        : undefined;

    const confirmationDetails: ToolEditConfirmationDetails = {
      type: 'edit',
      title: `Confirm Edit: ${shortenPath(makeRelative(this.params.file_path, this.config.getTargetDir()))}`,
      fileName,
      filePath: this.params.file_path,
      fileDiff,
      originalContent: editData.currentContent,
      newContent: editData.newContent,
      onConfirm: async (outcome: ToolConfirmationOutcome) => {
        if (outcome === ToolConfirmationOutcome.ProceedAlways) {
          this.config.setApprovalMode(ApprovalMode.AUTO_EDIT);
        }

        if (ideConfirmation) {
          const result = await ideConfirmation;
          if (result.status === 'accepted' && result.content) {
            // TODO(chrstn): See https://github.com/google-gemini/gemini-cli/pull/5618#discussion_r2255413084
            // for info on a possible race condition where the file is modified on disk while being edited.
            this.params.old_string = editData.currentContent ?? '';
            this.params.new_string = result.content;
          }
        }
      },
      ideConfirmation,
    };
    return confirmationDetails;
  }

  getDescription(): string {
    const relativePath = makeRelative(
      this.params.file_path,
      this.config.getTargetDir(),
    );
    if (this.params.old_string === '') {
      return `Create ${shortenPath(relativePath)}`;
    }

    const oldStringSnippet =
      this.params.old_string.split('\n')[0].substring(0, 30) +
      (this.params.old_string.length > 30 ? '...' : '');
    const newStringSnippet =
      this.params.new_string.split('\n')[0].substring(0, 30) +
      (this.params.new_string.length > 30 ? '...' : '');

    if (this.params.old_string === this.params.new_string) {
      return `No file changes to ${shortenPath(relativePath)}`;
    }
    return `${shortenPath(relativePath)}: ${oldStringSnippet} => ${newStringSnippet}`;
  }

  /**
   * Executes the edit operation with the given parameters.
   * @param params Parameters for the edit operation
   * @returns Result of the edit operation
   */
  async execute(signal: AbortSignal): Promise<ToolResult> {
    let editData: CalculatedEdit;
    try {
      editData = await this.calculateEdit(this.params);
    } catch (error) {
      if (signal.aborted) {
        throw error;
      }
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        llmContent: `Error preparing edit: ${errorMsg}`,
        returnDisplay: `Error preparing edit: ${errorMsg}`,
        error: {
          message: errorMsg,
          type: ToolErrorType.EDIT_PREPARATION_FAILURE,
        },
      };
    }

    if (editData.error) {
      return {
        llmContent: editData.error.raw,
        returnDisplay: `Error: ${editData.error.display}`,
        error: {
          message: editData.error.raw,
          type: editData.error.type,
        },
      };
    }

    try {
      this.ensureParentDirectoriesExist(this.params.file_path);
      await this.config
        .getFileSystemService()
        .writeTextFile(this.params.file_path, editData.newContent);

      const fileName = path.basename(this.params.file_path);
      const originallyProposedContent =
        this.params.ai_proposed_content || editData.newContent;
      const diffStat = getDiffStat(
        fileName,
        editData.currentContent ?? '',
        originallyProposedContent,
        editData.newContent,
      );

      const fileDiff = Diff.createPatch(
        fileName,
        editData.currentContent ?? '', // Should not be null here if not isNewFile
        editData.newContent,
        'Current',
        'Proposed',
        DEFAULT_DIFF_OPTIONS,
      );
      const displayResult = {
        fileDiff,
        fileName,
        originalContent: editData.currentContent,
        newContent: editData.newContent,
        diffStat,
      };

      // Log file operation for telemetry (without diff_stat to avoid double-counting)
      const mimetype = getSpecificMimeType(this.params.file_path);
      const programmingLanguage = getLanguageFromFilePath(
        this.params.file_path,
      );
      const extension = path.extname(this.params.file_path);
      const operation = editData.isNewFile
        ? FileOperation.CREATE
        : FileOperation.UPDATE;

      logFileOperation(
        this.config,
        new FileOperationEvent(
          EditTool.Name,
          operation,
          editData.newContent.split('\n').length,
          mimetype,
          extension,
          programmingLanguage,
        ),
      );

      const llmSuccessMessageParts = [
        editData.isNewFile
          ? `Created new file: ${this.params.file_path} with provided content.`
          : `Successfully modified file: ${this.params.file_path} (${editData.occurrences} replacements).`,
      ];
      if (this.params.modified_by_user) {
        llmSuccessMessageParts.push(
          `User modified the \`new_string\` content to be: ${this.params.new_string}.`,
        );
      }

      return {
        llmContent: llmSuccessMessageParts.join(' '),
        returnDisplay: displayResult,
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        llmContent: `Error executing edit: ${errorMsg}`,
        returnDisplay: `Error writing file: ${errorMsg}`,
        error: {
          message: errorMsg,
          type: ToolErrorType.FILE_WRITE_FAILURE,
        },
      };
    }
  }

  /**
   * Creates parent directories if they don't exist
   */
  private ensureParentDirectoriesExist(filePath: string): void {
    const dirName = path.dirname(filePath);
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }
  }
}

/**
 * Implementation of the Edit tool logic
 */
export class EditTool
  extends BaseDeclarativeTool<EditToolParams, ToolResult>
  implements ModifiableDeclarativeTool<EditToolParams>
{
  static readonly Name = ToolNames.EDIT;
  constructor(private readonly config: Config) {
    super(
      EditTool.Name,
      ToolDisplayNames.EDIT,
      `Replaces text within a file. By default, replaces a single occurrence. Set \`replace_all\` to true when you intend to modify every instance of \`old_string\`. This tool requires providing significant context around the change to ensure precise targeting. Always use the ${ReadFileTool.Name} tool to examine the file's current content before attempting a text replacement.

      The user has the ability to modify the \`new_string\` content. If modified, this will be stated in the response.

Expectation for required parameters:
1. \`file_path\` MUST be an absolute path; otherwise an error will be thrown.
2. \`old_string\` MUST be the exact literal text to replace (including all whitespace, indentation, newlines, and surrounding code etc.).
3. \`new_string\` MUST be the exact literal text to replace \`old_string\` with (also including all whitespace, indentation, newlines, and surrounding code etc.). Ensure the resulting code is correct and idiomatic.
4. NEVER escape \`old_string\` or \`new_string\`, that would break the exact literal text requirement.
**Important:** If ANY of the above are not satisfied, the tool will fail. CRITICAL for \`old_string\`: Must uniquely identify the single instance to change. Include at least 3 lines of context BEFORE and AFTER the target text, matching whitespace and indentation precisely. If this string matches multiple locations, or does not match exactly, the tool will fail.
**Multiple replacements:** Set \`replace_all\` to true when you want to replace every occurrence that matches \`old_string\`.`,
      Kind.Edit,
      {
        properties: {
          file_path: {
            description:
              "The absolute path to the file to modify. Must start with '/'.",
            type: 'string',
          },
          old_string: {
            description:
              'The exact literal text to replace, preferably unescaped. For single replacements (default), include at least 3 lines of context BEFORE and AFTER the target text, matching whitespace and indentation precisely. If this string is not the exact literal text (i.e. you escaped it) or does not match exactly, the tool will fail.',
            type: 'string',
          },
          new_string: {
            description:
              'The exact literal text to replace `old_string` with, preferably unescaped. Provide the EXACT text. Ensure the resulting code is correct and idiomatic.',
            type: 'string',
          },
          replace_all: {
            type: 'boolean',
            description:
              'Replace all occurrences of old_string (default false).',
          },
        },
        required: ['file_path', 'old_string', 'new_string'],
        type: 'object',
      },
    );
  }

  /**
   * Validates the parameters for the Edit tool
   * @param params Parameters to validate
   * @returns Error message string or null if valid
   */
  protected override validateToolParamValues(
    params: EditToolParams,
  ): string | null {
    if (!params.file_path) {
      return "The 'file_path' parameter must be non-empty.";
    }

    if (!path.isAbsolute(params.file_path)) {
      return `File path must be absolute: ${params.file_path}`;
    }

    const workspaceContext = this.config.getWorkspaceContext();
    if (!workspaceContext.isPathWithinWorkspace(params.file_path)) {
      const directories = workspaceContext.getDirectories();
      return `File path must be within one of the workspace directories: ${directories.join(', ')}`;
    }

    return null;
  }

  protected createInvocation(
    params: EditToolParams,
  ): ToolInvocation<EditToolParams, ToolResult> {
    return new EditToolInvocation(this.config, params);
  }

  getModifyContext(_: AbortSignal): ModifyContext<EditToolParams> {
    return {
      getFilePath: (params: EditToolParams) => params.file_path,
      getCurrentContent: async (params: EditToolParams): Promise<string> => {
        try {
          return this.config
            .getFileSystemService()
            .readTextFile(params.file_path);
        } catch (err) {
          if (!isNodeError(err) || err.code !== 'ENOENT') throw err;
          return '';
        }
      },
      getProposedContent: async (params: EditToolParams): Promise<string> => {
        try {
          const currentContent = await this.config
            .getFileSystemService()
            .readTextFile(params.file_path);
          return applyReplacement(
            currentContent,
            params.old_string,
            params.new_string,
            params.old_string === '' && currentContent === '',
          );
        } catch (err) {
          if (!isNodeError(err) || err.code !== 'ENOENT') throw err;
          return '';
        }
      },
      createUpdatedParams: (
        oldContent: string,
        modifiedProposedContent: string,
        originalParams: EditToolParams,
      ): EditToolParams => ({
        ...originalParams,
        ai_proposed_content: oldContent,
        old_string: oldContent,
        new_string: modifiedProposedContent,
        modified_by_user: true,
      }),
    };
  }
}
