"use client";

import { useState } from "react";

const DEMO_SENTENCE = [
  { text: "Read", translation: "اقرأ", type: "Verb", known: false },
  { text: "short", translation: "قصيرة", type: "Adjective", known: false },
  { text: "stories", translation: "قصص", type: "Noun", known: false },
  { text: "and", translation: "و", type: "Conjunction", known: true },
  { text: "build", translation: "ابنِ / طوّر", type: "Verb", known: false },
  { text: "your", translation: "ـك (ضمير ملكية)", type: "Pronoun", known: true },
  { text: "vocabulary", translation: "مفردات", type: "Noun", known: false },
  { text: ".", translation: ".", type: "Punctuation", known: true },
];

export default function HowItWorks() {
  const [activeWordIdx, setActiveWordIdx] = useState<number | null>(1); // Default to 'short'
  const [savedWords, setSavedWords] = useState<number[]>([]);

  const handleSaveWord = (idx: number) => {
    if (!savedWords.includes(idx)) {
      setSavedWords([...savedWords, idx]);
    }
    setTimeout(() => setActiveWordIdx(null), 800);
  };

  return (
    <section className="w-full py-24 bg-white dark:bg-black px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Side: Text Explanation */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Click to Translate, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-cyan-400">Test it yourself.</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Click a word and see the translation your self.
          </p>
        </div>

        {/* Right Side: Interactive Demo Box */}
        <div className="flex-1 w-full max-w-lg bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-200 dark:border-gray-800 relative">
          
          <div className="mb-8 flex justify-between items-center text-sm text-gray-500 border-b border-gray-200 dark:border-gray-800 pb-4">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Chapter 1: The Beginning</span>
            <span>English</span>
          </div>

          <div className="text-2xl md:text-3xl leading-loose font-medium text-gray-800 dark:text-gray-100 flex flex-wrap gap-2">
            {DEMO_SENTENCE.map((word, idx) => {
              const isActive = activeWordIdx === idx;
              const isSaved = savedWords.includes(idx);
              const isPunctuation = word.type === "Punctuation";

              return (
                <div key={idx} className="relative inline-block">
                  <button
                    onClick={() => !isPunctuation && setActiveWordIdx(isActive ? null : idx)}
                    className={`transition-colors duration-200 rounded-md px-1 ${
                      isPunctuation ? "cursor-default" : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 cursor-pointer"
                    } ${
                      isActive ? "bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-white" : ""
                    } ${
                      isSaved ? "border-b-2 border-green-500" : ""
                    }`}
                  >
                    {word.text}
                  </button>

                  {/* Tooltip Popup */}
                  {isActive && !isPunctuation && (
                    <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 bg-white dark:bg-black rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 animate-in fade-in zoom-in duration-200">
                      {/* Tooltip triangle indicator */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-black rotate-45 border-b border-r border-gray-100 dark:border-gray-800"></div>
                      
                      <div className="relative z-10 flex flex-col items-center text-center gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white" dir="rtl">{word.translation}</span>
                        <span className="text-xs font-medium uppercase tracking-wider text-indigo-500">{word.type}</span>
                        
                        <div className="w-full h-px bg-gray-100 dark:bg-gray-800 my-1"></div>
                        
                        {isSaved ? (
                          <div className="text-sm font-semibold text-green-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Saved to Learning
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSaveWord(idx)}
                            className="w-full py-1.5 mt-1 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                          >
                            + Add to Flashcards
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-800 dark:text-indigo-300">Words tracked today:</span>
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{savedWords.length} / 10</span>
          </div>

        </div>
      </div>
    </section>
  );
}
