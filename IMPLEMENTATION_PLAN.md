# Implementation Plan — Two-Layout Reader (Translation | Words)

## Goal
Split the reader into two self-contained layouts. Original text always visible; right side toggles (translation ↔ saved words). Each layout owns its design + interaction, no mode logic inside components.

## Target structure
```
ReaderShell  →  mode === "translation" ? <TranslationLayout> : <WordsLayout>
├─ TranslationLayout = <SourceColumn variant="sentence"> + translation column (50/50)
└─ WordsLayout       = <SourceColumn variant="word"> + <WordsList> (2/3 + 1/3)
```
Only shared piece: `SourceColumn` (written once, used by both layout variants).

## Steps

- [x] **1. `src/lib/text.ts`** — pure word tokenizer (`splitIntoTokens(sentenceId, text)`).
  - Splits text into `WordToken[]` (`{ id, text, isWord }`), keeps `l'été`, `porte-clés` intact, punctuation/whitespace = `isWord:false`.

- [x] **2. `src/components/reader/SourceColumn.tsx`** — shared original text (takes a single `paragraph`).
  - Props: `paragraph`, `sourceLanguage?`, `variant: "sentence" | "word"`, `activeSentenceId?`, `onSentenceHover?`.
  - Sentence variant: sentence spans + hover highlight (as today).
  - Word variant: tokenize sentences, render each word as hoverable span; punctuation inert. No clicks yet (Step 2).

- [x] **3. Refactor `ReaderCanvas.tsx` → `TranslationLayout.tsx`** (old file deleted).
  - Removed all `mode`/`isWordsMode` logic.
  - Always `md:grid-cols-2` (equal halves). Left = `SourceColumn variant="sentence"`, right = translation column (unchanged logic: `pickTranslation`, "No translation" msg, hover sync, RTL).

- [x] **4. `src/components/reader/WordsLayout.tsx`** — words screen.
  - Props: `paragraphs`, `sourceLanguage?`, `bookId`.
  - Grid `lg:grid-cols-3`: left `lg:col-span-2` = `SourceColumn variant="word"` per paragraph, right `lg:col-span-1` = `<WordsList bookId>`. Stacks on small screens.

- [x] **5. `ReaderShell.tsx`** (renamed from `ReaderClient.tsx`) — main area simplified.
  - Removed conditional grid wrapper + `col-span` divs.
  - `{mode === "translation" ? <TranslationLayout .../> : <WordsLayout .../>}`.
  - Imports updated (`ReaderCanvas` → `TranslationLayout`, `WordsLayout`).

- [ ] **6. Unchanged**: `ReaderNavBar`, `ReaderFooter`, `WordsList` (demo data).

## Behavior matrix
| | Translation mode | Words mode |
|---|---|---|
| Left | source text (sentences) | source text (words) |
| Right | translation, aligned | saved words list |
| Split | equal 50/50 | 2/3 + 1/3 |
| Interaction | hover sync both sides | (Step 2: click word → popup) |

## Trade-offs (accepted)
- Scroll resets on mode switch (fix later if needed).
- Tokenizer is simple (regex); refine when dictionary arrives (Step 2).

## Verification
- [ ] `npx tsc --noEmit` clean
- [ ] Translation mode identical to today (50/50, hover sync)
- [ ] Words mode: text split into words (2/3), list at 1/3
- [ ] Toggle back/forth, no console errors; narrow screen stacks

## Out of scope (Step 2)
Word popup + translation, demo dictionary, lift WordsList state to ReaderShell, word normalization.