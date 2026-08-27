export type SupportedLanguage = "en" | "fr" | "ar";

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["en", "fr", "ar"];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: "English",
  fr: "French",
  ar: "Arabic",
};

export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(lang);
}

// Returns a human-readable label, or the raw code itself for unknown languages
export function languageLabel(lang: string): string {
  return isSupportedLanguage(lang) ? LANGUAGE_LABELS[lang] : lang;
}