export interface WordToken {
  id: string;
  text: string;
  isWord: boolean;
}

// A "word" = one or more Unicode letters/digits, optionally joined by
// apostrophes (straight or curly) or hyphens: e.g. "l'été", "porte-clés",
// "N'est-ce pas". Everything else (whitespace, punctuation) is a non-word token.
const WORD_PATTERN = /[\p{L}\p{N}]+(?:['\u2019-][\p{L}\p{N}]+)*/gu;

/**
 * Split a sentence into word / non-word tokens.
 *
 * - `isWord === true`  → letters/digits (with interior apostrophes & hyphens)
 * - `isWord === false` → whitespace or punctuation (rendered inert, not interactive)
 *
 * The token `id` is stable for a given sentence: `"<sentenceId>-t<index>"`.
 */
export function splitIntoTokens(sentenceId: string, text: string): WordToken[] {
  const tokens: WordToken[] = [];
  let lastEnd = 0;
  let index = 0;

  for (const match of text.matchAll(WORD_PATTERN)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;

    // Non-word chunk between the previous token and this word.
    if (start > lastEnd) {
      tokens.push({
        id: `${sentenceId}-t${index++}`,
        text: text.slice(lastEnd, start),
        isWord: false,
      });
    }

    tokens.push({
      id: `${sentenceId}-t${index++}`,
      text: match[0],
      isWord: true,
    });

    lastEnd = end;
  }

  // Trailing non-word chunk (e.g. a period or whitespace at the end).
  if (lastEnd < text.length) {
    tokens.push({
      id: `${sentenceId}-t${index++}`,
      text: text.slice(lastEnd),
      isWord: false,
    });
  }

  return tokens;
}