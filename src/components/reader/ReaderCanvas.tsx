"use client";

import { useState } from "react";
import WordToken from "./WordToken";
import Popover from "./Popover";

// Mock English to French/Arabic dictionary instance
const MOCK_DICTIONARY: Record<string, { fr: { translation: string; pos: string } }> = {
  once: { fr: { translation: "une fois", pos: "adverb" } },
  picture: { fr: { translation: "image / photo", pos: "noun" } },
  book: { fr: { translation: "livre", pos: "noun" } },
  forest: { fr: { translation: "forêt", pos: "noun" } },
};

interface Segment {
  id: string;
  originalEn: string;
  translations: { fr: string; ar: string };
}

export default function ReaderCanvas({ segments }: { segments: Segment[] }) {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);

  const handleWordClick = (word: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setActiveWord(word);
    setPopoverPos({ x: rect.left, y: rect.bottom });
  };

  const handleSaveWord = (word: string, list: "known" | "learn") => {
    // Save to localStorage or database logic
    setActiveWord(null);
  };

  return (
    <div className="flex-1 flex w-full h-full">
      {/* Left Column: Source Language (English) */}
      <div className="flex-1 border-r border-black bg-yellow p-8 leading-relaxed text-lg">
        {segments.map((segment) => (
          <p key={segment.id} className="mb-4">
            {segment.originalEn.split(" ").map((word, idx) => (
              <WordToken key={idx} rawWord={word} onWordClick={handleWordClick} />
            ))}
          </p>
        ))}
      </div>

      {/* Right Column: Target Translation (French) */}
        <div className="flex-1 bg-yellow p-8 leading-relaxed text-lg">
        {segments.map((segment) => (
          <p key={segment.id} className="mb-4">
            {segment.translations.fr}
          </p>
        ))}
      </div>

      {/* Dictionary Popover Trigger */}
      {activeWord && popoverPos && (
        <Popover
          word={activeWord}
          translationData={MOCK_DICTIONARY[activeWord]?.fr}
          position={popoverPos}
          onClose={() => setActiveWord(null)}
          onSaveWord={handleSaveWord}
        />
      )}
    </div>
  );
}