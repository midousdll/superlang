"use client";

interface WordPopupProps {
  word: string;
  x: number;
  y: number;
  onClose: () => void;
  onMarkWord: (word: string, status: "learning" | "known") => void;
  isSaved: boolean;
  savedStatus?: "learning" | "known";
}

export default function WordPopup({
  word,
  x,
  y,
  onClose,
  onMarkWord,
  isSaved,
  savedStatus,
}: WordPopupProps) {
  // Mock translation - in real app would fetch from translation API
  const translation = `Translation of "${word}"`;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Popup */}
      <div
        className="fixed z-50 bg-cream/95 backdrop-blur-md rounded-xs shadow-xl border border-stone-200/90 p-5 min-w-[280px] max-w-sm"
        style={{ left: x, top: y }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-stone-400 hover:text-rust transition-colors"
          aria-label="Close popup"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Word Info */}
        <div className="mb-3">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-rust block mb-1">
            ✦ Vocabulary Lookup
          </span>
          <h3 className="font-serif text-2xl font-bold text-slate-dark leading-tight">{word}</h3>
          <p className="font-serif italic text-stone-600 text-sm mt-1.5 border-l-2 border-rust/30 pl-2.5 py-0.5">
            {translation}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-stone-200/80 mt-4">
          {!isSaved ? (
            <>
              <button
                onClick={() => onMarkWord(word, "learning")}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-rust text-white rounded-xs font-mono text-xs font-bold uppercase tracking-wider hover:bg-rust/90 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Learning
              </button>
              <button
                onClick={() => onMarkWord(word, "known")}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-dark text-white rounded-xs font-mono text-xs font-bold uppercase tracking-wider hover:bg-slate-dark/90 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Known
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onMarkWord(word, savedStatus === "known" ? "learning" : "known")}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border rounded-xs font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                  savedStatus === "known"
                    ? "border-rust text-rust hover:bg-rust/5"
                    : "border-stone-400 text-slate-dark hover:bg-stone-100"
                }`}
              >
                {savedStatus === "known" ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    To Learning
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    To Known
                  </>
                )}
              </button>
              <button
                onClick={() => onMarkWord(word, savedStatus!)}
                aria-label={`Remove ${word}`}
                className="flex items-center justify-center p-2 border border-stone-200 text-stone-400 rounded-xs hover:text-rust hover:border-rust/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}