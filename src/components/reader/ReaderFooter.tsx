// src/components/reader/ReaderFooter.tsx
"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReaderFooterProps {
  bookId: string;
  currentChapter: number;
  totalChapters: number;
}

export default function ReaderFooter({
  bookId,
  currentChapter,
  totalChapters,
}: ReaderFooterProps) {
  const hasPrev = currentChapter > 1;
  const hasNext = currentChapter < totalChapters;

  return (
    <footer className="w-full bg-cream border-t border-stone-200/80 py-8 px-6 mt-12">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Previous Chapter */}
        {hasPrev ? (
          <Link
            href={`/reader/${bookId}?chapter=${currentChapter - 1}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xs border border-stone-300 bg-white text-slate-dark text-xs font-mono uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Chapter</span>
          </Link>
        ) : (
          <div className="w-28" /> // Spacer
        )}

        {/* Chapter Counter */}
        <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
          Chapter {currentChapter} of {totalChapters}
        </span>

        {/* Next Chapter */}
        {hasNext ? (
          <Link
            href={`/reader/${bookId}?chapter=${currentChapter + 1}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xs bg-slate-dark text-cream text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors shadow-2xs"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="w-28" /> // Spacer
        )}
      </div>
    </footer>
  );
}