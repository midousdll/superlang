import fs from "fs";
import path from "path";
import { splitIntoTokens } from "@/lib/text";
import { normalizeWord } from "@/lib/vocabulary";

export interface BookMetadata {
  id: string;
  title: string;
  titleTranslation?: Record<string, string>;
  author: string;
  sourceLanguage: string;
  targetLanguages: string[];
  totalChapters: number;
  description?: string;
  level?: string;
}

export interface Sentence {
  id: string;
  original: string;
  translations: Record<string, string>;
}

export interface Paragraph {
  id: string;
  sentences: Sentence[];
}

export interface ChapterData {
  chapterNumber: number;
  title: string;
  titleTranslation?: Record<string, string>;
  paragraphs: Paragraph[];
}

const BOOKS_DIR = path.join(process.cwd(), "src/books");

export async function getAllBooks(): Promise<BookMetadata[]> {
  if (!fs.existsSync(BOOKS_DIR)) return [];

  const folderNames = fs.readdirSync(BOOKS_DIR);

  return folderNames
    .map((folder) => {
      const metadataPath = path.join(BOOKS_DIR, folder, "metadata.json");
      if (fs.existsSync(metadataPath)) {
        const fileContent = fs.readFileSync(metadataPath, "utf-8");
        return JSON.parse(fileContent) as BookMetadata;
      }
      return null;
    })
    .filter((book): book is BookMetadata => book !== null);
}

export async function getBookMetadata(bookId: string): Promise<BookMetadata | null> {
  const metadataPath = path.join(BOOKS_DIR, bookId, "metadata.json");
  if (!fs.existsSync(metadataPath)) return null;

  const fileContent = fs.readFileSync(metadataPath, "utf-8");
  const data = JSON.parse(fileContent);

  return {
    ...data,
    totalChapters: data.totalChapters ?? 1,
  };
}

export async function getChapterData(
  bookId: string,
  chapterNumber: number = 1
): Promise<ChapterData | null> {
  const chapterPath = path.join(BOOKS_DIR, bookId, `chapter-${chapterNumber}.json`);
  if (!fs.existsSync(chapterPath)) return null;

  const fileContent = fs.readFileSync(chapterPath, "utf-8");
  const data = JSON.parse(fileContent);

  return {
    ...data,
    chapterNumber: data.chapterNumber ?? chapterNumber,
  };
}

/**
 * The normalized, deduped vocabulary of a chapter — every unique word
 * that appears in it.
 *
 * Uses the SAME tokenizer as the reader UI (splitIntoTokens), so a word
 * clicked in the text always matches an entry here. Computed per request
 * on the server; cheap for current book sizes. If books ever grow into
 * real novels, this is the function to swap for a build-time precompute.
 */
export async function getChapterVocabulary(
  bookId: string,
  chapterNumber: number = 1
): Promise<string[]> {
  const chapter = await getChapterData(bookId, chapterNumber);
  if (!chapter) return [];

  const words = new Set<string>();
  for (const paragraph of chapter.paragraphs) {
    for (const sentence of paragraph.sentences) {
      for (const token of splitIntoTokens(sentence.id, sentence.original)) {
        if (token.isWord) words.add(normalizeWord(token.text));
      }
    }
  }

  // Sorted for deterministic output (stable React keys, testable snapshots).
  return Array.from(words).sort();
}