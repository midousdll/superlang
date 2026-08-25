"use client";

import { Paragraph } from "@/lib/data/reader";
import { SupportedLanguage, InteractionMode } from "./ReaderNavBar";

interface ReaderCanvasProps {
  paragraphs: Paragraph[];
  targetLanguage: SupportedLanguage;
  interactionMode: InteractionMode;
  activeSentenceId: string | null;
  onSentenceHover: (id: string | null) => void;
}

export default function ReaderCanvas({
  paragraphs,
  targetLanguage,
  interactionMode,
  activeSentenceId,
  onSentenceHover,
}: ReaderCanvasProps) {
  const isTargetRtl = targetLanguage === "ar";

  return (
    <div className="w-full flex flex-col gap-8">
      {paragraphs.map((paragraph) => (
        <div
          key={paragraph.id}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xs border border-transparent hover:border-stone-200/60 transition-all"
        >
          {/* Left Column: Source Language */}
          <div className="text-base text-slate-900 leading-relaxed font-serif">
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
            {paragraph.sentences.map((sentence) => {
              const isActive = activeSentenceId === sentence.id;
              const translationText =
                sentence.translations[targetLanguage] ||
                sentence.translations["en"] ||
                "";

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
            })}
          </div>
        </div>
      ))}
    </div>
  );
}