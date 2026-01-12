// utils/historySanitizer.ts
import { createHash } from 'node:crypto';

// Box-drawing и рамки UI (╭─╮, ─, │, ╰, etc.)
const BOX_LINE = /^[-\s\u2500-\u257F|+=]+$/u;
const BOX_DECOR = /[\u2500-\u257F]+/gu;

// Частый «шум» инструментов
const NOISY_LINES = [
  /^\s*Listed\s+\d+\s+item\(s\)\.?$/i,
  /^\s*✓\s+ReadFolder\b/i,
  /^\s*✓\s+ReadFile\b/i,
  /^\s*INFO:?\s*This conversation approached the input token limit/i,
];

export function stripToolBannersAndBoxes(text: string): string {
  const lines = text.split('\n');

  const keep: string[] = [];
  for (const raw of lines) {
    const l = raw.replace(BOX_DECOR, '').trimEnd();

    // рамки/разделители
    if (BOX_LINE.test(raw)) continue;

    // типовые однообразные строки
    if (NOISY_LINES.some((rx) => rx.test(l))) continue;

    // пустые/повторяющиеся заголовки рамок
    if (/^[-|+│ ]+$/.test(l)) continue;

    keep.push(l);
  }

  // схлопываем лишние пустые
  return keep
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function sha1(text: string): string {
  return createHash('sha1').update(text).digest('hex');
}

export function hardCapTail(text: string, cap = 120_000): string {
  // берём хвост — обычно там итог/ошибки
  if (text.length <= cap) return text;
  return text.slice(-cap);
}
