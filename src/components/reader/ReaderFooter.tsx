"use client";

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
  const progressPercentage =
    totalChapters > 0 ? Math.round((currentChapter / totalChapters) * 100) : 0;

  return (
    <footer className="sticky bottom-0 z-30 w-full bg-white border-t border-stone-200 px-6 py-4 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Previous Chapter Link */}
        <div className="w-full sm:w-auto flex justify-start">
          {hasPrevious ? (
            <Link
              href={`/reader/${bookId}?chapter=${currentChapter - 1}`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-stone-700 hover:text-amber-700 uppercase tracking-wider transition-colors px-3 py-1.5 rounded-xs border border-stone-200 hover:border-amber-300 bg-stone-50 hover:bg-amber-50"
            >
              ← Previous Chapter
            </Link>
          ) : (
            <span className="text-xs font-mono text-stone-300 uppercase tracking-wider px-3 py-1.5 cursor-not-allowed">
              ← First Chapter
            </span>
          )}
        </div>

        {/* Center Progress Indicator */}
        <div className="flex flex-col items-center gap-1 w-full sm:w-auto">
          <span className="text-xs font-mono font-semibold text-slate-800">
            Chapter {currentChapter} of {totalChapters}
          </span>
          <div className="w-36 h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
            <div
              className="h-full bg-amber-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Next Chapter Link */}
        <div className="w-full sm:w-auto flex justify-end">
          {hasNext ? (
            <Link
              href={`/reader/${bookId}?chapter=${currentChapter + 1}`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-stone-700 hover:text-amber-700 uppercase tracking-wider transition-colors px-3 py-1.5 rounded-xs border border-stone-200 hover:border-amber-300 bg-stone-50 hover:bg-amber-50"
            >
              Next Chapter →
            </Link>
          ) : (
            <span className="text-xs font-mono text-stone-300 uppercase tracking-wider px-3 py-1.5 cursor-not-allowed">
              End of Book
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}