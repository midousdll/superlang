"use client";

// "useState" creates React state: 
// "value" is the current value, 
// "setValue" is the updater function.
import { useState } from "react";
import ReaderNavBar, { SidebarViewMode, InteractionMode, SupportedLanguage } from "./ReaderNavBar";
import ReaderFooter from "./ReaderFooter";
import ReaderCanvas from "./ReaderCanvas";
import WordsList from "./WordsList";
import { BookMetadata, ChapterData } from "@/lib/data/reader";
import { isSupportedLanguage } from "@/lib/languages";

interface ReaderClientProps {
  book: BookMetadata;
  chapter: ChapterData;
}

export default function ReaderClient({ book, chapter }: ReaderClientProps) {
  
  // Keep only languages the app actually supports; drop anything unknown.
  const availableTargetLanguages: SupportedLanguage[] = (
    book.targetLanguages ?? []
  ).filter(isSupportedLanguage);

  // Initialize to the first supported target language. 
  // if null show "no translation" 
  const initialLanguage: SupportedLanguage | null =
    availableTargetLanguages[0] ?? null;

  // "useState" creates React state: 
  // "targetLanguage" is the current value, 
  // "setTargetLanguage" is the updater function.
  // "<SupportedLanguage | null>" is the type annotation for that state. 
  // "SupportedLanguage" is ("en" | "fr" | "ar"), so this state can now hold:
  //  ("en"), ("fr"), or ("ar") → a real language.
  //  or "null" → meaning "no language selected / loading / not applicable"
  // "initialLanguage" is the starting value passed in.
  const [targetLanguage, setTargetLanguage] =
    useState<SupportedLanguage | null>(initialLanguage);

  // view mode
  const [sidebarViewMode, setSidebarViewMode] =
    useState<SidebarViewMode>("translation");
  // interaction mode
  const [interactionMode, setInteractionMode] =
    useState<InteractionMode>("sentence");

  // "<string | null>" is the type: 
  // the value is either a sentence id (a string) 
  // or "null" (nothing active).
  // "null" is the initial value
  const [activeSentenceId, setActiveSentenceId] = 
    useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-cream border-2 border-red">
      {/* Navigation Bar */}
      <ReaderNavBar
        bookTitle={book.title}
        bookAuthor={book.author}
        availableTargetLanguages={availableTargetLanguages}
        targetLanguage={targetLanguage}
        onLanguageChange={setTargetLanguage}
        sidebarViewMode={sidebarViewMode}
        onSidebarViewChange={setSidebarViewMode}
        interactionMode={interactionMode}
        onInteractionModeChange={setInteractionMode}
      />

      {/* Main Canvas Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {sidebarViewMode === "translation" ? (
          <ReaderCanvas
            paragraphs={chapter.paragraphs}
            sourceLanguage={book.sourceLanguage}
            targetLanguage={targetLanguage}
            interactionMode={interactionMode}
            activeSentenceId={activeSentenceId}
            onSentenceHover={setActiveSentenceId}
          />
        ) : (
          <div className="max-w-3xl mx-auto">
            <WordsList bookId={book.id} />
          </div>
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