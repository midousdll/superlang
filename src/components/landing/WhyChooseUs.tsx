import React from "react";

const FEATURES = [
  {
    title: "Click Any Word to Translate",
    description:
      "Tap or click any word in a story to instantly see its translation, part of speech, and usage context — no switching apps or tabs.",
    icon: (
      <svg className="w-5 h-5 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
      </svg>
    ),
  },
  {
    title: "Side-by-Side Bilingual Text",
    description:
      "Read stories displayed in two languages at once. See the original English or French alongside translations to understand structure naturally.",
    icon: (
      <svg className="w-5 h-5 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
  {
    title: "Smart Vocabulary Tracking",
    description:
      "Every word you save is classified into stages. The app adapts to your progress and keeps your reading experience clean and focused.",
    icon: (
      <svg className="w-5 h-5 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Spaced Repetition Review",
    description:
      "Saved words automatically feed into a proven review schedule so they resurface at the right intervals for long-term memory.",
    icon: (
      <svg className="w-5 h-5 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Curated Story Library",
    description:
      "Access a growing collection of classic stories and short readers — all beautifully formatted and simple to read.",
    icon: (
      <svg className="w-5 h-5 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Multi-Language UI Support",
    description:
      "Full support across English, French, and Arabic with proper layout direction and clean interface text.",
    icon: (
      <svg className="w-5 h-5 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="w-full py-20 bg-cream text-slate-dark border-t border-stone-200/80 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center max-w-2xl mb-16">
          <span className="text-xs font-bold tracking-widest text-rust uppercase block mb-3 font-mono">
            ✦ Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-dark">
            Everything you need to read comfortably
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            SuperLang combines immersive reading with calm, minimal tools so every story you finish leaves you more confident.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-stone-200/80 rounded-xs p-6 shadow-2xs hover:border-stone-300 transition-all flex flex-col items-start"
            >
              <div className="w-9 h-9 rounded-xs bg-cream flex items-center justify-center mb-4 border border-stone-200/60">
                {feature.icon}
              </div>

              <h3 className="font-serif text-lg font-normal text-slate-dark mb-2">
                {feature.title}
              </h3>

              <p className="text-stone-500 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}