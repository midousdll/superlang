"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ReaderFooterProps {
  bookId: string;
  currentChapter?: number;
  totalChapters?: number;
}

export default function ReaderFooter({
  bookId,
  currentChapter = 1,
  totalChapters = 1,
}: ReaderFooterProps) {
  
  const hasPrevious = currentChapter > 1;
  const hasNext = currentChapter < totalChapters;
  const progressPercentage = totalChapters > 0 ? Math.round((currentChapter / totalChapters) * 100) : 0;

  return (
    <footer className="sticky bottom-0 z-30 w-full bg-cream border-t border-black px-6 py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Chapter Link */}
        <div className="w-full sm:w-auto flex justify-start">
          {hasPrevious ? (
            <Link
              href={`/reader/${bookId}?chapter=${currentChapter - 1}`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-white text-black hover:bg-orange hover:text-white uppercase tracking-wider transition-colors px-3 py-1.5 rounded-xs border border-black"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Chapter
            </Link>
          ) : (
            <span className="flex items-center text-xs font-mono text-stone-500 uppercase tracking-wider px-3 py-1.5 cursor-not-allowed">
              {/* <ChevronLeft className="w-5 h-5" /> */}
              First Chapter
            </span>
          )}
        </div>

        {/* Center Progress Indicator */}
        <div className="flex flex-col items-center gap-1 w-full sm:w-auto">
          <span className="text-xs font-mono font-semibold text-black">
            Chapter {currentChapter} of {totalChapters}
          </span>
          <div className="w-30 h-1.5 bg-white rounded-full overflow-hidden border border-stone-200">
            <div
              className="h-full bg-orange transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Next Chapter Link */}
        <div className="w-full sm:w-auto flex justify-end">
          {hasNext ? (
            <Link
              href={`/reader/${bookId}?chapter=${currentChapter + 1}`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-white text-black hover:bg-orange hover:text-white uppercase tracking-wider transition-colors px-3 py-1.5 rounded-xs border border-black"
            >
              Next Chapter
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <span className="flex items-center text-xs font-mono text-stone-500 uppercase tracking-wider px-3 py-1.5 cursor-not-allowed">
              End of Book
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}