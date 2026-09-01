"use client";

// useState : A tool to hold and update dynamic data in a component.
//  - we use it whenever we have data that changes over time and needs to trigger a screen update 
// useEffect : A tool to run side effects (code outside React's control) when a component mounts or when specific data changes.
//  - we use it for external tasks like saving data to localStorage.
// useCallback : A tool to store a function in memory so React doesn't recreate it on every render. 
//  - we use it when passing functions down to heavy child components to prevent unnecessary re-renders, 
//    or when using a function inside a useEffect dependency array.
import { useState, useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import ReaderNavBar, { ReaderMode, SupportedLanguage } from "./ReaderNavBar";
import ReaderFooter from "./ReaderFooter";
import TranslationLayout from "./TranslationLayout";
import WordsLayout from "./WordsLayout";
import { BookMetadata, ChapterData } from "@/lib/data/reader";
import { isSupportedLanguage } from "@/lib/languages";
import {
  DEMO_SAVED_WORDS,
  SavedWord,
  WordClickInfo,
  WordStatus,
  normalizeWord,
  wordId,
  loadVocabulary,
  saveVocabulary,
  computeChapterStats,
} from "@/lib/vocabulary";
import {
  migrateLegacyMode,
  readModeFromCookie,
  writeModeCookie,
} from "@/lib/reader-mode";

interface ReaderShellProps {
  book: BookMetadata;
  chapter: ChapterData;
  /** Unique normalized words in this chapter (server-computed). */
  chapterWords: string[];
  /** Mode read from the cookie on the server, so the FIRST paint already
   *  shows the user's last-used view (no flash of the default view). */
  initialMode: ReaderMode;
}

// --- Reader mode as an external store --------------------------------------
// The mode lives in a cookie (the user's "last used" preference), and a
// cookie is an EXTERNAL system — so we expose it to React with
// useSyncExternalStore instead of useState + effects. The server passes its
// cookie value as `initialMode` (the getServerSnapshot), so SSR, hydration,
// and the client snapshot all agree — no mismatch, no flash.
const modeSubscribers = new Set<() => void>();

function subscribeToMode(callback: () => void): () => void {
  modeSubscribers.add(callback);
  return () => {
    modeSubscribers.delete(callback);
  };
}

/** Persist the new mode and let React know the external value changed. */
function changeMode(next: ReaderMode): void {
  writeModeCookie(next);
  for (const callback of modeSubscribers) callback();
}

function notifyModeSubscribers(): void {
  for (const callback of modeSubscribers) callback();
}

// --- Hydration gate for localStorage-backed data ---------------------------
// The saved vocabulary lives in localStorage, which the server cannot read:
// the server always renders the demo seed, while the client's first render
// would read the real data — a hydration mismatch (different list content).
// `mounted` flips from false (server/hydration) to true right after mount,
// so the first render matches the server exactly and the real vocabulary
// swaps in one frame later.
function subscribeNoop(): () => void {
  return () => {};
}

export default function ReaderShell({
  book,
  chapter,
  chapterWords,
  initialMode,
}: ReaderShellProps) {

  // Keep only languages the app actually supports; drop anything unknown.
  const availableTargetLanguages: SupportedLanguage[] = (
    book.targetLanguages ?? []
  ).filter(isSupportedLanguage);

  // Initialize to the first supported target language.
  const initialLanguage: SupportedLanguage | null =
    availableTargetLanguages[0] ?? null;

  const [targetLanguage, setTargetLanguage] =
    useState<SupportedLanguage | null>(initialLanguage);

  // Last-used mode, read from the mode cookie through the external store
  // above. During SSR/hydration React uses getServerSnapshot (= initialMode,
  // the server's cookie value); afterwards it reads the cookie directly.
  const mode = useSyncExternalStore(
    subscribeToMode,
    readModeFromCookie,
    useCallback(() => initialMode, [initialMode])
  );

  // One-time migration: old localStorage preference → cookie. Pure external
  // write (no setState), so the strict effect lint rule is satisfied.
  useEffect(() => {
    if (migrateLegacyMode() !== null) notifyModeSubscribers();
  }, []);

  const [activeSentenceId, setActiveSentenceId] = 
    useState<string | null>(null);

  // The user's GLOBAL vocabulary (one list across all books — knowing a
  // word is a property of the user, not of a book). Temporary in-memory
  // copy for instant UI updates; the per-book view below is derived.
  const [vocabulary, setVocabulary] = useState<SavedWord[]>(() =>
    loadVocabulary() ?? DEMO_SAVED_WORDS);

  // Persist every change to the single global key in localStorage. The
  // effect also runs on mount, so the demo seed becomes "real" after the
  // first visit — deleting a demo word stays deleted across reloads.
  useEffect(() => {
    saveVocabulary(vocabulary);
  }, [vocabulary]);

  // See the comment on subscribeNoop above: false during SSR + hydration,
  // true from the first client-only render onwards.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  // Render vocabulary-derived UI from the SAME data the server used until
  // we are mounted; then the real localStorage vocabulary takes over.
  const displayVocabulary = mounted ? vocabulary : DEMO_SAVED_WORDS;

  // Fast membership checks for "does this chapter contain this word?".
  const chapterWordSet = useMemo(() => new Set(chapterWords), [chapterWords]);

  // The per-book view: vocabulary entries that actually appear in THIS
  // chapter (same source language). Derived state — never stored.
  const bookWords = useMemo(
    () =>
      displayVocabulary.filter(
        (w) =>
          w.language === book.sourceLanguage &&
          chapterWordSet.has(normalizeWord(w.original))
      ),
    [displayVocabulary, book.sourceLanguage, chapterWordSet]
  );

  // Chapter progress: total / known / to-learn / new.
  const stats = useMemo(
    () => computeChapterStats(chapterWords, displayVocabulary, book.sourceLanguage),
    [chapterWords, displayVocabulary, book.sourceLanguage]
  );

  const handleRemoveWord = useCallback((id: string) => {
    setVocabulary((prev) => prev.filter((w) => w.id !== id));
  }, []);

  // Flip a word between the two buckets (known <-> to-learn) in place.
  const handleToggleWordStatus = useCallback((id: string) => {
    setVocabulary((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "known" ? "to-learn" : "known" }
          : w
      )
    );
  }, []);

  const handleSaveWord = useCallback((
    info: WordClickInfo,
    status: WordStatus,
    translation: string | null
  ) => {
    setVocabulary((prev) => {
      const id = wordId(book.sourceLanguage, normalizeWord(info.word));
      const existing = prev.find((w) => w.id === id);

      if (existing) {
        // Already saved — just re-tag it (Known <-> To Learn) in place.
        return prev.map((w) => (w.id === id ? { ...w, status } : w));
      }

      return [
        ...prev,
        {
          id,
          original: info.word,
          translation: translation ?? "—",
          language: book.sourceLanguage,
          status,
          contextSentence: info.sentenceText,
        },
      ];
    });
  }, [book.sourceLanguage]);

  return (
    // Viewport-locked shell: nav, content, and footer exactly fill the
    // screen; only the content area (main) scrolls — or, in Words mode,
    // its two panes scroll independently (see WordsLayout).
    <div className="flex flex-col h-svh overflow-hidden bg-cream">
      {/* Navigation Bar */}
      <ReaderNavBar
        bookTitle={book.title}
        bookAuthor={book.author}
        availableTargetLanguages={availableTargetLanguages}
        targetLanguage={targetLanguage}
        onLanguageChange={setTargetLanguage}
        mode={mode}
        onModeChange={changeMode}
      />

      {/* Main Content Area — the only scrollable region of the shell
          (min-h-0 lets a flex child shrink so overflow actually kicks in) */}
      <main className="flex-1 min-h-0 w-full mx-auto max-w-7xl px-12 py-8 overflow-y-auto">
        {mode === "translation" ? (
          <TranslationLayout
            paragraphs={chapter.paragraphs}
            sourceLanguage={book.sourceLanguage}
            targetLanguage={targetLanguage}
            activeSentenceId={activeSentenceId}
            onSentenceHover={setActiveSentenceId}
          />
        ) : (
          <WordsLayout
            paragraphs={chapter.paragraphs}
            sourceLanguage={book.sourceLanguage}
            targetLanguage={targetLanguage}
            words={bookWords}
            stats={stats}
            onRemoveWord={handleRemoveWord}
            onSaveWord={handleSaveWord}
            onToggleWordStatus={handleToggleWordStatus}
            onUnsaveWord={handleRemoveWord}
          />
        )}
      </main>

      {/* Footer */}
      <ReaderFooter
        bookId={book.id}
        currentChapter={chapter.chapterNumber}
        totalChapters={book.totalChapters}
      />
    </div>
  );
}