"use client";

import { useState } from "react";
import { Paragraph } from "@/lib/data/reader";
import { SupportedLanguage } from "./ReaderNavBar";
import {
  ChapterStats,
  SavedWord,
  WordClickInfo,
  WordStatus,
  normalizeWord,
} from "@/lib/vocabulary";
import { getWordTranslation } from "@/lib/dictionaries";
import SourceColumn from "./SourceColumn";
import WordsList from "./WordsList";
import WordPopup from "./WordPopup";

interface WordsLayoutProps {
  paragraphs: Paragraph[];
  sourceLanguage?: string;
  targetLanguage: SupportedLanguage | null;
  /** Saved words that appear in THIS chapter (derived from the global vocabulary). */
  words: SavedWord[];
  /** Chapter progress: total / known / to-learn / new. */
  stats: ChapterStats;
  onRemoveWord: (id: string) => void;
  onSaveWord: (
    info: WordClickInfo,
    status: WordStatus,
    translation: string | null
  ) => void;
  /** Flip a saved word between known <-> to-learn (from the list rows). */
  onToggleWordStatus: (id: string) => void;
  /** Remove a word from the vocabulary entirely (popup: click active button again). */
  onUnsaveWord: (id: string) => void;
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
  stats,
  onRemoveWord,
  onSaveWord,
  onToggleWordStatus,
  onUnsaveWord,
}: WordsLayoutProps) {
  // The clicked token whose popup is open. Its translation and save status
  // are NOT snapshotted here — they are derived live during render from the
  // current vocabulary and navbar language (see below), so the popup
  // updates the instant a save happens.
  const [activeToken, setActiveToken] = useState<WordClickInfo | null>(null);

  const handleWordClick = (info: WordClickInfo) => {
    setActiveToken(info);
  };

  // Live-derived popup data: current translation for the navbar language…
  const activeTranslation = activeToken
    ? getWordTranslation(activeToken.word, sourceLanguage ?? "", targetLanguage)
    : null;
  // …and the word's CURRENT saved entry, if any (status is derived from it
  // and its id powers the popup's "click active button again to remove").
  const activeSavedEntry = activeToken
    ? words.find(
        (w) => normalizeWord(w.original) === normalizeWord(activeToken.word)
      )
    : undefined;

  return (
    // On desktop (lg+) this fills the viewport-height content area and the
    // two panes scroll INDEPENDENTLY. On mobile the panes stack and the
    // whole area scrolls as one (inside main) — h/overflow are lg-only.
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start lg:items-stretch lg:h-full lg:overflow-hidden">
      {/* Left (2/3): the original text, split into words — scrolls alone */}
      <div className="lg:col-span-2 border border-blue lg:h-full lg:overflow-y-auto">
        <div className="w-full flex flex-col gap-8">
          {paragraphs.map((paragraph) => (
            <SourceColumn
              key={paragraph.id}
              paragraph={paragraph}
              sourceLanguage={sourceLanguage}
              variant="word"
              activeTokenId={activeToken?.tokenId ?? null}
              onWordClick={handleWordClick}
            />
          ))}
        </div>
      </div>

      {/* Right (1/3): saved vocabulary — scrolls alone */}
      <div className="lg:col-span-1 border border-red lg:h-full lg:overflow-y-auto">
        <WordsList
          words={words}
          stats={stats}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onRemove={onRemoveWord}
          onToggleStatus={onToggleWordStatus}
        />
      </div>

      {/* Word popup — floats over the viewport near the clicked word */}
      {activeToken && (
        <WordPopup
          word={activeToken.word}
          translation={activeTranslation}
          hasTranslation={targetLanguage !== null}
          savedStatus={activeSavedEntry?.status ?? null}
          position={{ x: activeToken.x, y: activeToken.y }}
          onSave={(status) => onSaveWord(activeToken, status, activeTranslation)}
          onRemove={() => {
            if (activeSavedEntry) onUnsaveWord(activeSavedEntry.id);
          }}
          onClose={() => setActiveToken(null)}
        />
      )}
    </div>
  );
}