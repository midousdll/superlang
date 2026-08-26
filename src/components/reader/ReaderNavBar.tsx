// it means there are interactivities here
"use client";

import { ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";

export type InteractionMode = "sentence" | "word";
export type SidebarViewMode = "translation" | "words";
export type SupportedLanguage = "en" | "fr" | "ar";

interface ReaderNavBarProps {
  bookTitle: string;
  bookAuthor?: string;
  sourceLanguage?: SupportedLanguage;
  targetLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  sidebarViewMode: SidebarViewMode;
  onSidebarViewChange: (mode: SidebarViewMode) => void;
  interactionMode: InteractionMode;
  onInteractionModeChange: (mode: InteractionMode) => void;
  onBackToLibrary?: () => void;
}

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: "English",
  fr: "French",
  ar: "Arabic",
};

export default function ReaderNavBar({
  bookTitle,
  bookAuthor,
  sourceLanguage,
  targetLanguage,
  onLanguageChange,
  sidebarViewMode,
  onSidebarViewChange,
  interactionMode,
  onInteractionModeChange,
}: ReaderNavBarProps) {

  // Available target languages based on source language
  const availableTargetLanguages: SupportedLanguage[] = sourceLanguage === "fr" ? ["en", "ar"] : ["fr", "en"];

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

        {/* Center: Interaction Mode Controls */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xs border border-stone-200 text-xs font-mono">
          <button
            onClick={() => onInteractionModeChange("sentence")}
            className={`px-3 py-1 rounded-xs transition-all ${
              interactionMode === "sentence"
                ? "bg-orange text-white font-bold shadow-2xs"
                : "text-stone-500 hover:text-black"
            }`}
          >
            Sentence
          </button>
          <button
            onClick={() => onInteractionModeChange("word")}
            className={`px-3 py-1 rounded-xs transition-all ${
              interactionMode === "word"
                ? "bg-orange text-white font-bold shadow-2xs"
                : "text-stone-500 hover:text-black"
            }`}
          >
            Word
          </button>
        </div>

        {/* Right: View Toggles & Language Selector */}
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xs border border-stone-200 text-xs font-mono">
            <button
              onClick={() => onSidebarViewChange("translation")}
              className={`px-2.5 py-1 rounded-xs transition-all ${
                sidebarViewMode === "translation"
                ? "bg-orange text-white font-bold shadow-2xs"
                : "text-stone-500 hover:text-black"
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => onSidebarViewChange("words")}
              className={`px-2.5 py-1 rounded-xs transition-all ${
                sidebarViewMode === "words"
                ? "bg-orange text-white font-bold shadow-2xs"
                : "text-stone-500 hover:text-black"
              }`}
            >
              Saved Words
            </button>
          </div>

          {/* Target Language Dropdown */}
          <select
            value={targetLanguage}
            onChange={(e) =>
              onLanguageChange(e.target.value as SupportedLanguage)
            }
            className="h-8 px-2 bg-white border border-stone-200 rounded-xs font-mono text-xs text-black focus:outline-none focus:border-amber-600"
          >
            {availableTargetLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {LANGUAGE_LABELS[lang]}
              </option>
            ))}
          </select>

          {/* Settings */}
          <Settings className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}