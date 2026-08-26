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
  //  "condition ? valueIfTrue : valueIfFalse".
  //  1. Condition:
  //    if "resolvedSearchParams" is "null"/"undefined", sends "undefined" instead of throwing.
  //    ".chapter" reads the "chapter" value and this is a string (like 5), or "undefined" if the query param isn't present.
  //    The condition is "truthy" only when a "chapter" param actually exists in the URL.
  //  2. valueIfTrue:
  //    "parseInt" converts the string to an integer
  //    The "10" is the radix (base 10) — it forces decimal parsing.
  //  3. valueIfFalse:
  //    If there's no "chapter" param, or no "resolvedSearchParams", it defaults to chapter "1".
  const chapterNumber = resolvedSearchParams?.chapter 
  ? parseInt(resolvedSearchParams.chapter, 10) 
  : 1;

  const book = await getBookMetadata(bookid);
  // checks whether the value isNaN (Not-a-Number).
  const chapter = await getChapterData(bookid, isNaN(chapterNumber) ? 1 : chapterNumber);

  if (!book || !chapter) {
    notFound();
  }

  return <ReaderClient book={book} chapter={chapter} />;
}