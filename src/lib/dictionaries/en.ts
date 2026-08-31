import { DictionaryMap } from "./types";

/**
 * English → translations dictionary.
 *
 * Placeholder — currently EMPTY because the only book with actual chapter
 * content (petit-renard) has a French source. Fill this in the same way as
 * fr.ts when English-source chapters/books are added:
 *   1. extract all unique word tokens from the new chapter
 *   2. remove words already present in this file
 *   3. add a translation for each remaining word (fr, and ar where sensible)
 */
export const ENGLISH_DICTIONARY: DictionaryMap = {
  // example: hello: { translations: { fr: "bonjour", ar: "مرحبا" } },
};