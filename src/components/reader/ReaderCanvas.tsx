"use client";

import { Paragraph } from "@/lib/data/reader";
import { SupportedLanguage, InteractionMode } from "./ReaderNavBar";
import { languageLabel } from "@/lib/languages";

interface ReaderCanvasProps {
  paragraphs: Paragraph[];
  sourceLanguage?: string;
  targetLanguage: SupportedLanguage | null;
  interactionMode: InteractionMode;
  activeSentenceId: string | null;
  onSentenceHover: (id: string | null) => void;
}

export default function ReaderCanvas({
  paragraphs,
  sourceLanguage,
  targetLanguage,
  interactionMode,
  activeSentenceId,
  onSentenceHover,
}: ReaderCanvasProps) {

  const isTargetRtl = targetLanguage === "ar";
  const isSourceRtl = sourceLanguage === "ar";
  const hasTranslation = targetLanguage !== null;

  // Pick the translation in the target language first.
  // if none exists, fall back to the book's source language translation,
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xs border border-blue transition-all"
        >
          {/* Left Column: Source Language */}
          <div
            dir={isSourceRtl ? "rtl" : "ltr"}
            className={`text-base text-slate-900 leading-relaxed ${
              isSourceRtl ? "font-sans" : "font-serif"
            }`}
          >
            <span className="block mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
              {sourceLanguage ? languageLabel(sourceLanguage) : "Source"}
            </span>
            {paragraph.sentences.map((sentence) => {
              const isActive = activeSentenceId === sentence.id;
              return (
                <span
                  key={sentence.id}
                  onMouseEnter={() =>
                    interactionMode === "sentence" &&
                    onSentenceHover(sentence.id)
                  }
                  onMouseLeave={() =>
                    interactionMode === "sentence" &&
                    onSentenceHover(null)
                  }
                  className={`inline cursor-pointer px-0.5 py-0.5 rounded-xs transition-colors ${
                    isActive
                      ? "bg-amber-100 text-slate-900 font-medium"
                      : "hover:bg-amber-50"
                  }`}
                >
                  {sentence.original}{" "}
                </span>
              );
            })}
          </div>

          {/* Right Column: Target Language */}
          <div
            dir={isTargetRtl ? "rtl" : "ltr"}
            className={`text-base text-stone-700 leading-relaxed ${
              isTargetRtl ? "font-sans" : "font-serif"
            }`}
          >
            <span className="block mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
              {hasTranslation
                ? languageLabel(targetLanguage!)
                : "Translation"}
            </span>
            {!hasTranslation ? (
              <p className="text-sm font-sans text-stone-400 italic">
                No translation available for this book.
              </p>
            ) : (
              paragraph.sentences.map((sentence) => {
                const isActive = activeSentenceId === sentence.id;
                const translationText = pickTranslation(sentence, targetLanguage);

                return (
                  <span
                    key={sentence.id}
                    onMouseEnter={() =>
                      interactionMode === "sentence" &&
                      onSentenceHover(sentence.id)
                    }
                    onMouseLeave={() =>
                      interactionMode === "sentence" &&
                      onSentenceHover(null)
                    }
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