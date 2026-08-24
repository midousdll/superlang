// src/components/reader/ReaderClient.tsx
"use client";

import { useState } from "react";
import ReaderNavBar, { TargetLanguage } from "./ReaderNavBar";
import ReaderCanvas from "./ReaderCanvas";
import ReaderFooter from "./ReaderFooter";

interface SegmentItem {
  id: string;
  originalEn: string;
  translations: {
    fr: string;
    ar: string;
    en?: string;
  };
}

interface ReaderClientProps {
  book: {
    id: string;
    title: string;
  };
  chapter: {
    chapter_number: number;
    title: string;
  };
  segments: SegmentItem[];
}

export default function ReaderClient({
  book,
  chapter,
  segments,
}: ReaderClientProps) {
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>("ar");

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-cream">
      <ReaderNavBar
        bookTitle={book.title}
        chapterTitle={chapter.title}
        targetLanguage={targetLanguage}
        onLanguageChange={setTargetLanguage}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
        <ReaderCanvas
          segments={segments}
          targetLanguage={targetLanguage}
        />
      </main>

      <ReaderFooter
        bookId={book.id}
        currentChapter={chapter.chapter_number}
        totalChapters={3}
      />
    </div>
  );
}