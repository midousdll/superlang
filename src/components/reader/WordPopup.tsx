"use client";

import { useEffect, useRef } from "react";
import { Check, GraduationCap, Trash2 } from "lucide-react";
import { WordStatus } from "@/lib/vocabulary";
import { X } from "lucide-react";

interface WordPopupProps {
  word: string;
  translation: string | null;
  /** Whether a target language is selected at all (affects the message). */
  hasTranslation: boolean;
  /** If already saved, its current status ("known" | "to-learn"); else null. */
  savedStatus: WordStatus | null;
  position: { x: number; y: number };
  onSave: (status: WordStatus) => void;
  /** Remove the word entirely — triggered by clicking the ACTIVE status
      button again (e.g. "Saved (Known)" clicked a second time). */
  onRemove: () => void;
  onClose: () => void;
}

export default function WordPopup({
  word,
  translation,
  hasTranslation,
  savedStatus,
  position,
  onSave,
  onRemove,
  onClose,
}: WordPopupProps) {
  const canSave = hasTranslation && translation !== null;
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on Escape, side-click, or scroll — but not when the click is inside the popup.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      // Click/tap on the popup itself (buttons, ×, text) must not close it.
      if (popupRef.current && e.target instanceof Node && popupRef.current.contains(e.target)) {
        return;
      }
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
      ref={popupRef}
      className="fixed z-50 w-64 bg-white border border-gray-300 rounded-xs shadow-2xl p-4"
      style={{ left: clampedX, top: clampedY }}
      onPointerDown={(e) => e.stopPropagation()}
      role="dialog"
      aria-label={`Translation for ${word}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col flex-1 gap-2 min-w-0">
          <span className="font-serif text-lg font-bold text-slate-900 wrap-break-word">
            {word}
          </span>
          <span className="font-sans text-sm font-medium text-amber-800 wrap-break-word">
            {translation ?? (hasTranslation ? "Not in dictionary yet." : "No translation selected.")}
          </span>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 text-black hover:text-slate-900 hover:bg-gray-200 transition-colors p-1 text-sm"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Save buttons: Known | To Learn */}
      <div className="flex items-center gap-2 mt-4">
        {((["known", "to-learn"]) as WordStatus[]).map((status) => {
          const isCurrent = savedStatus === status;
          const StatusIcon = status === "known" ? Check : GraduationCap;
          return (
            <button
              key={status}
              onClick={() => (isCurrent ? onRemove() : onSave(status))}
              // The active button doubles as "Remove", so it stays clickable
              // even when canSave is false (e.g. saved under EN, navbar on
              // AR where the dictionary has no translation for it).
              disabled={!canSave && !isCurrent}
              className={`group flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-xs text-xs font-mono font-bold transition-all border ${
                isCurrent
                  ? "bg-blue text-white border-orange shadow-2xs hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  : "bg-stone-100 text-black border-stone-200 hover:bg-yellow disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              {isCurrent ? (
                <>
                  {/* Saved state — swaps to a red "Remove" affordance on hover */}
                  <StatusIcon className="w-3.5 h-3.5 shrink-0 group-hover:hidden" />
                  <Trash2 className="hidden w-3.5 h-3.5 shrink-0 group-hover:inline" />
                  <span className="group-hover:hidden">
                    {`Saved (${status === "known" ? "Known" : "To Learn"})`}
                  </span>
                  <span className="hidden group-hover:inline">Remove</span>
                </>
              ) : (
                <>
                  <StatusIcon className="w-3.5 h-3.5 shrink-0" />
                  {status === "known" ? "Known" : "To Learn"}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}