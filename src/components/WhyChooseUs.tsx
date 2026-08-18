const FEATURES = [
  {
    title: "Click Any Word to Translate",
    description:
      "Tap or click any word in a story to instantly see its Arabic translation, part of speech, and usage context — no switching apps or tabs.",
    color: "indigo",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
      </svg>
    ),
  },
  {
    title: "Side-by-Side Bilingual Text",
    description:
      "Read stories displayed in two languages at once. See the original English or French alongside the Arabic translation to understand structure naturally.",
    color: "cyan",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
  {
    title: "Smart Vocabulary Tracking",
    description:
      "Every word you save is classified as New, Learning, or Mastered. The app adapts to your progress and keeps the reading experience clean.",
    color: "purple",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Spaced Repetition Flashcards",
    description:
      "Saved words automatically feed into a scientifically-proven SRS system. Words resurface at exactly the right intervals so they stick in long-term memory.",
    color: "emerald",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Copyright-Free Story Library",
    description:
      "Access a curated library of classic literature and stories — from Le Petit Prince to short fables — all legally available and beautifully formatted.",
    color: "amber",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Built for Arabic Speakers",
    description:
      "The entire interface supports Arabic, English, and French. The UI respects RTL layouts and is designed from the ground up for native Arabic readers.",
    color: "rose",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

const COLOR_MAP: Record<string, { bg: string; icon: string; badge: string }> = {
  indigo:  { bg: "bg-indigo-50 dark:bg-indigo-900/20",   icon: "text-indigo-600 dark:text-indigo-400",   badge: "bg-indigo-100 dark:bg-indigo-900/40" },
  cyan:    { bg: "bg-cyan-50 dark:bg-cyan-900/20",       icon: "text-cyan-600 dark:text-cyan-400",       badge: "bg-cyan-100 dark:bg-cyan-900/40" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-900/20",   icon: "text-purple-600 dark:text-purple-400",   badge: "bg-purple-100 dark:bg-purple-900/40" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-100 dark:bg-emerald-900/40" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-900/20",     icon: "text-amber-600 dark:text-amber-400",     badge: "bg-amber-100 dark:bg-amber-900/40" },
  rose:    { bg: "bg-rose-50 dark:bg-rose-900/20",       icon: "text-rose-600 dark:text-rose-400",       badge: "bg-rose-100 dark:bg-rose-900/40" },
};

export default function Features() {
  return (
    <section id="features" className="w-full py-24 bg-gray-50 dark:bg-black/50 px-8 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        <div className="text-center max-w-3xl mb-16">
          <h2 className="text-sm font-bold tracking-wide text-indigo-600 dark:text-indigo-400 uppercase">
            Features
          </h2>
          <h3 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to really learn a language
          </h3>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Supalango combines immersive reading with intelligent vocabulary tools so every story you finish leaves you genuinely more fluent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const colors = COLOR_MAP[feature.color];
            return (
              <div
                key={index}
                className="flex flex-col items-start bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className={`flex items-center justify-center p-3 ${colors.badge} ${colors.icon} rounded-xl mb-5`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
