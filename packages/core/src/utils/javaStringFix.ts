// utils/javaStringFix.ts
export function fixJavaStringLiterals(input: string): string {
  // Декодируем только тривиальные escape-последовательности,
  // это безопасно для Java-кода как текста.
  if (!input || !/\\[nrt]/.test(input)) return input;

  try {
    // Аккуратно упакуем в JSON-строку и распарсим
    const escaped = input.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return JSON.parse(`"${escaped}"`);
  } catch {
    // Фоллбек на ручные замены
    return input
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t');
  }
}

export function isJavaPath(p: string): boolean {
  return /\.java$/i.test(p);
}
