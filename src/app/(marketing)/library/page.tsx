// src/app/library/page.tsx
import Link from "next/link";
import { getAllBooks } from "@/lib/data/reader";

export default async function LibraryPage() {
  const books = await getAllBooks();
  
  // Use the first book (Le Voyage du Petit Renard) as the featured book
  const featuredBook = books[0];

  return (
    <div className="flex flex-col flex-1 w-full bg-cream text-slate-dark min-h-screen">
      {/* Header */}
      <div className="w-full bg-cream border-b border-amber-50 px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-rust uppercase block">
            ✦ CATALOG
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-slate-dark">
            The Library
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed max-w-4xl">
            Explore bilingual stories. Click any sentence or word while you read to see its translation.
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex flex-col gap-10">
        {/* Featured Book Banner */}
        {featuredBook ? (
          <div className="relative w-full rounded-xs bg-white border border-stone-200/80 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="inline-flex items-center gap-2 text-rust font-mono text-[11px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-rust" />
                Featured Book
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-slate-dark">
                {featuredBook.title}
              </h2>
              <p className="text-stone-500 font-mono text-xs uppercase">
                Author: {featuredBook.author} · Level: {featuredBook.level || "Beginner"}
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
        ) : (
          <div className="p-8 bg-white border border-stone-200 text-center font-serif text-stone-600">
            No books found in database.
          </div>
        )}
      </div>
    </div>
  );
}