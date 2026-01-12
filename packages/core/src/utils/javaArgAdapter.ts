import { fixJavaStringLiterals, isJavaPath } from './javaStringFix.js';

// Набор полей, которые мы потенциально правим
type JavaTextFields = {
  old_string?: unknown;
  new_string?: unknown;
  content?: unknown;
  text?: unknown;
  replacement?: unknown;
  patch?: unknown;
};

// Минимально необходимые поля для решения: нам важно только уметь прочитать file_path
type HasFilePath = {
  file_path?: string;
};

// Итоговый дженерик: любой объект, у которого есть file_path
export function adaptArgsForJavaIfNeeded<
  T extends HasFilePath & JavaTextFields,
>(args: T): T {
  const fp = args.file_path ?? '';
  if (!isJavaPath(fp)) return args;

  // Копия, чтобы не мутировать вход
  const out: T = { ...args };

  // Хелпер: если значение — строка, применяем фиксацию
  const fix = (v: unknown) =>
    typeof v === 'string' ? fixJavaStringLiterals(v) : v;

  // Правим только известные безопасные поля (без индекс-сигнатур и any)
  if (typeof out.old_string === 'string') {
    out.old_string = fix(out.old_string) as typeof out.old_string;
  }
  if (typeof out.new_string === 'string') {
    out.new_string = fix(out.new_string) as typeof out.new_string;
  }
  if (typeof out.content === 'string') {
    out.content = fix(out.content) as typeof out.content;
  }
  if (typeof out.text === 'string') {
    out.text = fix(out.text) as typeof out.text;
  }
  if (typeof out.replacement === 'string') {
    out.replacement = fix(out.replacement) as typeof out.replacement;
  }
  if (typeof out.patch === 'string') {
    out.patch = fix(out.patch) as typeof out.patch;
  }

  return out;
}
