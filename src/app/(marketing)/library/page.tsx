import { getAllBooks } from "@/lib/data/reader";
import BookCard from "@/components/library/BookCard";
import Link from "next/link";

export default async function LibraryPage() {
  const books = await getAllBooks();

  // Set the specific book ID you want to feature here:
  const FEATURED_BOOK_ID = "petit-renard";

  const featuredBook =
    books.find((b) => b.id === FEATURED_BOOK_ID) || books[0];

  return (
    <div className="flex flex-col flex-1 w-full bg-cream text-slate-900 min-h-screen">
      {/* Header */}
      <div className="w-full border-b border-slate-200 bg-cream px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase block">
            ✦ CATALOG
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">
            The Library
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            Explore bilingual stories. Read side-by-side texts and hover over sentences or words to see translations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex flex-col gap-10">
        {featuredBook ? (
          <>
            {/* Featured Book Banner */}
            <div className="relative w-full rounded-xl bg-white border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="flex flex-col gap-3 max-w-xl">
                <span className="inline-flex items-center gap-2 text-amber-600 font-mono text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  Featured Book
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {featuredBook.title}
                </h2>
                <p className="text-slate-500 font-mono text-xs uppercase">
                  Author: {featuredBook.author} · Level: {featuredBook.level || "Beginner"}
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {featuredBook.description || "A bilingual story for language learners."}
                </p>
              </div>

              <Link
                href={`/reader/${featuredBook.id}`}
                className="shrink-0 inline-flex items-center justify-center h-10 px-6 rounded-lg bg-slate-900 text-white font-mono text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
              >
                Start Reading
              </Link>
            </div>

            {/* All Books Grid */}
            {books.length > 1 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-serif font-semibold">All Books</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-8 bg-white border border-slate-200 rounded-xl text-center font-serif text-slate-600">
            No books found in <code className="font-mono text-xs">src/books/</code>.
          </div>
        )}
      </div>
    </div>
  );
}