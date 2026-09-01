import { cookies } from "next/headers";
import { getBookMetadata, getChapterData, getChapterVocabulary } from "@/lib/data/reader";
import { parseMode, READER_MODE_COOKIE } from "@/lib/reader-mode";
import ReaderShell from "@/components/reader/ReaderShell";
import { notFound } from "next/navigation";

// "interface ReaderPageProps" : a type describing what Next.js passes to page component.
// params: Promise<{ bookid: string }> : a "Promise" must "await params" which we do later: "const { bookid } = await params".
// "<{ bookid: string }>" : the dynamic route segment. (e.g. bookid = "dracula" → "/reader/dracula"). 
// "searchParams: Promise<{ chapter?: string }>" : the query string (e.g. "?chapter=3"). 
// "?" means optional (visiting "/reader/dracula" without "?chapter=" gives "undefined").
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
  //  the code in form like : "condition ? valueIfTrue : valueIfFalse".
  //  1. Condition:
  //    if "resolvedSearchParams" is "null"/"undefined", sends "undefined" instead of throwing.
  //    ".chapter" reads the "chapter" value and this is a string (like "5"), or "undefined" if the query param isn't present.
  //    The condition is "truthy" only when a "chapter" param actually exists in the URL.
  //  2. valueIfTrue:
  //    "parseInt" converts the string to an integer
  //    The "10" is the radix (base 10) — it forces decimal parsing.
  //  3. valueIfFalse:
  //    If there's no "chapter" param, or no "resolvedSearchParams", it defaults to chapter "1".
  const chapterNumber = resolvedSearchParams?.chapter 
  ? parseInt(resolvedSearchParams.chapter, 10)
  : 1;

  // "isNaN" checks whether the value is NaN (Not-a-Number).
  const resolvedChapterNumber = isNaN(chapterNumber) ? 1 : chapterNumber;

  const book = await getBookMetadata(bookid);
  const chapter = await getChapterData(bookid, resolvedChapterNumber);

  // "!book || !chapter" : checks if either returned "null".
  // "notFound()" : It renders your "404 page".
  if (!book || !chapter) {
    notFound();
  }

  // Unique normalized words in this chapter — lets the client derive the
  // per-book word view and progress stats without re-tokenizing.
  const chapterWords = await getChapterVocabulary(bookid, resolvedChapterNumber);

  // Last-used reader mode, from the request cookie. Because the cookie
  // travels with every request, the server can render the correct view
  // directly — no flash of the default view on reload / chapter navigation.
  const cookieStore = await cookies();
  const initialMode = parseMode(cookieStore.get(READER_MODE_COOKIE)?.value);

  return (
    <ReaderShell
      book={book}
      chapter={chapter}
      chapterWords={chapterWords}
      initialMode={initialMode}
    />
  );
}