"use client";

import { useEffect } from "react";
import { WordStatus } from "@/lib/vocabulary";

interface WordPopupProps {
  word: string;
  translation: string | null;
  /** Whether a target language is selected at all (affects the message). */
  hasTranslation: boolean;
  /** If already saved, its current status ("known" | "to-learn"); else null. */
  savedStatus: WordStatus | null;
  position: { x: number; y: number };
  onSave: (status: WordStatus) => void;
  onClose: () => void;
}

export default function WordPopup({
  word,
  translation,
  hasTranslation,
  savedStatus,
  position,
  onSave,
  onClose,
}: WordPopupProps) {
  const canSave = hasTranslation && translation !== null;

  // Close on Escape, side-click, or scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    window.addEventListener("scroll", onClose, { passive: true, capture: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("scroll", onClose, { capture: true } as EventListenerOptions);
    };
  }, [onClose]);

  const clampedX = Math.max(8, Math.min(position.x, window.innerWidth - 280));
  const clampedY = Math.max(8, Math.min(position.y, window.innerHeight - 160));

  return (
    <div
      className="fixed z-50 w-64 bg-white border border-stone-200 rounded-xs shadow-2xl p-4"
      style={{ left: clampedX, top: clampedY }}
      onPointerDown={(e) => e.stopPropagation()}
      role="dialog"
      aria-label={`Translation for ${word}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-serif text-lg font-bold text-slate-900 break-words">
            {word}
          </span>
          <span className="text-xs font-mono text-stone-400">&rarr;</span>
          <span className="font-sans text-sm font-medium text-amber-800 break-words">
            {translation ?? (hasTranslation ? "Not in dictionary yet." : "No translation selected.")}
          </span>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 text-stone-400 hover:text-slate-900 transition-colors px-1 -mt-1 -mr-1 text-sm font-mono"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Save buttons: Known | To Learn */}
      <div className="flex items-center gap-2 mt-4">
        {((["known", "to-learn"]) as WordStatus[]).map((status) => {
          const isCurrent = savedStatus === status;
          return (
            <button
              key={status}
              onClick={() => onSave(status)}
              disabled={!canSave}
              className={`flex-1 px-2.5 py-1 rounded-xs text-xs font-mono font-bold transition-all border ${
                isCurrent
                  ? "bg-orange text-white border-orange shadow-2xs"
                  : "bg-stone-100 text-stone-600 border-stone-200 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              {isCurrent ? `Saved (${status === "known" ? "Known" : "To Learn"}))` : status === "known" ? "Known" : "To Learn"}
            </button>
          );
        })}
      </div>

      {!canSave && (
        <p className="text-[10px] font-mono text-stone-400 mt-2">
          {hasTranslation
            ? "This word isn't in the dictionary yet."
            : "Select a target language to save words."}
        </p>
      )}
    </div>
  );
}