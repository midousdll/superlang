"use client";

import { ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";
import { SupportedLanguage, languageLabel } from "@/lib/languages";
import type { ReaderMode } from "@/lib/reader-mode";

// Re-exported for backward-compatibility with existing imports.
export type { ReaderMode };
// Re-exported for backward-compatibility with existing imports.
export type { SupportedLanguage } from "@/lib/languages";

interface ReaderNavBarProps {
  bookTitle: string;
  bookAuthor?: string;
  targetLanguage: SupportedLanguage | null;
  availableTargetLanguages: SupportedLanguage[];
  onLanguageChange: (lang: SupportedLanguage | null) => void;
  mode: ReaderMode;
  onModeChange: (mode: ReaderMode) => void;
  onBackToLibrary?: () => void;
}

export default function ReaderNavBar({
  bookTitle,
  bookAuthor,
  availableTargetLanguages,
  targetLanguage,
  onLanguageChange,
  mode,
  onModeChange,
}: ReaderNavBarProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-cream border-b border-black px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Back Link & Book Metadata */}
        <div className="flex items-center gap-10">
          <Link
            href="/library"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-stone-600 hover:text-slate-900 uppercase tracking-wider transition-colors"
          >
            <ChevronLeft className="w-5 h-5"/>
            Library
          </Link>
          <div className="h-6 w-px bg-black hidden sm:block" />
          <div className="hidden sm:flex flex-col">
            <h1 className="text-sm font-serif font-bold text-black truncate max-w-xs">{bookTitle}</h1>
            <span className="text-[11px] font-mono text-stone-700">By: {bookAuthor}</span>
          </div>
        </div>

        {/* Right: Mode Toggle & Language Selector */}
        <div className="flex items-center gap-3">
          {/* Reading Mode Toggle */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xs border border-stone-200 text-xs font-mono">
            <button
              onClick={() => onModeChange("translation")}
              className={`px-2.5 py-1 rounded-xs transition-all ${
                mode === "translation"
                ? "bg-orange text-white font-bold shadow-2xs"
                : "text-stone-500 hover:text-black"
              }`}
            >
              Sentence
            </button>
            <button
              onClick={() => onModeChange("words")}
              className={`px-2.5 py-1 rounded-xs transition-all ${
                mode === "words"
                ? "bg-orange text-white font-bold shadow-2xs"
                : "text-stone-500 hover:text-black"
              }`}
            >
              Words
            </button>
          </div>

          {/* Target Language Dropdown */}
          <select
            value={targetLanguage ?? ""}
            disabled={availableTargetLanguages.length === 0}
            onChange={(e) =>
              onLanguageChange(e.target.value as SupportedLanguage | null)
            }
            title={
              availableTargetLanguages.length === 0
                ? "No translation available for this book"
                : undefined
            }
            className="h-8 px-2 bg-white border border-stone-200 rounded-xs font-mono text-xs text-black focus:outline-none focus:border-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {availableTargetLanguages.length === 0 ? (
              <option value="">No translation</option>
            ) : (
              availableTargetLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {languageLabel(lang)}
                </option>
              ))
            )}
          </select>

          {/* Settings */}
          <Settings className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}