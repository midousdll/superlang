import Link from "next/link";
import { BookMetadata } from "@/lib/data/reader";

export default function BookCard({ book }: { book: BookMetadata }) {
  return (
    <div className="group flex flex-col bg-white rounded-xs border border-stone-200/80 overflow-hidden shadow-2xs hover:border-slate-800/40 transition-all">
      {/* Card Header & Badges */}
      <div className="p-4 border-b border-stone-100 flex items-center justify-between gap-2 bg-stone-50/40">
        <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold tracking-wider uppercase bg-stone-100 text-stone-700 border border-stone-200">
          {book.sourceLanguage.toUpperCase()}
        </span>
        <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-200">
          {book.level || "Beginner"}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-serif text-slate-900 text-lg leading-snug group-hover:text-amber-700 transition-colors">
            {book.title}
          </h3>
          <p className="font-mono text-xs text-stone-500 mt-1">
            {book.author}
          </p>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 flex-1">
          {book.description || "A bilingual story for language learners."}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-auto">
          <span className="font-mono text-[11px] text-stone-400">
            {book.totalChapters} {book.totalChapters === 1 ? "chapter" : "chapters"}
          </span>
          <Link
            href={`/reader/${book.id}`}
            className="font-mono text-xs font-bold text-amber-700 uppercase tracking-wider hover:underline"
          >
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
}