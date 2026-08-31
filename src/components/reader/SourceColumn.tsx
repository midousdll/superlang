"use client";

import { Paragraph } from "@/lib/data/reader";
import { languageLabel } from "@/lib/languages";
import { splitIntoTokens } from "@/lib/text";
import { WordClickInfo } from "@/lib/vocabulary";

interface SourceColumnProps {
  paragraph: Paragraph;
  sourceLanguage?: string;
  /** How to render the source text: as whole sentences, or split into words. */
  variant: "sentence" | "word";
  /** Sentence-mode only: which sentence is highlighted (hover sync). */
  activeSentenceId?: string | null;
  /** Sentence-mode only: called on hover enter/leave. */
  onSentenceHover?: (id: string | null) => void;
  /** Word-mode only: called when a word is clicked. */
  onWordClick?: (info: WordClickInfo) => void;
  /** Word-mode only: which token's popup is open → keep it highlighted. */
  activeTokenId?: string | null;
}

/**
 * The always-visible original text column.
 *
 * Shared by both reader layouts:
 * - `sentence` variant → whole-sentence spans with hover highlight sync
 *   (used by TranslationLayout).
 * - `word` variant → each word is its own hoverable token
 *   (used by WordsLayout; click/popup behavior comes in Step 2).
 */
export default function SourceColumn({
  paragraph,
  sourceLanguage,
  variant,
  activeSentenceId,
  onSentenceHover,
  onWordClick,
  activeTokenId,
}: SourceColumnProps) {
  const isSourceRtl = sourceLanguage === "ar";

  return (
    <div
      dir={isSourceRtl ? "rtl" : "ltr"}
      className={`text-base text-slate-900 leading-relaxed ${
        isSourceRtl ? "font-sans" : "font-serif"
      }`}
    >
      <span className="block mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
        {sourceLanguage ? languageLabel(sourceLanguage) : "Source"}
      </span>

      {variant === "sentence" ? (
        paragraph.sentences.map((sentence) => {
          const isActive = activeSentenceId === sentence.id;
          return (
            <span
              key={sentence.id}
              onMouseEnter={() => onSentenceHover?.(sentence.id)}
              onMouseLeave={() => onSentenceHover?.(null)}
              className={`inline cursor-pointer px-0.5 py-0.5 rounded-xs transition-colors ${
                isActive
                  ? "bg-amber-100 text-slate-900 font-medium"
                  : "hover:bg-amber-50"
              }`}
            >
              {sentence.original}{" "}
            </span>
          );
        })
      ) : (
        paragraph.sentences.map((sentence) =>
          splitIntoTokens(sentence.id, sentence.original).map((token) => {
            if (!token.isWord) {
              return <span key={token.id}>{token.text}</span>;
            }
            const isActive = activeTokenId === token.id;
            return (
              <span
                key={token.id}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  onWordClick?.({
                    tokenId: token.id,
                    word: token.text,
                    sentenceId: sentence.id,
                    sentenceText: sentence.original,
                    x: rect.left,
                    y: rect.bottom,
                  });
                }}
                className={`inline cursor-pointer px-0.5 py-0.5 rounded-xs transition-colors ${
                  isActive
                    ? "bg-amber-100 text-slate-900 font-medium"
                    : "hover:bg-amber-50"
                }`}
              >
                {token.text}
              </span>
            );
          })
        )
      )}
    </div>
  );
}