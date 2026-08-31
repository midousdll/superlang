import { SupportedLanguage } from "@/lib/languages";

export interface DictionaryEntry {
  /** Translations keyed by language code. Partial — a word may lack AR. */
  translations: Partial<Record<SupportedLanguage, string>>;
  /** Optional note for tricky words (e.g. "porte" = door / carries). */
  note?: string;
}

export type DictionaryMap = Record<string, DictionaryEntry>;