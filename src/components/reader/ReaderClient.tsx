"use client";

import { useState } from "react";
import ReaderNavBar, {
  SupportedLanguage,
  SidebarViewMode,
  InteractionMode,
} from "./ReaderNavBar";
import ReaderCanvas from "./ReaderCanvas";
import ReaderFooter from "./ReaderFooter";
import WordsList from "./WordsList";
import { BookMetadata, ChapterData } from "@/lib/data/reader";

interface ReaderClientProps {
  book: BookMetadata;
  chapter: ChapterData;
}

export default function ReaderClient({ book, chapter }: ReaderClientProps) {
  // Target language selection state
  const [targetLanguage, setTargetLanguage] = useState<SupportedLanguage>(
    (book.targetLanguages[0] as SupportedLanguage) || "en"
  );

  // Layout view and text interaction modes
  const [sidebarViewMode, setSidebarViewMode] =
    useState<SidebarViewMode>("translation");
  const [interactionMode, setInteractionMode] =
    useState<InteractionMode>("sentence");

  // Hover state synchronization across side-by-side columns
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Navigation and Controls Bar */}
      <ReaderNavBar
        bookTitle={book.title}
        bookAuthor={book.author}
        sourceLanguage={book.sourceLanguage as SupportedLanguage}
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

      {/* Chapter Navigation Footer */}
      <ReaderFooter
        bookId={book.id}
        currentChapter={chapter.chapterNumber}
        totalChapters={book.totalChapters}
      />
    </div>
  );
}