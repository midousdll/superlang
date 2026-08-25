"use client";

import { useState } from "react";

interface SavedWord {
  id: string;
  original: string;
  translation: string;
  contextSentence?: string;
  language: string;
}

interface WordsListProps {
  bookId: string;
}

// Initial placeholder state for saved words per book
const DEMO_SAVED_WORDS: SavedWord[] = [
  {
    id: "w1",
    original: "renard",
    translation: "fox",
    contextSentence: "Le petit renard habite dans une grande forêt.",
    language: "fr",
  },
  {
    id: "w2",
    original: "forêt",
    translation: "forest",
    contextSentence: "Le petit renard habite dans une grande forêt.",
    language: "fr",
  },
  {
    id: "w3",
    original: "voyageur",
    translation: "traveler",
    contextSentence: "Il rencontre un jeune voyageur.",
    language: "fr",
  },
];

export default function WordsList({ bookId }: WordsListProps) {
  // Suppress unused warning while preparing for persistence hooks
  void bookId;

  const [words, setWords] = useState<SavedWord[]>(DEMO_SAVED_WORDS);

  const handleRemoveWord = (id: string) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
  };

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
          {words.length} {words.length === 1 ? "word" : "words"}
        </span>
      </div>

      {/* Vocabulary List */}
      {words.length > 0 ? (
        <div className="flex flex-col gap-3">
          {words.map((item) => (
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
                </div>

                {item.contextSentence && (
                  <p className="text-xs font-serif text-stone-500 italic mt-0.5">
                    &ldquo;{item.contextSentence}&rdquo;
                  </p>
                )}
              </div>

              <button
                onClick={() => handleRemoveWord(item.id)}
                className="self-end sm:self-center text-xs font-mono text-stone-400 hover:text-red-600 transition-colors px-2 py-1"
                title="Remove word"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border border-dashed border-stone-200 rounded-xs">
          <p className="font-serif text-stone-500 text-sm">
            No saved words yet.
          </p>
          <p className="text-xs font-mono text-stone-400 mt-1">
            Click on words while reading to save them here.
          </p>
        </div>
      )}
    </div>
  );
}