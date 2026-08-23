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

export default function Demo() {
  const [activeWordIdx, setActiveWordIdx] = useState<number | null>(1); // Default to 'short'
  const [savedWords, setSavedWords] = useState<number[]>([]);

  const handleSaveWord = (idx: number) => {
    if (!savedWords.includes(idx)) {
      setSavedWords([...savedWords, idx]);
    }
    setTimeout(() => setActiveWordIdx(null), 800);
  };

  return (
    <section id="demo" className="w-full py-20 bg-cream text-slate-dark border-t border-stone-200/80 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side: Explanation */}
        <div className="flex-1 space-y-4 text-left">
          <span className="text-xs font-bold tracking-widest text-rust uppercase block">
            ✦ Interactive Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-dark leading-tight">
            Click to translate. <br />
            <span className="italic text-rust">Test it yourself.</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-md pt-1">
            Tap or click any word in a story sentence below to reveal instant word meanings, parts of speech, and save them straight to your personal wordbook.
          </p>
        </div>

        {/* Right Side: Interactive Card */}
        <div className="flex-1 w-full max-w-lg bg-white rounded-xs p-6 sm:p-8 shadow-sm border border-stone-200/80 relative">
          
          {/* Card Header */}
          <div className="mb-6 flex justify-between items-center text-[11px] font-mono text-stone-400 border-b border-stone-100 pb-3 uppercase tracking-wider">
            <span>CHAPTER 01 / DEMO</span>
            <span>ENGLISH → ARABIC</span>
          </div>

          {/* Interactive Sentence */}
          <div className="text-2xl sm:text-3xl font-serif leading-relaxed text-slate-dark flex flex-wrap gap-x-2 gap-y-1 py-4">
            {DEMO_SENTENCE.map((word, idx) => {
              const isActive = activeWordIdx === idx;
              const isSaved = savedWords.includes(idx);
              const isPunctuation = word.type === "Punctuation";

              return (
                <div key={idx} className="relative inline-block">
                  <button
                    onClick={() => !isPunctuation && setActiveWordIdx(isActive ? null : idx)}
                    className={`transition-all rounded-xs px-1.5 py-0.5 ${
                      isPunctuation
                        ? "cursor-default"
                        : "hover:bg-beige-card/50 cursor-pointer"
                    } ${
                      isActive ? "bg-beige-card text-slate-dark font-medium" : ""
                    } ${
                      isSaved ? "border-b-2 border-rust" : ""
                    }`}
                  >
                    {word.text}
                  </button>

                  {/* Tooltip Popup */}
                  {isActive && !isPunctuation && (
                    <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 bg-white rounded-xs shadow-xl border border-stone-200 p-4">
                      {/* Tooltip triangle */}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-stone-200"></div>
                      
                      <div className="relative z-10 flex flex-col items-center text-center gap-1.5">
                        <span className="text-xl font-serif font-bold text-slate-dark" dir="rtl">
                          {word.translation}
                        </span>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-rust">
                          {word.type}
                        </span>
                        
                        <div className="w-full h-px bg-stone-100 my-1" />
                        
                        {isSaved ? (
                          <div className="text-xs font-medium text-rust flex items-center gap-1">
                            <span>✓</span>
                            <span>Added to My Words</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSaveWord(idx)}
                            className="w-full py-1.5 rounded-xs bg-slate-dark text-white text-xs font-medium hover:bg-black transition-all"
                          >
                            + Save Word
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Card Footer Metric */}
          <div className="mt-8 p-3 bg-cream rounded-xs border border-stone-200/60 flex items-center justify-between text-xs font-mono text-stone-600">
            <span>WORDS SAVED TODAY:</span>
            <span className="font-bold text-rust">{savedWords.length} / 10</span>
          </div>

        </div>

      </div>
    </section>
  );
}