// utils/logCompression.ts
const ESC = String.fromCharCode(27); // '\u001B'
const ANSI_REGEX = new RegExp(`${ESC}\\[[0-9;]*m`, 'g');

// Схлопываем прогресс/transfer/скачивание и пустые повторяющиеся линии.
function dropNoisyProgressLines(lines: string[]): string[] {
  const PROGRESS_PATTERNS = [
    /^\s*Progress\s*\(\d+\):/i,
    /^\s*\d{1,3}%(\s+\d+\/\d+)?\s*$/i,
    /^\s*Downloading( from)?\s+/i,
    /^\s*Downloaded( from)?\s+/i,
    /^\s*Transferring\s+/i,
    /^\s*Getting\s+metadata/i,
    /^\s*Resolving\s+dependencies/i,
    /^\s*Fetching\s+.+/i,
    /^\s*\[INFO\]\s+Building\s+.+/i,
  ];
  return lines.filter((l) => !PROGRESS_PATTERNS.some((rx) => rx.test(l)));
}

function stripAnsiAndCR(text: string): string {
  // убираем ANSI и превращаем \r-перерисовки в обычные переводы строк
  return text.replace(ANSI_REGEX, '').replace(/\r+/g, '\n');
}

// Оставляем только сигнальные области логов с контекстом.
export function summarizeBuildLogHeuristic(
  raw: string,
  {
    contextBefore = 2,
    contextAfter = 2,
    maxBlocks = 50,
    maxTotalLines = 1200,
  }: {
    contextBefore?: number;
    contextAfter?: number;
    maxBlocks?: number;
    maxTotalLines?: number;
  } = {},
): string {
  const clean = stripAnsiAndCR(raw);
  const lines = dropNoisyProgressLines(clean.split('\n'));

  // Сигнальные строки Maven/Gradle/npm/Java stacktrace
  const SIGNAL = [
    /\[ERROR\]/,
    /\bERROR\b/i,
    /\bWARN(ING)?\b/i,
    /\bBUILD (FAIL|FAILURE)\b/i,
    /\bTEST(S)? (FAILED|FAILURES)\b/i,
    /Failed to (execute|resolve|compile|run)/i,
    /Exception[:\s]/,
    /^\s*at\s+[\w.$_<>]+\(.*:\d+\)\s*$/, // stacktrace frames
    /^\[INFO\]\s+Reactor Summary:/i,
    /^\[INFO\]\s+Results:/i,
  ];

  const hits: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (SIGNAL.some((rx) => rx.test(lines[i]))) hits.push(i);
  }
  if (hits.length === 0) {
    // если сигнала не нашли — вернём урезанный лог без шума
    return lines.slice(-Math.min(lines.length, maxTotalLines)).join('\n');
  }

  // Объединяем близкие попадания в блоки с контекстом
  type Block = { start: number; end: number };
  const blocks: Block[] = [];
  for (const idx of hits) {
    const s = Math.max(0, idx - contextBefore);
    const e = Math.min(lines.length - 1, idx + contextAfter);
    if (blocks.length === 0) {
      blocks.push({ start: s, end: e });
    } else {
      const last = blocks[blocks.length - 1];
      if (s <= last.end + 1) {
        last.end = Math.max(last.end, e);
      } else {
        blocks.push({ start: s, end: e });
      }
    }
  }

  // Обрезаем количество блоков и общий объём
  const limitedBlocks = blocks.slice(-maxBlocks);
  const picked: string[] = [];
  for (const b of limitedBlocks) {
    picked.push('--- log:signal ---');
    picked.push(...lines.slice(b.start, b.end + 1));
  }
  let out = picked.join('\n');

  const outLines = out.split('\n');
  if (outLines.length > maxTotalLines) {
    out = outLines.slice(-maxTotalLines).join('\n');
  }
  return out;
}

/**
 * Признак, что это большой лог (а не обычный текст).
 * Жёстко не завязываемся на Maven, но учитываем его маркеры.
 */
export function looksLikeBigBuildLog(text: string): boolean {
  if (text.length < 2000) return false; // мелкое не трогаем
  const t = text.slice(0, 50000); // не сканируем бесконечность
  const score =
    (t.match(/\[INFO\]/g)?.length ?? 0) +
    (t.match(/\[ERROR\]/g)?.length ?? 0) +
    (t.match(/\bBUILD (SUCCESS|FAIL(URE)?)\b/gi)?.length ?? 0) +
    (t.match(/\sat\s+[\w.$_<>]+\(/g)?.length ?? 0);
  return score >= 5; // эвристика
}

/**
 * Санитизация одного text-блока: убираем шум, схлопываем прогресс,
 * сокращаем повторяющиеся пустые строки.
 */
export function sanitizeTextBlock(text: string): string {
  let s = stripAnsiAndCR(text);
  s = dropNoisyProgressLines(s.split('\n')).join('\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s;
}
