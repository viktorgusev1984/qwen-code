// utils/logTruncate.ts

export type TruncateOpts = {
  /** жёсткий лимит строк (до обрезки по символам) */
  maxLines?: number; // по умолчанию 1500
  /** сколько строк оставить с головы */
  headLines?: number; // по умолчанию 100
  /** сколько строк оставить с хвоста */
  tailLines?: number; // по умолчанию 1400
  /** жёсткий лимит символов после склейки head+tail */
  maxChars?: number; // по умолчанию 120_000
  /** маркер между head и tail */
  elideMarker?: string; // по умолчанию '\n... [truncated] ...\n'
};

export type TruncateResult = {
  text: string;
  truncated: boolean;
  original_lines: number;
  kept_lines: number;
  original_chars: number;
  kept_chars: number;
};

export function truncateHeadTail(
  input: string,
  opts: TruncateOpts = {},
): TruncateResult {
  const {
    maxLines = 1500,
    headLines = 100,
    tailLines = 1400,
    maxChars = 120_000,
    elideMarker = '\n... [truncated] ...\n',
  } = opts;

  const lines = input.split('\n');
  const truncatedByLines = lines.length > maxLines;

  let kept: string;
  if (truncatedByLines) {
    const head = lines.slice(0, headLines);
    const tail = lines.slice(-tailLines);
    kept = head.join('\n') + elideMarker + tail.join('\n');
  } else {
    kept = input;
  }

  const truncatedByChars = kept.length > maxChars;
  if (truncatedByChars) {
    // Берём хвост — чаще там ошибки/итоги
    kept = kept.slice(-maxChars);
  }

  const outLines = kept.split('\n');
  return {
    text: kept,
    truncated: truncatedByLines || truncatedByChars,
    original_lines: lines.length,
    kept_lines: outLines.length,
    original_chars: input.length,
    kept_chars: kept.length,
  };
}

/** Профиль для LLM (побольше контекста) */
export function truncateForLLM(input: string): TruncateResult {
  return truncateHeadTail(input, {
    maxLines: 1500,
    headLines: 100,
    tailLines: 1400,
    maxChars: 120_000,
  });
}

/** Профиль для UI/returnDisplay (компактнее) */
export function truncateForDisplay(input: string): TruncateResult {
  return truncateHeadTail(input, {
    maxLines: 400,
    headLines: 50,
    tailLines: 350,
    maxChars: 60_000,
  });
}
