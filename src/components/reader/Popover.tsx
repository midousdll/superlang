"use client";

interface PopoverProps {
  word: string;
  translationData?: { translation: string; pos: string };
  position: { x: number; y: number };
  onClose: () => void;
  onSaveWord: (word: string, list: "known" | "learn") => void;
}

export default function Popover({
  word,
  translationData,
  position,
  onClose,
  onSaveWord,
}: PopoverProps) {
  return (
    <div
      style={{ top: `${position.y + 10}px`, left: `${position.x}px` }}
      className="fixed z-50 w-60 rounded-lg border border-white p-3 shadow-lg bg-orange"
    >
        {/* Clicked Word */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 bg-green">
        <span className="font-bold text-slate-800 capitalize">{word}</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xs">
          ✕
        </button>
      </div>

        {/* No Translation Message */}
      <div className="my-3 text-sm bg-red">
        {translationData ? (
          <div>
            <p className="text-slate-700 font-medium">{translationData.translation}</p>
            <span className="text-xs text-slate-400 italic">{translationData.pos}</span>
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No direct translation found.</p>
        )}
      </div>

        {/* Action Buttons */}
      <div className="flex gap-2 bg-blue">
        <button
          onClick={() => onSaveWord(word, "known")}
          className="flex-1 rounded border border-green-300 bg-green-50 py-1 text-xs font-semibold text-green-700 hover:bg-green-100"
        >
          Known
        </button>
        <button
          onClick={() => onSaveWord(word, "learn")}
          className="flex-1 rounded border border-amber-300 bg-amber-50 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100"
        >
          To Learn
        </button>
      </div>
    </div>
  );
}