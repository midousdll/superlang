/** The two buckets a saved word can live in. */
export type WordStatus = "known" | "to-learn";

export interface WordClickInfo {
  /** Token id — used for active-token highlight in the source text. */
  tokenId: string;
  /** The word text as displayed ("Léo", "renard"). */
  word: string;
  /** The sentence the word came from (used for the list's context line). */
  sentenceId: string;
  /** The full sentence text (Option A: stored as contextSentence at save time). */
  sentenceText: string;
  /** Popup position — from the clicked token's getBoundingClientRect(). */
  x: number;
  y: number;
}

export interface SavedWord {
  /** Stable unique id — used for React keys and removal.
      We set id = normalized original text, so the same word clicked
      twice collapses to ONE entry (dedup by construction). */
  id: string;
  /** The word as clicked, with original casing ("Léo", "renard"). */
  original: string;
  /** The translation, in the target language at save time. */
  translation: string;
  /** What language the word is written in (source language code: "fr" | "en"). */
  language: string;
  /** "known" or "to-learn" — the filter dimension for the list. */
  status: WordStatus;
  /** Optional sentence the word came from (captured at save time). */
  contextSentence?: string;
}

/** Trim + lowercase — the canonical form used for lookup and dedup. */
export function normalizeWord(word: string): string {
  return word.trim().toLowerCase();
}

/** Demo seed data — starting saved words for now. Lives here so both
 *  WordsList and ReaderShell can share it (single home for demo data). */
export const DEMO_SAVED_WORDS: SavedWord[] = [
  {
    id: "renard",
    original: "renard",
    translation: "fox",
    contextSentence: "Le petit renard habite dans une grande forêt.",
    language: "fr",
    status: "known",
  },
  {
    id: "forêt",
    original: "forêt",
    translation: "forest",
    contextSentence: "Le petit renard habite dans une grande forêt.",
    language: "fr",
    status: "to-learn",
  },
  {
    id: "voyageur",
    original: "voyageur",
    translation: "traveler",
    contextSentence: "Il rencontre un jeune voyageur.",
    language: "fr",
    status: "known",
  },
];

const STORAGE_PREFIX = "superlang.vocab.";

function storageKey(bookId: string): string {
  return `${STORAGE_PREFIX}${bookId}`;
}

function isValidStatus(value: unknown): value is WordStatus {
  return value === "known" || value === "to-learn";
}

/** Load a book's saved words from localStorage. Returns `null` when
 *  nothing is stored (caller falls back to the demo seed). Values are
 *  validated so old/corrupt/partial data never crashes the app. */
export function loadSavedWords(bookId: string): SavedWord[] | null {
  try {
    const raw = localStorage.getItem(storageKey(bookId));
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    return parsed.filter((item): item is SavedWord =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as Record<string, unknown>).id === "string" &&
      typeof (item as Record<string, unknown>).original === "string" &&
      typeof (item as Record<string, unknown>).translation === "string" &&
      typeof (item as Record<string, unknown>).language === "string" &&
      isValidStatus((item as Record<string, unknown>).status)
    ) as SavedWord[];
  } catch {
    // Private mode, quota, or corrupt JSON — treat as "nothing stored".
    return null;
  }
}

/** Persist a book's saved words to localStorage. Silently ignores
 *  quota / JSON-stringify failures (private mode, storage full, etc.. */
export function saveSavedWords(bookId: string, words: SavedWord[]): void {
  try {
    localStorage.setItem(storageKey(bookId), JSON.stringify(words));
  } catch {
    // no-op — persistence is best-effort only.
  }
}

/** Remove a book's saved words from localStorage. */
export function clearSavedWords(bookId: string): void {
  try {
    localStorage.removeItem(storageKey(bookId));
  } catch {
    // no-op
  }
}