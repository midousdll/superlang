"use client";

import { useState } from "react";
import { SavedWord, WordStatus } from "@/lib/vocabulary";

interface WordsListProps {
  words: SavedWord[];
  onRemove: (id: string) => void;
}

type WordFilter = "all" | WordStatus;

const FILTERS: { value: WordFilter; label: string }[]= [
  { value: "all", label: "All" },
  { value: "known", label: "Known" },
  { value: "to-learn", label: "To Learn" },
];

export default function WordsList({ words, onRemove }: WordsListProps) {
  const [filter, setFilter] = useState<WordFilter>("all");

  const visibleWords =
    filter === "all" ? words : words.filter((w) => w.status === filter);

  const filteredCount = filter === "all" ? words.length : visibleWords.length;
  const hasItems = words.length > 0;
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
            Words collected while reading this book
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-xs text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
          {filteredCount} {filteredCount === 1 ? "word" : "words"}
          {hasItems && filter !== "all" ? ` of  ${words.length}` : ""}
        </span>
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
            {filter === "known"
              ? "No known words yet."
              : "No words to learn yet."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleWords.map((item) => (
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
                    {item.translation}
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

              <button
                onClick={() => onRemove(item.id)}
                className="self-end sm:self-center text-xs font-mono text-stone-400 hover:text-red-600 transition-colors px-2 py-1"
                title="Remove word"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
