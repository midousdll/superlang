// "use client";

// import { ChevronLeftIcon, Settings } from "lucide-react";
// import React from "react";

// export type SupportedLanguage = "fr" | "en" | "ar";
// export type SidebarViewMode = "translation" | "words";
// export type InteractionMode = "sentence" | "word";

// interface ReaderNavBarProps {
//   bookTitle: string;
//   bookAuthor: string;
//   sourceLanguage: SupportedLanguage;
//   targetLanguage: SupportedLanguage;
//   onLanguageChange: (lang: SupportedLanguage) => void;
//   sidebarViewMode: SidebarViewMode;
//   onSidebarViewChange: (mode: SidebarViewMode) => void;
//   interactionMode: InteractionMode;
//   onInteractionModeChange: (mode: InteractionMode) => void;
//   onBackToLibrary?: () => void;
//   onOpenSettings?: () => void;
// }

// const ALL_LANGUAGES: { code: SupportedLanguage; label: string }[] = [
//   { code: "fr", label: "Français (FR)" },
//   { code: "en", label: "English (EN)" },
//   { code: "ar", label: "العربية (AR)" },
// ];

// export default function ReaderNavBar({
//   bookTitle,
//   bookAuthor,
//   sourceLanguage,
//   targetLanguage,
//   onLanguageChange,
//   sidebarViewMode,
//   onSidebarViewChange,
//   interactionMode,
//   onInteractionModeChange,
//   onBackToLibrary,
//   onOpenSettings,
// }: ReaderNavBarProps) {
//   // Filter out the original source language
//   const availableTargetLanguages = ALL_LANGUAGES.filter(
//     (lang) => lang.code !== sourceLanguage
//   );

//   return (
//     <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-black bg-creme px-4 backdrop-blur">
//       {/* 1. Left Section: Library Back Button & Book Info */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={onBackToLibrary}
//           className="flex items-center rounded-lg p-2 text-black hover:bg-slate-100 hover:text-slate-900"
//           title="Back to Library"
//         >
//           <ChevronLeftIcon className="h-5 w-5" />
//           Library
//         </button>

//         <div className="flex flex-col">
//           <h1 className="text-sm font-semibold text-black">
//             {bookTitle}
//           </h1>
//           <span className="text-xs text-slate-700">
//             by {bookAuthor}
//           </span>
//         </div>
//       </div>

//       {/* 2. Middle Section: Mode Controls */}
//       <div className="flex items-center gap-6">
//         {/* Interaction Mode Toggle: Sentence vs Word */}
//         <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1">
//           <button
//             onClick={() => onInteractionModeChange("sentence")}
//             className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
//               interactionMode === "sentence"
//                 ? "bg-white text-red shadow-sm"
//                 : "text-green hover:text-slate-900"
//             }`}
//           >
//             Sentence
//           </button>
//           <button
//             onClick={() => onInteractionModeChange("word")}
//             className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
//               interactionMode === "word"
//                 ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
//                 : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
//             }`}
//           >
//             Word
//           </button>
//         </div>

//         {/* Right Sidebar Mode Toggle: Translation vs Words List */}
//         <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
//           <button
//             onClick={() => onSidebarViewChange("translation")}
//             className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
//               sidebarViewMode === "translation"
//                 ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
//                 : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
//             }`}
//           >
//             Translation View
//           </button>
//           <button
//             onClick={() => onSidebarViewChange("words")}
//             className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
//               sidebarViewMode === "words"
//                 ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100"
//                 : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
//             }`}
//           >
//             Words List
//           </button>
//         </div>
//       </div>

//       {/* 3. Right Section: Target Language & Settings */}
//       <div className="flex items-center gap-3">
//         {/* Segmented Pill Language Switcher */}
//         <div
//           className="flex items-center gap-1 rounded-full border border-orange bg-green p-1"
//           role="group"
//           aria-label="Translate to"
//         >
//           <span className="px-2 text-[11px] font-medium text-white">
//             Translate to
//           </span>
//           {availableTargetLanguages.map((lang) => (
//             <button
//               key={lang.code}
//               type="button"
//               onClick={() => onLanguageChange(lang.code)}
//               aria-pressed={targetLanguage === lang.code}
//               className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
//                 targetLanguage === lang.code
//                   ? "bg-orange text-white shadow-sm"
//                   : "text-white hover:text-orange"
//               }`}
//             >
//               {lang.code.toUpperCase()}
//             </button>
//           ))}
//         </div>
//         {/* *************************************************************************************** */}
//         {/* *************************************************************************************** */}

//         {/* Settings Placeholder */}
//         <button
//           onClick={onOpenSettings}
//           className="rounded-lg p-2 text-black hover:bg-slate-100 hover:text-slate-900"
//           title="Settings"
//         >
//           <Settings className="h-5 w-5" />
//         </button>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";

export type SupportedLanguage = "en" | "fr" | "ar";
export type SidebarViewMode = "translation" | "words";
export type InteractionMode = "sentence" | "word";

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
  sourceLanguage = "fr",
  targetLanguage,
  onLanguageChange,
  sidebarViewMode,
  onSidebarViewChange,
  interactionMode,
  onInteractionModeChange,
}: ReaderNavBarProps) {
  // Available target languages based on source language
  const availableTargetLanguages: SupportedLanguage[] =
    sourceLanguage === "fr" ? ["en", "ar"] : ["fr", "en"];

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-stone-200 px-4 py-3 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Back Link & Book Metadata */}
        <div className="flex items-center gap-4">
          <Link
            href="/library"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-stone-600 hover:text-slate-900 uppercase tracking-wider transition-colors"
          >
            ← Catalog
          </Link>
          <div className="h-4 w-px bg-stone-200 hidden sm:block" />
          <div className="hidden sm:flex flex-col">
            <h1 className="text-sm font-serif font-bold text-slate-900 truncate max-w-xs">
              {bookTitle}
            </h1>
            {bookAuthor && (
              <span className="text-[11px] font-mono text-stone-500">
                {bookAuthor}
              </span>
            )}
          </div>
        </div>

        {/* Center: Interaction Mode Controls */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xs border border-stone-200 text-xs font-mono">
          <button
            onClick={() => onInteractionModeChange("sentence")}
            className={`px-3 py-1 rounded-xs transition-all ${
              interactionMode === "sentence"
                ? "bg-white text-slate-900 font-bold shadow-2xs"
                : "text-stone-500 hover:text-slate-900"
            }`}
          >
            Sentence
          </button>
          <button
            onClick={() => onInteractionModeChange("word")}
            className={`px-3 py-1 rounded-xs transition-all ${
              interactionMode === "word"
                ? "bg-white text-slate-900 font-bold shadow-2xs"
                : "text-stone-500 hover:text-slate-900"
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
                  ? "bg-white text-slate-900 font-bold shadow-2xs"
                  : "text-stone-500 hover:text-slate-900"
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => onSidebarViewChange("words")}
              className={`px-2.5 py-1 rounded-xs transition-all ${
                sidebarViewMode === "words"
                  ? "bg-white text-slate-900 font-bold shadow-2xs"
                  : "text-stone-500 hover:text-slate-900"
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
            className="h-8 px-2 bg-white border border-stone-200 rounded-xs font-mono text-xs text-slate-900 focus:outline-none focus:border-amber-600"
          >
            {availableTargetLanguages.map((lang) => (
              <option key={lang} value={lang}>
                → {LANGUAGE_LABELS[lang]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}