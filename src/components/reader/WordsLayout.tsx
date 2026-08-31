"use client";

import { useState } from "react";
import { Paragraph } from "@/lib/data/reader";
import { SupportedLanguage } from "./ReaderNavBar";
import { SavedWord, WordClickInfo, WordStatus, normalizeWord } from "@/lib/vocabulary";
import { getWordTranslation } from "@/lib/dictionaries";
import SourceColumn from "./SourceColumn";
import WordsList from "./WordsList";
import WordPopup from "./WordPopup";

interface WordsLayoutProps {
  paragraphs: Paragraph[];
  sourceLanguage?: string;
  targetLanguage: SupportedLanguage | null;
  words: SavedWord[];
  onRemoveWord: (id: string) => void;
  onSaveWord: (
    info: WordClickInfo,
    status: WordStatus,
    translation: string | null
  ) => void;
}

/**
 * The "Saved Words" screen.
 *
 * Flexible split: original text (split into words) takes 2/3 width,
 * the saved-vocabulary list takes 1/3. Stacks on small screens.
 */
export default function WordsLayout({
  paragraphs,
  sourceLanguage,
  targetLanguage,
  words,
  onRemoveWord,
  onSaveWord,
}: WordsLayoutProps) {
  const [activeWord, setActiveWord] = useState<{
    info: WordClickInfo;
    translation: string | null;
    savedStatus: WordStatus | null;
  } | null>(null);

  const handleWordClick = (info: WordClickInfo) => {
    const translation = getWordTranslation(info.word, sourceLanguage ?? "", targetLanguage);
    const existing = words.find((w) => w.id === normalizeWord(info.word));
    setActiveWord({
      info,
      translation,
      savedStatus: existing?.status ?? null,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left (2/3): the original text, split into words */}
      <div className="lg:col-span-2 border border-blue">
        <div className="w-full flex flex-col gap-8">
          {paragraphs.map((paragraph) => (
            <SourceColumn
              key={paragraph.id}
              paragraph={paragraph}
              sourceLanguage={sourceLanguage}
              variant="word"
              activeTokenId={activeWord?.info.tokenId ?? null}
              onWordClick={handleWordClick}
            />
          ))}
        </div>
      </div>

      {/* Right (1/3): saved vocabulary */}
      <div className="lg:col-span-1 border border-red">
        <WordsList words={words} onRemove={onRemoveWord} />
      </div>

      {/* Word popup — floats over the viewport near the clicked word */}
      {activeWord && (
        <WordPopup
          word={activeWord.info.word}
          translation={activeWord.translation}
          hasTranslation={targetLanguage !== null}
          savedStatus={activeWord.savedStatus}
          position={{ x: activeWord.info.x, y: activeWord.info.y }}
          onSave={(status) => onSaveWord(activeWord.info, status, activeWord.translation)}
          onClose={() => setActiveWord(null)}
        />
      )}
    </div>
  );
}