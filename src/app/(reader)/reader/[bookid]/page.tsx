// src/app/(reader)/reader/[bookid]/page.tsx
import { getChapterSegments } from "@/lib/data/reader";
import ReaderClient from "@/components/reader/ReaderClient";
import { notFound } from "next/navigation";

interface ReaderPageProps {
  params: Promise<{
    bookid: string;
  }>;
  searchParams: Promise<{
    chapter?: string;
  }>;
}

export default async function ReaderPage({
  params,
  searchParams,
}: ReaderPageProps) {
  const { bookid } = await params;
  const resolvedSearchParams = await searchParams;

  const chapterNumber = resolvedSearchParams.chapter
    ? parseInt(resolvedSearchParams.chapter, 10)
    : 1;

  const data = await getChapterSegments(bookid, chapterNumber);

  if (!data) {
    notFound();
  }

  const { book, chapter, segments } = data;

  const formattedSegments = segments.map((seg) => ({
    id: seg.id,
    originalEn: seg.original_text,
    translations: {
      fr: seg.translation_fr || "",
      ar: seg.translation_ar || "",
    },
  }));

  return (
    <ReaderClient
      book={{ id: book.id, title: book.title }}
      chapter={{
        chapter_number: chapter.chapter_number,
        title: chapter.title,
      }}
      segments={formattedSegments}
    />
  );
}