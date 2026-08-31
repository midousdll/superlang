"use client";

import { useState, useCallback, useEffect } from "react";
import ReaderNavBar, { ReaderMode, SupportedLanguage } from "./ReaderNavBar";
import ReaderFooter from "./ReaderFooter";
import TranslationLayout from "./TranslationLayout";
import WordsLayout from "./WordsLayout";
import { BookMetadata, ChapterData } from "@/lib/data/reader";
import { isSupportedLanguage } from "@/lib/languages";
import { DEMO_SAVED_WORDS, SavedWord, WordClickInfo, WordStatus, normalizeWord, loadSavedWords, saveSavedWords } from "@/lib/vocabulary";

interface ReaderShellProps {
  book: BookMetadata;
  chapter: ChapterData;
}

export default function ReaderShell({ book, chapter }: ReaderShellProps) {

  // Keep only languages the app actually supports; drop anything unknown.
  const availableTargetLanguages: SupportedLanguage[] = (
    book.targetLanguages ?? []
  ).filter(isSupportedLanguage);

  // Initialize to the first supported target language (or null = no translation).
  const initialLanguage: SupportedLanguage | null =
    availableTargetLanguages[0] ?? null;

  // Target language state — the translation language the reader shows (or null).
  const [targetLanguage, setTargetLanguage] =
    useState<SupportedLanguage | null>(initialLanguage);

  // Reader mode: "translation" (side-by-side) or "words" (saved vocabulary)..
  const [mode, setMode] = useState<ReaderMode>("translation");

  // Hover-highlight sync state — the highlighted sentence id (or null = none)..
  const [activeSentenceId, setActiveSentenceId] = 
    useState<string | null>(null);

  // Saved vocabulary — lives here (above both layouts) so it survives mode
  // toggles (WordsLayout unmounts but this state keeps living).
  const [savedWords, setSavedWords] = useState<SavedWord[]>(() =>
    loadSavedWords(book.id) ?? DEMO_SAVED_WORDS);

  // Persist every change per book, in localStorage. The effect also runs on
  // mount, so the demo seed becomes "real" after the first visit — deleting a
  // demo word stays deleted across reloads.
  useEffect(() => {
    saveSavedWords(book.id, savedWords);
  }, [book.id, savedWords]);

  const handleRemoveWord = useCallback((id: string) => {
    setSavedWords((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const handleSaveWord = useCallback((
    info: WordClickInfo,
    status: WordStatus,
    translation: string | null
  ) => {
    setSavedWords((prev) => {
      const id = normalizeWord(info.word);
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
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Navigation Bar */}
      <ReaderNavBar
        bookTitle={book.title}
        bookAuthor={book.author}
        availableTargetLanguages={availableTargetLanguages}
        targetLanguage={targetLanguage}
        onLanguageChange={setTargetLanguage}
        mode={mode}
        onModeChange={setMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto max-w-7xl px-12 py-8">
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
            words={savedWords}
            onRemoveWord={handleRemoveWord}
            onSaveWord={handleSaveWord}
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