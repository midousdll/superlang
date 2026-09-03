"use client";

import { useState } from "react";
import { Check, GraduationCap, Search, Trash2 } from "lucide-react";
import {
  ChapterStats,
  SavedWord,
  WordStatus,
  normalizeWord,
} from "@/lib/vocabulary";
import { SupportedLanguage } from "./ReaderNavBar";
import { getWordTranslation } from "@/lib/dictionaries";

interface WordsListProps {
  /** Saved words that appear in THIS chapter. */
  words: SavedWord[];
  /** ALL saved words for this book's language — used by the "All Words" scope. */
  allWords: SavedWord[];
  /** Chapter progress: total / known / to-learn / new. */
  stats: ChapterStats;
  /** Book's source language — needed to pick the right dictionary. */
  sourceLanguage?: string;
  /** CURRENT navbar language — translations are resolved live, so the
   *  list always shows the language selected right now, not at save time. */
  targetLanguage: SupportedLanguage | null;
  onRemove: (id: string) => void;
  /** Flip a word between known <-> to-learn. */
  onToggleStatus: (id: string) => void;
}

type WordFilter = "all" | WordStatus;

const FILTERS: { value: WordFilter; label: string }[]= [
  { value: "all", label: "All" },
  { value: "known", label: "Known" },
  { value: "to-learn", label: "To Learn" },
];

/** Which slice of the vocabulary the list shows. */
type WordScope = "chapter" | "all";

const SCOPES: { value: WordScope; label: string }[] = [
  { value: "chapter", label: "This Chapter" },
  { value: "all", label: "All Words" },
];

export default function WordsList({
  words,
  allWords,
  stats,
  sourceLanguage,
  targetLanguage,
  onRemove,
  onToggleStatus,
}: WordsListProps) {
  const [filter, setFilter] = useState<WordFilter>("all");
  const [scope, setScope] = useState<WordScope>("chapter");
  const [search, setSearch] = useState("");

  // "This Chapter" shows only words in the current chapter (previous
  // behavior); "All Words" shows the full saved vocabulary for this language.
  const scopeWords = scope === "all" ? allWords : words;

  // Status tabs + case-insensitive search both apply on top of the scope.
  const normalizedSearch = normalizeWord(search);
  const visibleWords = scopeWords.filter((w) => {
    if (filter !== "all" && w.status !== filter) return false;
    if (
      normalizedSearch &&
      !normalizeWord(w.original).includes(normalizedSearch)
    )
      return false;
    return true;
  });

  const hasItems = words.length > 0 || allWords.length > 0;
  const hasSearch = normalizedSearch.length > 0;
  const showEmptyMessage = hasItems && visibleWords.length === 0;

  return (
    <div className="flex flex-col gap-6 bg-white border border-stone-200 p-6 rounded-xs shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Saved Vocabulary
          </h2>
          <p className="text-xs font-mono text-stone-500 mt-1">
            {scope === "all"
              ? "Your full vocabulary for this language"
              : "Words in this chapter that you have tagged"}
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-xs text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
          {visibleWords.length} {visibleWords.length === 1 ? "word" : "words"}
          {visibleWords.length !== scopeWords.length
            ? ` of  ${scopeWords.length}`
            : ""}
        </span>
      </div>

      {/* Chapter progress stats */}
      <p className="text-xs font-mono text-stone-500">
        Total words in this chapter:{" "}
        <span className="font-bold text-slate-900">{stats.total}</span>{" "}
        {stats.total === 1 ? "word" : "words"} /{" "}
        <span className="font-bold text-emerald-700">{stats.known}</span> known /{" "}
        <span className="font-bold text-amber-800">{stats.toLearn}</span> to learn /{" "}
        <span className="font-bold text-stone-400">{stats.newWords}</span> new
      </p>

      {/* Scope toggle ("This Chapter" / "All Words") + search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex items-center bg-stone-100 p-1 rounded-xs border border-stone-200 text-xs font-mono self-start">
          {SCOPES.map((s) => (
            <button
              key={s.value}
              onClick={() => setScope(s.value)}
              className={`px-2.5 py-1 rounded-xs transition-all ${
                scope === s.value
                  ? "bg-slate-900 text-white font-bold shadow-2xs"
                  : "text-stone-500 hover:text-black"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search words…"
            aria-label="Search saved words"
            className="w-full pl-8 pr-2.5 py-1.5 rounded-xs border border-stone-200 bg-white text-xs font-mono text-slate-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-200"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center bg-stone-100 p-1 rounded-xs border border-stone-200 text-xs font-mono self-start">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-2.5 py-1 rounded-xs transition-all ${
              filter === f.value
                ? "bg-orange text-white font-bold shadow-2xs"
                : "text-stone-500 hover:text-black"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Vocabulary List */}
      {!hasItems ? (
        <div className="py-12 text-center border border-dashed border-stone-200 rounded-xs">
          <p className="font-serif text-stone-500 text-sm">
            No saved words yet.
          </p>
          <p className="text-xs font-mono text-stone-400 mt-1">
            Click on words while reading to save them here.
          </p>
        </div>
      ) : showEmptyMessage ? (
        <div className="py-12 text-center border border-dashed border-stone-200 rounded-xs">
          <p className="font-serif text-stone-500 text-sm">
            {hasSearch
              ? "No words match your search."
              : scope === "chapter" && filter === "all"
                ? "No words saved in this chapter yet."
                : filter === "known"
                  ? "No known words yet."
                  : "No words to learn yet."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleWords.map((item) => {
            // Resolve the translation LIVE against the current navbar
            // language (item.translation is only the save-time snapshot).
            // Missing in this language → "—", matching the popup.
            const translation =
              getWordTranslation(item.original, sourceLanguage ?? "", targetLanguage) ?? "—";
            return (
            <div
              key={item.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-stone-50/60 border border-stone-200/80 rounded-xs hover:border-amber-300 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-base font-bold text-slate-900">
                    {item.original}
                  </span>
                  <span className="text-xs font-mono text-stone-400">→</span>
                  <span className="font-sans text-sm font-medium text-amber-800">
                    {translation}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold uppercase tracking-wider border ${
                      item.status === "known"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {item.status === "known" ? "Known" : "To Learn"}
                  </span>
                </div>

                {item.contextSentence && (
                  <p className="text-xs font-serif text-stone-500 italic mt-0.5">
                    &ldquo;{item.contextSentence}&rdquo;
                  </p>
                )}
              </div>

              {/* Row actions: flip status (shows the OTHER bucket's action) + remove */}
              <div className="flex items-center gap-1 self-end sm:self-center">
                <button
                  onClick={() => onToggleStatus(item.id)}
                  title={
                    item.status === "known"
                      ? "Move to To Learn"
                      : "Mark as Known"
                  }
                  aria-label={
                    item.status === "known"
                      ? `Move ${item.original} to To Learn`
                      : `Mark ${item.original} as Known`
                  }
                  className={`text-stone-400 transition-colors p-1.5 rounded-xs hover:bg-stone-100 ${
                    item.status === "known" ? "hover:text-amber-700" : "hover:text-emerald-700"
                  }`}
                >
                  {item.status === "known" ? (
                    <GraduationCap className="w-4 h-4" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-stone-400 hover:text-red-600 transition-colors p-1.5 rounded-xs hover:bg-stone-100"
                  title="Remove word"
                  aria-label={`Remove ${item.original}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
