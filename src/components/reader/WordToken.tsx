"use client";

interface WordTokenProps {
  rawWord: string;
  onWordClick: (cleanWord: string, event: React.MouseEvent) => void;
}

export default function WordToken({ rawWord, onWordClick }: WordTokenProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Strip punctuation to search dictionary (e.g., "picture." -> "picture")
    const cleanWord = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, "").toLowerCase();
    onWordClick(cleanWord, e);
  };

  return (
    <span
      onClick={handleClick}
      className="cursor-pointer rounded px-0.5 hover:bg-sky-200 transition-colors duration-150 active:bg-sky-300"
    >
      {rawWord}{" "}
    </span>
  );
}