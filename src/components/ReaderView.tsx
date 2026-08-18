"use client";

interface ReaderViewProps {
  text: string;
  onWordClick: (word: string, event: React.MouseEvent<HTMLSpanElement>) => void;
  viewMode: "text-only" | "bilingual";
}

export default function ReaderView({ text, onWordClick, viewMode }: ReaderViewProps) {
  // Split text into words, punctuation, and whitespace
  const tokens = text.split(/(\s+|[.,!?;:'"()])/g).filter(Boolean);

  const renderTokens = () =>
    tokens.map((token, i) => {
      // Don't make whitespace or punctuation clickable
      if (/^[\s.,!?;:'"()]+$/.test(token)) {
        return <span key={i}>{token}</span>;
      }

      return (
        <span
          key={i}
          onClick={(e) => onWordClick(token, e)}
          className="cursor-pointer hover:bg-rust/10 hover:text-rust rounded-xs px-0.5 transition-colors duration-150 select-none"
        >
          {token}
        </span>
      );
    });

  if (viewMode === "bilingual") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Original Text Column */}
        <div className="font-serif text-lg sm:text-xl leading-relaxed sm:leading-loose text-slate-dark">
          {renderTokens()}
        </div>

        {/* Translation Column */}
        <div className="font-serif text-lg sm:text-xl leading-relaxed sm:leading-loose text-stone-600 md:border-l md:border-stone-200/80 md:pl-8 pt-6 md:pt-0 border-t border-stone-200/80 md:border-t-0">
          <span className="text-[11px] font-mono font-bold text-rust uppercase tracking-wider block mb-3">
            ✦ Translation
          </span>
          [Translation will appear here side-by-side with the original text]
        </div>
      </div>
    );
  }

  // Text-only mode
  return (
    <div className="font-serif text-lg sm:text-xl leading-relaxed sm:leading-loose text-slate-dark max-w-2xl mx-auto">
      {renderTokens()}
    </div>
  );
}