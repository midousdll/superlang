import Link from "next/link";
import { Book } from "@/data/books";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="group flex flex-col bg-white rounded-xs border border-stone-200/80 overflow-hidden shadow-2xs hover:border-slate-dark/40 transition-all">
      {/* Card Header & Metadata Badges */}
      <div className="p-4 border-b border-stone-100 flex items-center justify-between gap-2 bg-stone-50/40">
        <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold tracking-wider uppercase bg-stone-100 text-stone-700 border border-stone-200">
          {book.language}
        </span>
        <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold tracking-wider uppercase bg-cream text-rust border border-rust/20">
          {book.level}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-serif text-slate-dark text-lg leading-snug group-hover:text-rust transition-colors">
            {book.title}
          </h3>
          <p className="font-mono text-xs text-stone-500 mt-1">
            {book.author}
          </p>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 flex-1">
          {book.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-auto">
          <span className="font-mono text-[11px] text-stone-400">
            {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}
          </span>
          <Link
            href={`/library/${book.id}`}
            className="font-mono text-xs font-bold text-rust uppercase tracking-wider hover:underline"
          >
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
}