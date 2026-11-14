/** Polska typografia: jednoliterowe spójniki i przyimki nie zostają na końcu wiersza. */
export function keepShortWords(text: string): string {
  return text.replace(/(^|[\s(])([aiouwzAIOUWZ]) /g, "$1$2\u00a0");
}
