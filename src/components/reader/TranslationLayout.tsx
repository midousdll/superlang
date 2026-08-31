"use client";

import { Paragraph } from "@/lib/data/reader";
import { SupportedLanguage } from "./ReaderNavBar";
import { languageLabel } from "@/lib/languages";
import SourceColumn from "./SourceColumn";

interface TranslationLayoutProps {
  paragraphs: Paragraph[];
  sourceLanguage?: string;
  targetLanguage: SupportedLanguage | null;
  activeSentenceId: string | null;
  onSentenceHover: (id: string | null) => void;
}

/**
 * The "Side-by-Side" (translation) screen.
 *
 * Equal 50/50 halves per paragraph: original sentences on the left, aligned
 * translations on the right. Hovering a sentence highlights it on both sides.
 * This is exactly the old ReaderCanvas behavior, with no mode logic inside.
 */
export default function TranslationLayout({
  paragraphs,
  sourceLanguage,
  targetLanguage,
  activeSentenceId,
  onSentenceHover,
}: TranslationLayoutProps) {
  const isTargetRtl = targetLanguage === "ar";
  const hasTranslation = targetLanguage !== null;

  // Pick the translation in the target language first.
  // If none exists, fall back to the book's source language translation,
  // and finally to the original sentence text itself.
  const pickTranslation = (
    sentence: Paragraph["sentences"][number],
    lang: SupportedLanguage
  ): string => {
    if (sentence.translations[lang]) return sentence.translations[lang];
    if (sourceLanguage && sentence.translations[sourceLanguage]) {
      return sentence.translations[sourceLanguage];
    }
    return sentence.original;
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {paragraphs.map((paragraph) => (
        <div
          key={paragraph.id}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xs transition-all"
        >
          {/* Left: Source (sentences) */}
          <SourceColumn
            paragraph={paragraph}
            sourceLanguage={sourceLanguage}
            variant="sentence"
            activeSentenceId={activeSentenceId}
            onSentenceHover={onSentenceHover}
          />

          {/* Right: Translation */}
          <div
            dir={isTargetRtl ? "rtl" : "ltr"}
            className={`text-base text-stone-700 leading-relaxed ${
              isTargetRtl ? "font-sans" : "font-serif"
            }`}
          >
            <span className="block mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
              {hasTranslation ? languageLabel(targetLanguage!) : "Translation"}
            </span>
            {!hasTranslation ? (
              <p className="text-sm font-sans text-stone-400 italic">
                No translation available for this book.
              </p>
            ) : (
              paragraph.sentences.map((sentence) => {
                const isActive = activeSentenceId === sentence.id;
                const translationText = pickTranslation(
                  sentence,
                  targetLanguage
                );

                return (
                  <span
                    key={sentence.id}
                    onMouseEnter={() => onSentenceHover(sentence.id)}
                    onMouseLeave={() => onSentenceHover(null)}
                    className={`inline cursor-pointer px-0.5 py-0.5 rounded-xs transition-colors ${
                      isActive
                        ? "bg-amber-100 text-slate-900 font-medium"
                        : "hover:bg-amber-50"
                    }`}
                  >
                    {translationText}{" "}
                  </span>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
}