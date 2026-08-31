import { SupportedLanguage } from "@/lib/languages";
import { DictionaryMap, DictionaryEntry } from "./types";
import { FRENCH_DICTIONARY } from "./fr";
import { ENGLISH_DICTIONARY } from "./en";

export type { DictionaryMap, DictionaryEntry } from "./types";
export { FRENCH_DICTIONARY } from "./fr";
export { ENGLISH_DICTIONARY } from "./en";

/** Trim + lowercase — the canonical form used for lookup and dedup. */
export function normalizeWord(word: string): string {
  return word.trim().toLowerCase();
}

/**
 * Look up a translation for a word.
 *
 * Picks the dictionary based on the book's source language, normalizes the
 * word, and returns the translation for the target language — or `null` when
 * the word is unknown or no target is selected.
 */
export function getWordTranslation(
  word: string,
  sourceLang: string,
  targetLang: SupportedLanguage | null
): string | null {
  if (!targetLang) return null;

  let dict: DictionaryMap;
  if (sourceLang === "fr") dict = FRENCH_DICTIONARY;
  else if (sourceLang === "en") dict = ENGLISH_DICTIONARY;
  else return null;

  const entry = dict[normalizeWord(word)];
  return entry?.translations[targetLang] ?? null;
}