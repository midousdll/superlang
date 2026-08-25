import { getBookMetadata, getChapterData } from "@/lib/data/reader";
import ReaderClient from "@/components/reader/ReaderClient";
import { notFound } from "next/navigation";

interface ReaderPageProps {
  params: Promise<{ bookid: string }>;
  searchParams: Promise<{ chapter?: string }>;
}

export default async function ReaderPage({
  params,
  searchParams,
}: ReaderPageProps) {
  const { bookid } = await params;
  const resolvedSearchParams = await searchParams;

  const chapterNumber = resolvedSearchParams?.chapter
    ? parseInt(resolvedSearchParams.chapter, 10)
    : 1;

  const book = await getBookMetadata(bookid);
  const chapter = await getChapterData(bookid, isNaN(chapterNumber) ? 1 : chapterNumber);

  if (!book || !chapter) {
    notFound();
  }

  return <ReaderClient book={book} chapter={chapter} />;
}