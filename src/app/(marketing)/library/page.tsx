"use client";

import { useState } from "react";
import Link from "next/link";
import MOCK_BOOKS from "@/data/books";
import BookCard from "@/components/library/BookCard";
import { Search } from "lucide-react";

const FILTERS = ["All", "English", "French"];

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const featuredBook = MOCK_BOOKS.find((b) => b.featured);
  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || book.language === activeFilter;
    return matchesSearch && matchesFilter && !book.featured;
  });

  return (
    <div className="flex flex-col flex-1 w-full bg-cream text-slate-dark min-h-screen">

      {/* Header ================================================================================== */}
      <div className="w-full bg-cream border-b border-amber-50 px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-rust uppercase block">
            ✦ CATALOG
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-slate-dark">
            The Library
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed max-w-4xl">
            Explore copyright-free classics in English and French. Click any word while you read to see its translation.
          </p>
        </div>
      </div>

      {/* Page Content ============================================================================ */}
      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex flex-col gap-10">

        {/* Featured Book Banner ============================================== */}
        {featuredBook && (
          <div className="relative w-full rounded-xs bg-white border border-stone-200/80 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="inline-flex items-center gap-2 text-rust font-mono text-[11px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-rust" />
                Editor&apos;s Pick
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-slate-dark">
                {featuredBook.title}
              </h2>
              <p className="text-stone-500 font-mono text-xs">
                {featuredBook.author} · {featuredBook.chapters} chapters
              </p>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {featuredBook.description}
              </p>
            </div>
            <Link
              href={`/reader/${featuredBook.id}`}
              className="shrink-0 inline-flex items-center justify-center h-10 px-6 rounded-xs bg-slate-dark text-cream font-mono text-xs uppercase tracking-wider hover:bg-black transition-all"
            >
              Start Reading
            </Link>
          </div>
        )}

        {/* Search & Filters ================================================== */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search Bar */}
          <div className="flex flex-row w-full items-center px-4 sm:max-w-xs bg-white border border-stone-200/80 rounded-xs text-xs font-mono text-slate-dark placeholder-stone-400">
            <Search className="w-4 h-4 left-3 text-stone-500" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-4 py-2 focus:outline-none focus:border-slate-dark transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 p-1  bg-white rounded-xs border border-stone-200/80">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-xs transition-all ${
                  activeFilter === f
                    ? "bg-slate-dark text-cream font-medium shadow-2xs"
                    : "text-stone-600 hover:text-slate-dark"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Book Grid ========================================================= */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3 bg-white border border-stone-200/80 rounded-xs p-8">
            <svg className="w-10 h-10 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 16.5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-stone-600 font-serif text-base">No books found for &quot;{search}&quot;</p>
            <button
              onClick={() => { setSearch(""); setActiveFilter("All"); }}
              className="text-rust text-xs font-mono uppercase tracking-wider hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}