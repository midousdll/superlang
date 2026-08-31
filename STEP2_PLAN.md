# Step 2 Plan — Word Popup + Vocabulary (local)

## Corrected Goal
In **Words mode**, clicking any source word opens a popup with its **translation** (in the current target language) plus two save actions: **"Known"** and **"To Learn"**. No sentence context in the popup (user sees it in translation mode). Saved words appear in the right-hand **WordsList**, filterable by **All / Known / To Learn**, and persist across mode toggles and reloads via **localStorage** (browser-only; backend is a future home, the data shape stays compatible).

## Parts
- [x] **1. Data model** — `SavedWord` with `status: "known" | "to-learn"`; `normalizeWord`; `id = normalized word` (dedup by construction). Moved to `src/lib/vocabulary.ts`. `WordsList` now imports it; demo data carries `status`.

- [x] **2. Dictionary** — two language dictionaries (EN→FR/AR, FR→EN/AR), built word-by-word from chapter content.
  - `src/lib/dictionaries/types.ts` — `DictionaryEntry`, `DictionaryMap`.
  - `src/lib/dictionaries/fr.ts` — **~90 real words** from petit-renard ch. 1—3 (each `en` + `ar` where sensible, plus `note` field).
  - `src/lib/dictionaries/en.ts` — **empty scaffold** (fills when EN-source chapters are added).
  - `src/lib/dictionaries/index.ts` — `normalizeWord` + `getWordTranslation(word, sourceLang, targetLang)` unified lookup.

- [x] **3. WordsList upgrade** — controlled component with **All / Known / To Learn** filter tabs + status badge + remove.
  - `DEMO_SAVED_WORDS` moved to `src/lib/vocabulary.ts` (shared between WordsList and ReaderShell).
  - `WordsList` props: `words` + `onRemove` (controlled); local filter state (`all | known | to-learn`); filter tab bar styled like the navbar toggle; per-item status badge (green = known, amber = to-learn); header count "n of m"; per-filter empty states.
  - `WordsLayout` passes the props through (`words` + `onRemoveWord`; `bookId` removed).
  - `ReaderShell` owns the state (`useState(DEMO_SAVED_WORDS)` + `handleRemoveWord` via `useCallback`.) **Bonus:** Remove now survives mode toggles (state lives above the unmounting layout).

- [x] **4. Word popup** — clickable-word → popup UI with **Known / To Learn** save buttons (no context in popup).
  - `WordClickInfo` added to `src/lib/vocabulary.ts` (tokenId, word, sentenceId, sentenceText, x, y).
  - `SourceColumn` word variant: words now `cursor-pointer` + `onClick` → `onWordClick` (capturing position); `activeTokenId` → highlighted while popup open (sentence variant untouched).
  - NEW `WordPopup.tsx`: fixed card — word → translation (or "Not in dictionary yet." / "No translation selected."), Known / To Learn buttons (disabled when no translation; saved status shows "Saved ✓"), closes on Escape / outside click / scroll / ×.
  - `WordsLayout`: owns popup state (`activeWord`); resolves translation via `getWordTranslation`; passes `activeTokenId`/`onWordClick`; renders `<WordPopup>` at the end (onSave → `onSaveWord(info, status, translation)`).
  - `ReaderShell`: `handleSaveWord` — re-tags status in place if saved (no dupes); else appends (id = normalized word, translation ?? "—", contextSentence = sentenceText).

- [x] **5. Lift saved-words state to ReaderShell** — shared `savedWords` above both layouts, feeding the popup and the list.

- [x] **6. localStorage persistence** — save/restore vocabulary per book; scale-friendly design.
  - `loadSavedWords` / `saveSavedWords` / `clearSavedWords` helpers in `src/lib/vocabulary.ts` (validated parse — corrupt/old data never crashes; best-effort write).
  - `ReaderShell`: lazy `useState` init from storage (falls back to demo seed) + persistence `useEffect` (writes on mount too — demo seed becomes "real" after first visit; deleted demo words stay deleted).

- [x] **7. Final QA & polish** — comment cleanup + structural verification.
  - `ReaderShell.tsx` comments rewritten cleanly (mojibake removed, code unchanged); `STEP2_PLAN.md` encoding fixed.
  - `tsc --noEmit` exit 0; `git status` verified (rename ReaderClient→ReaderShell, new layouts/dictionaries/lib files, deleted ReaderCanvas — no debris).
  - Optional polish deferred (add on request): "Clear all" button in list header, sticky filter bar, popup flip-above positioning, fade-in animation.

## Part 1 — context decision (resolved)
Defaulted to **Option A**: `contextSentence?: string` stays optional in the model, captured at save time, shown **only in the list** (not the popup). Reversible anytime.

## Verification (final)
- [x] `npx tsc --noEmit` — exit 0 (whole project)
- [x] `git status` — expected files only (rename ReaderClient→ReaderShell, new layouts/dictionaries/lib files, deleted ReaderCanvas)
- [ ] Manual browser pass (user): click word → popup → save/re-tag → list filters → reload persistence → mode toggles → second book independent key