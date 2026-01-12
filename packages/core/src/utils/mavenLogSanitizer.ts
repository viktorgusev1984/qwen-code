// utils/mavenLogSanitizer.ts

// Линтер-safe: не используем \x1b в литерале
const ESC = String.fromCharCode(27);
const ANSI_REGEX = new RegExp(`${ESC}\\[[0-?]*[ -/]*[@-~]`, 'g'); // CSI

export function isMavenCommand(cmd: string): boolean {
  const s = cmd.trim();
  return (
    s === 'mvn' ||
    s.startsWith('mvn ') ||
    s.startsWith('./mvnw ') ||
    s.startsWith('mvnw ')
  );
}

export function stripAnsiAndCR(text: string): string {
  return text.replace(ANSI_REGEX, '').replace(/\r+/g, '\n');
}

// Убираем прогресс/скачивание/псевдографику/длинные разделители
function dropNoisyProgress(lines: string[]): string[] {
  const NOISE = [
    /^\s*Progress\s*\(\d+\):/i,
    /^\s*\d{1,3}%(\s+\d+\/\d+)?\s*$/i,
    /^\s*Downloading( from)?\s+/i,
    /^\s*Downloaded( from)?\s+/i,
    /^\s*Transferring\s+/i,
    /^\s*\[INFO\]\s+Building\s+.+/i,
    /^\s*\[INFO\]\s+-{5,}\s*$/i,
    /^[\s\u2500-\u257F|+=-]+$/u, // рамки/псевдографика
  ];
  return lines.filter((l) => !NOISE.some((rx) => rx.test(l)));
}

/** Жёсткая выжимка Maven-лога: только сигнал + короткий контекст */
export function sanitizeMavenOutput(
  raw: string,
  opts: {
    contextBefore?: number;
    contextAfter?: number;
    maxBlocks?: number;
    maxTotalLines?: number;
  } = {},
): string {
  const {
    contextBefore = 2,
    contextAfter = 2,
    maxBlocks = 80,
    maxTotalLines = 2000,
  } = opts;

  const clean = stripAnsiAndCR(raw);
  const lines0 = clean.split('\n');
  const lines = dropNoisyProgress(lines0);

  const SIGNAL = [
    /\[ERROR\]/,
    /\bERROR\b/i,
    /\bWARN(ING)?\b/i,
    /\bBUILD (FAIL|FAILURE)\b/i,
    /\bTEST(S)? (FAILED|FAILURES)\b/i,
    /Failed to (execute|resolve|compile|run)/i,
    /Exception[:\s]/,
    /^\s*at\s+[\w.$_<>]+\(.*:\d+\)\s*$/, // stack frames
    /^\[INFO\]\s+Reactor Summary:/i,
    /^\[INFO\]\s+Results:/i,
  ];

  const hits: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (SIGNAL.some((rx) => rx.test(lines[i]))) hits.push(i);
  }

  if (hits.length === 0) {
    // нет явного сигнала — вернём последние строки без шума
    const tail = Math.min(lines.length, Math.min(maxTotalLines, 400));
    return lines
      .slice(-tail)
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  type Block = { start: number; end: number };
  const blocks: Block[] = [];
  for (const idx of hits) {
    const s = Math.max(0, idx - contextBefore);
    const e = Math.min(lines.length - 1, idx + contextAfter);
    const last = blocks[blocks.length - 1];
    if (!last || s > last.end + 1) blocks.push({ start: s, end: e });
    else last.end = Math.max(last.end, e);
  }

  const picked: string[] = [];
  for (const b of blocks.slice(-maxBlocks)) {
    picked.push('--- maven:signal ---');
    picked.push(...lines.slice(b.start, b.end + 1));
  }

  let out = picked.join('\n');
  const outLines = out.split('\n');
  if (outLines.length > maxTotalLines) {
    out = outLines.slice(-maxTotalLines).join('\n');
  }

  return out.replace(/\n{3,}/g, '\n\n').trim();
}
