import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { createClient } from "@supabase/supabase-js";

// Load .env.local file explicitly
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface RawSegment {
  fr: string;
  en?: string;
  ar?: string;
}

async function runIngestion() {
  const files = [
    "petit-renard-ch1.json",
    "petit-renard-ch2.json",
    "petit-renard-ch3.json",
  ];

  for (const fileName of files) {
    const filePath = path.join(process.cwd(), "src", "scripts", "data", fileName);

    if (!fs.existsSync(filePath)) {
      console.warn(`File not found, skipping: ${filePath}`);
      continue;
    }

    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    console.log(`Ingesting ${data.chapter.title}...`);


    // 1. Prepare Book Payload with Required Schema Fields
    const rawBookData = { ...data.book };

    // Remove columns not present in Supabase 'books' schema
    delete (rawBookData as Record<string, unknown>).cover_image_url;
    delete (rawBookData as Record<string, unknown>).target_language;

    const bookData = {
      ...rawBookData,
      source_language: rawBookData.source_language || "fr",
    };

    const { error: bookError } = await supabase.from("books").upsert(bookData);
    if (bookError) throw new Error(`Book insert error: ${bookError.message}`);

    // 2. Upsert Chapter Record
    const { data: chapter, error: chapterError } = await supabase
      .from("chapters")
      .upsert(
        {
          book_id: data.book.id,
          chapter_number: data.chapter.chapter_number,
          title: data.chapter.title,
        },
        { onConflict: "book_id,chapter_number" }
      )
      .select("id")
      .single();

    if (chapterError || !chapter) {
      throw new Error(`Chapter insert error: ${chapterError?.message}`);
    }

    // 3. Map and Insert Segments
    const segmentRows = data.segments.map((seg: RawSegment, index: number) => ({
      chapter_id: chapter.id,
      segment_order: index + 1,
      original_text: seg.fr,
      translation_fr: seg.fr,
      translation_ar: seg.ar,
    }));

    await supabase.from("segments").delete().eq("chapter_id", chapter.id);

    const { error: segError } = await supabase
      .from("segments")
      .insert(segmentRows);

    if (segError) throw new Error(`Segments insert error: ${segError.message}`);

    console.log(`✓ Ingested ${segmentRows.length} segments for ${data.chapter.title}`);
  }
}

runIngestion().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});