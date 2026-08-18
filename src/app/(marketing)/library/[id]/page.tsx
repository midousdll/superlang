"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MOCK_BOOKS from "@/data/books";
import ReaderView from "@/components/ReaderView";
import VocabSidebar from "@/components/VocabSidebar";
import WordPopup from "@/components/WordPopup";

type SavedWord = { word: string; status: "learning" | "known"; translation?: string };

export default function ReaderPage() {
  const params = useParams();
  const bookId = params.id as string;
  const book = MOCK_BOOKS.find((b) => b.id === bookId);

  const [currentChapter, setCurrentChapter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"text-only" | "bilingual">("text-only");
  const [isMounted, setIsMounted] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{ word: string; x: number; y: number } | null>(null);
  const [savedWords, setSavedWords] = useState<SavedWord[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(`vocab-${bookId}`);
      return saved ? (JSON.parse(saved) as SavedWord[]) : [];
    } catch {
      return [];
    }
  });

  const handleWordClick = (word: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSelectedWord({ word, x: rect.left, y: rect.bottom + 8 });
  };

  const persistSavedWords = (words: SavedWord[]) => {
    setSavedWords(words);
    localStorage.setItem(`vocab-${bookId}`, JSON.stringify(words));
  };

  const handleMarkWord = (word: string, status: "learning" | "known") => {
    const existing = savedWords.find((w) => w.word === word);
    const updated = existing
      ? savedWords.map((w) => (w.word === word ? { ...w, status } : w))
      : [...savedWords, { word, status, translation: `Translation of ${word}` }];
    persistSavedWords(updated);
    setSelectedWord(null);
  };

  const handleRemoveWord = (word: string) => {
    persistSavedWords(savedWords.filter((w) => w.word !== word));
    setSelectedWord(null);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 w-full min-h-screen bg-cream/30 p-6 text-center">
        <h1 className="font-serif text-3xl font-bold text-slate-dark mb-2">Book Not Found</h1>
        <p className="font-mono text-xs text-stone-500 mb-6">The requested story could not be retrieved.</p>
        <Link
          href="/library"
          className="font-mono text-xs font-bold text-rust uppercase tracking-wider hover:underline"
        >
          ← Return to Library
        </Link>
      </div>
    );
  }

  const chapters = book.content || [];
  const currentContent = chapters[currentChapter] || "";
  const totalChapters = chapters.length;

  return (
    <div className="flex flex-col flex-1 w-full bg-cream/30 min-h-screen">
      {/* Reader Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-stone-200/80">
        <div className="w-full px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back to Library */}
            <div className="flex-shrink-0">
              <Link
                href="/library"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-stone-500 hover:text-rust transition-colors uppercase tracking-wider"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Library</span>
              </Link>
            </div>

            {/* Center: Title / Author */}
            <div className="flex-1 flex flex-col items-center min-w-0 text-center">
              <h1 className="font-serif font-bold text-slate-dark text-base sm:text-lg truncate max-w-xs sm:max-w-md">
                {book.title}
              </h1>
              <p className="font-mono text-[11px] text-stone-500 truncate">
                {book.author}
              </p>
            </div>

            {/* Center-Right: Chapter Pagination */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setCurrentChapter((prev) => Math.max(0, prev - 1))}
                disabled={currentChapter === 0}
                aria-label="Previous chapter"
                className="p-1 text-stone-500 disabled:opacity-20 disabled:cursor-not-allowed hover:text-slate-dark transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-stone-500 whitespace-nowrap">
                  {currentChapter + 1}/{totalChapters}
                </span>
                <div className="hidden sm:block w-20 h-1 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rust rounded-full transition-all duration-300"
                    style={{ width: `${((currentChapter + 1) / totalChapters) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setCurrentChapter((prev) => Math.min(totalChapters - 1, prev + 1))}
                disabled={currentChapter === totalChapters - 1}
                aria-label="Next chapter"
                className="p-1 text-stone-500 disabled:opacity-20 disabled:cursor-not-allowed hover:text-slate-dark transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right: View mode & Sidebar toggle */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="flex p-0.5 bg-stone-200/70 rounded-xs">
                <button
                  onClick={() => setViewMode("text-only")}
                  className={`px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-all ${
                    viewMode === "text-only"
                      ? "bg-white text-slate-dark shadow-2xs rounded-xs"
                      : "text-stone-500 hover:text-slate-dark"
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setViewMode("bilingual")}
                  className={`px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-all ${
                    viewMode === "bilingual"
                      ? "bg-white text-slate-dark shadow-2xs rounded-xs"
                      : "text-stone-500 hover:text-slate-dark"
                  }`}
                >
                  Bilingual
                </button>
              </div>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="px-2.5 py-1 rounded-xs border border-stone-200/90 bg-white/50 text-stone-600 hover:text-rust hover:border-rust/40 transition-colors flex items-center gap-1.5 font-mono text-[11px] uppercase font-bold"
                aria-label={sidebarOpen ? "Hide vocabulary sidebar" : "Show vocabulary sidebar"}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {sidebarOpen ? "Hide Vocab" : "Vocab"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Reading Canvas */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full pt-20">
        <main className={`flex-1 px-4 sm:px-8 py-10 ${sidebarOpen ? "mr-80" : ""} transition-all duration-300`}>
          <div className="max-w-3xl mx-auto">
            <ReaderView text={currentContent} onWordClick={handleWordClick} viewMode={viewMode} />
          </div>
        </main>

        {sidebarOpen && isMounted && (
          <VocabSidebar savedWords={savedWords} onRemoveWord={handleRemoveWord} bookId={bookId} />
        )}
      </div>

      {/* Word Context Menu Popup */}
      {selectedWord && (
        <WordPopup
          word={selectedWord.word}
          x={selectedWord.x}
          y={selectedWord.y}
          onClose={() => setSelectedWord(null)}
          onMarkWord={handleMarkWord}
          isSaved={savedWords.some((w) => w.word === selectedWord.word)}
          savedStatus={savedWords.find((w) => w.word === selectedWord.word)?.status}
        />
      )}
    </div>
  );
}