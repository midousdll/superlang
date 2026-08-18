"use client";

interface VocabSidebarProps {
  savedWords: Array<{ word: string; status: "learning" | "known"; translation?: string }>;
  onRemoveWord: (word: string) => void;
  bookId: string;
}

export default function VocabSidebar({ savedWords, onRemoveWord }: VocabSidebarProps) {
  const learningWords = savedWords.filter((w) => w.status === "learning");
  const knownWords = savedWords.filter((w) => w.status === "known");

  return (
    <aside className="fixed right-0 top-0 bottom-0 w-80 bg-stone-50/95 backdrop-blur-md border-l border-stone-200/80 z-30 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-stone-200/80 pb-4">
          <h2 className="font-serif text-xl font-bold text-slate-dark">Vocabulary</h2>
          <p className="font-mono text-xs text-stone-500 mt-1">
            {savedWords.length} total · {learningWords.length} learning · {knownWords.length} known
          </p>
        </div>

        {/* Learning Words */}
        {learningWords.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rust" />
                <h3 className="font-mono text-xs font-bold text-slate-dark uppercase tracking-wider">
                  Learning
                </h3>
              </div>
              <span className="font-mono text-[11px] text-stone-400">({learningWords.length})</span>
            </div>

            <div className="space-y-2">
              {learningWords.map((item) => (
                <div
                  key={item.word}
                  className="flex items-start justify-between p-3 bg-white border border-stone-200/80 rounded-xs group hover:border-stone-300 transition-colors"
                >
                  <div>
                    <p className="font-serif text-slate-dark text-base font-medium">{item.word}</p>
                    {item.translation && (
                      <p className="font-mono text-xs text-stone-500 mt-0.5">{item.translation}</p>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveWord(item.word)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-rust transition-all"
                    aria-label={`Remove ${item.word}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Known Words */}
        {knownWords.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                <h3 className="font-mono text-xs font-bold text-stone-600 uppercase tracking-wider">
                  Known
                </h3>
              </div>
              <span className="font-mono text-[11px] text-stone-400">({knownWords.length})</span>
            </div>

            <div className="space-y-2">
              {knownWords.map((item) => (
                <div
                  key={item.word}
                  className="flex items-start justify-between p-3 bg-white/60 border border-stone-200/60 rounded-xs group hover:border-stone-300 transition-colors"
                >
                  <div>
                    <p className="font-serif text-stone-700 text-base">{item.word}</p>
                    {item.translation && (
                      <p className="font-mono text-xs text-stone-400 mt-0.5">{item.translation}</p>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveWord(item.word)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-rust transition-all"
                    aria-label={`Remove ${item.word}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {savedWords.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-stone-200 rounded-xs p-4">
            <svg className="w-8 h-8 text-stone-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="font-serif text-slate-dark text-sm">No saved vocabulary</p>
            <p className="font-mono text-[11px] text-stone-400 mt-1">Select words while reading to save them here</p>
          </div>
        )}
      </div>
    </aside>
  );
}