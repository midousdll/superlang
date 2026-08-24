// src/components/reader/ReaderCanvas.tsx
"use client";

import { TargetLanguage } from "./ReaderNavBar";

interface SegmentItem {
  id: string;
  originalEn: string;
  translations: {
    fr: string;
    ar: string;
    en?: string;
  };
}

interface ReaderCanvasProps {
  segments: SegmentItem[];
  targetLanguage?: TargetLanguage;
}

export default function ReaderCanvas({
  segments,
  targetLanguage = "ar",
}: ReaderCanvasProps) {
  const isArabic = targetLanguage === "ar";

  return (
    <div className="w-full max-w-6xl mx-auto my-6">
      {/* Book Container with Page Division */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-sm border border-stone-200/90 shadow-md divide-y md:divide-y-0 md:divide-x divide-stone-200/80">
        
        {/* LEFT PAGE: Original Source Text (French) */}
        <div className="p-8 sm:p-10 space-y-6 bg-white">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
              Original Text (Français)
            </span>
          </div>

          <div className="space-y-6">
            {segments.map((seg) => (
              <p
                key={seg.id}
                className="text-base sm:text-lg font-serif text-slate-dark leading-relaxed hover:text-rust transition-colors cursor-pointer"
              >
                {seg.originalEn}
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT PAGE: Translation Text (Arabic / Target) */}
        <div className="p-8 sm:p-10 space-y-6 bg-stone-50/50">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200/60 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
              Translation ({isArabic ? "العربية" : targetLanguage.toUpperCase()})
            </span>
          </div>

          <div className="space-y-6">
            {segments.map((seg) => {
              const translation =
                seg.translations[targetLanguage as keyof typeof seg.translations] ||
                seg.translations.ar ||
                seg.originalEn;

              return (
                <div
                  key={seg.id}
                  dir={isArabic ? "rtl" : "ltr"}
                  className={`text-base sm:text-lg text-stone-700 leading-relaxed ${
                    isArabic
                      ? "text-right font-serif leading-loose"
                      : "text-left font-serif"
                  }`}
                >
                  {translation}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}