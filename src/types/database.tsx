export interface Book {
  id: string; // e.g., 'little-prince'
  title: string;
  author: string;
  source_language: string; // e.g., 'en'
  level: string; // e.g., 'Intermediate'
  cover_url?: string;
  description?: string;
  created_at?: string;
}

export interface Chapter {
  id: string; // UUID string
  book_id: string;
  chapter_number: number;
  title: string;
  word_count: number;
}

export interface Segment {
  id: string; // UUID string
  chapter_id: string;
  segment_order: number;
  original_text: string;
  translation_fr?: string;
  translation_ar?: string;
}