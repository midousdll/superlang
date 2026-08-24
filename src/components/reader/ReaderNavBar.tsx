// src/components/reader/ReaderNavBar.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";

export type TargetLanguage = "ar" | "fr" | "en";

interface ReaderNavBarProps {
  bookTitle: string;
  chapterTitle: string;
  targetLanguage: TargetLanguage;
  onLanguageChange: (lang: TargetLanguage) => void;
}

export default function ReaderNavBar({
  bookTitle,
  chapterTitle,
  targetLanguage,
  onLanguageChange,
}: ReaderNavBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-cream/90 backdrop-blur-md border-b border-stone-200/80 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Back to Library */}
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-slate-dark text-xs font-mono uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Library</span>
        </Link>

        {/* Center: Book & Chapter Title */}
        <div className="text-center truncate px-4">
          <p className="text-xs font-mono font-bold text-rust uppercase tracking-widest truncate">
            {bookTitle}
          </p>
          <h2 className="text-sm font-serif text-slate-dark truncate font-semibold">
            {chapterTitle}
          </h2>
        </div>

        {/* Right: Target Language Selector */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-rust" />
        <select
          value={targetLanguage}
          onChange={(e) => onLanguageChange(e.target.value as TargetLanguage)}
          className="bg-white border border-stone-300 rounded-xs px-2 py-1 text-xs font-mono text-slate-dark focus:outline-none focus:border-rust cursor-pointer"
        >
          <option value="ar">Arabic (العربية)</option>
          <option value="en">English (Coming Soon)</option>
        </select>
        </div>
      </div>
    </header>
  );
}