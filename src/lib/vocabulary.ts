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
      Format: `"<language>:<normalized word>"` (see wordId), so the same
      spelling in different source languages stays separate, and the same
      word clicked twice collapses to ONE entry (dedup by construction). */
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

/** Stable unique id for a saved word, scoped by source language so the
 *  same spelling in two languages ("pie" in fr/en) never collides. */
export function wordId(language: string, normalized: string): string {
  return `${language}:${normalized}`;
}

/** Per-chapter vocabulary progress, derived by intersecting the chapter's
 *  unique word list with the user's global vocabulary. */
export interface ChapterStats {
  /** Unique words in the chapter. */
  total: number;
  /** Chapter words the user marked as known. */
  known: number;
  /** Chapter words the user marked as to-learn. */
  toLearn: number;
  /** Chapter words not saved yet (total − known − toLearn). */
  newWords: number;
}

/**
 * Compute vocabulary progress for one chapter.
 *
 * `chapterWords` must be the normalized, deduped word list for the chapter
 * (see getChapterVocabulary). Only vocabulary entries matching `language`
 * are considered, so a word known in French is never "known" in an
 * English book.
 */
export function computeChapterStats(
  chapterWords: string[],
  vocabulary: SavedWord[],
  language: string
): ChapterStats {
  const knownWords = new Set<string>();
  const toLearnWords = new Set<string>();

  for (const entry of vocabulary) {
    if (entry.language !== language) continue;
    const normalized = normalizeWord(entry.original);
    if (entry.status === "known") knownWords.add(normalized);
    else toLearnWords.add(normalized);
  }

  let known = 0;
  let toLearn = 0;
  for (const word of chapterWords) {
    if (knownWords.has(word)) known++;
    else if (toLearnWords.has(word)) toLearn++;
  }

  return {
    total: chapterWords.length,
    known,
    toLearn,
    newWords: chapterWords.length - known - toLearn,
  };
}

/** Demo seed data — starting saved words for now. Lives here so both
 *  WordsList and ReaderShell can share it (single home for demo data). */
export const DEMO_SAVED_WORDS: SavedWord[] = [
  {
    id: wordId("fr", "renard"),
    original: "renard",
    translation: "fox",
    contextSentence: "Le petit renard habite dans une grande forêt.",
    language: "fr",
    status: "known",
  },
  {
    id: wordId("fr", "forêt"),
    original: "forêt",
    translation: "forest",
    contextSentence: "Le petit renard habite dans une grande forêt.",
    language: "fr",
    status: "to-learn",
  },
  {
    id: wordId("fr", "voyageur"),
    original: "voyageur",
    translation: "traveler",
    contextSentence: "Il rencontre un jeune voyageur.",
    language: "fr",
    status: "known",
  },
];

/** One global vocabulary for the whole user — knowing a word is a property
 *  of the user, not of a book. Per-book views are derived at read time. */
const STORAGE_KEY = "superlang.vocab.global";

function isValidStatus(value: unknown): value is WordStatus {
  return value === "known" || value === "to-learn";
}

/** Load the user's global vocabulary from localStorage. Returns `null` when
 *  nothing is stored (caller falls back to the demo seed). Values are
 *  validated so old/corrupt/partial data never crashes the app. */
export function loadVocabulary(): SavedWord[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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

/** Persist the user's global vocabulary to localStorage. Silently ignores
 *  quota / JSON-stringify failures (private mode, storage full, etc.). */
export function saveVocabulary(words: SavedWord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  } catch {
    // no-op — persistence is best-effort only.
  }
}