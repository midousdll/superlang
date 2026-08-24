// src/lib/data/reader.ts
import { createClient } from "@/lib/supabase/server";
import { Book, Chapter, Segment } from "@/types/database";

export interface FullChapterData {
  book: Book;
  chapter: Chapter;
  segments: Segment[];
}

export async function getChapterSegments(
  bookId: string,
  chapterNumber: number = 1
): Promise<FullChapterData | null> {
  const supabase = createClient();

  // 1. Fetch Book Metadata
  const { data: book, error: bookError } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .maybeSingle();

  if (bookError || !book) {
    console.error(`Book Fetch Error for id "${bookId}":`, bookError?.message || "Book not found");
    return null;
  }

  // 2. Fetch Target Chapter
  const { data: chapter, error: chapterError } = await supabase
    .from("chapters")
    .select("*")
    .eq("book_id", bookId)
    .eq("chapter_number", chapterNumber)
    .maybeSingle();

  if (chapterError || !chapter) {
    console.error("Chapter Fetch Error:", chapterError?.message || "Chapter not found");
    return null;
  }

  // 3. Fetch Segments
  const { data: segments, error: segmentsError } = await supabase
    .from("segments")
    .select("*")
    .eq("chapter_id", chapter.id)
    .order("segment_order", { ascending: true });

  if (segmentsError || !segments) {
    console.error("Segments Fetch Error:", segmentsError?.message);
    return null;
  }

  return { book, chapter, segments };
}

export async function getAllBooks(): Promise<Book[]> {
  const supabase = createClient();

  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !books) {
    console.error("Failed to fetch books:", error?.message);
    return [];
  }

  return books;
}