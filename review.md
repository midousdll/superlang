# 🔍 Supalango MVP — Full Review

> **Reviewed:** September 3, 2026  
> **Version:** 0.1.0 (Milestone 1 — Local Prototype & Static Pages)

---

## 📦 Tech Stack Overview

- **Framework**: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
- **Data**: Static mock data (`src/data/books.ts`)
- **Storage**: `localStorage` for per-book vocabulary persistence

---

## ✅ What's Working Well

### Architecture & Code Quality

- 🟢 **Clean project structure** — `app/`, `components/`, `data/` separation is well organized for an MVP.
- 🟢 **Smart client/server split** — `RootLayoutClient` is a clever pattern to use `usePathname()` (a client hook) while keeping the root `layout.tsx` a server component.
- 🟢 **TypeScript is used correctly** — `Book` type is derived from the data array (`typeof MOCK_BOOKS[number]`), which avoids keeping types in sync manually.
- 🟢 **localStorage for vocab** — The lazy state initializer in `ReaderPage` (`useState(() => {...})`) is the correct SSR-safe pattern.
- 🟢 **Responsive Navbar** — Desktop layout + mobile hamburger drawer with close-on-navigate behavior.
- 🟢 **`/library` page filters** — Combined search + language tab filter with a proper empty state.

### UI / UX

- 🟢 **Hero** is visually strong — gradient headline, animated pill badge, two clear CTAs, and language indicators.
- 🟢 **`HowItWorks`** is the MVP's killer feature showcase — the interactive demo is genuinely impressive. Clicking words, saving them, seeing the word count update — this sells the product.
- 🟢 **Featured Book Banner** on the Library page is polished — gradient background, animated "Editor's Pick" pulse, responsive layout.
- 🟢 **Reader page UX** — Fixed header with chapter nav + progress bar, collapsible sidebar, text/bilingual mode toggle. Very thoughtfully designed.
- 🟢 **`VocabSidebar`** — Learning/Known grouping with hover-reveal remove button is a clean interaction.
- 🟢 **`BookCard`** — Color-coded level and language badges, line-clamp description, clean card layout.

---

## ⚠️ Issues & Improvements to Address

### 🔴 Critical / Blockers

1. **`WordPopup` translation is a stub**
   - `const translation = \`Translation of "${word}"\``
   - This is the app's core feature and it shows a literal placeholder string. For the MVP demo this breaks the illusion. You need to either integrate a free translation API (e.g. LibreTranslate, MyMemory) or add a hardcoded dictionary for the mock book content.

2. **"Bilingual" mode is unfinished**
   - `ReaderView.tsx` line 38: `[Translation would appear here for each word/phrase]`
   - The bilingual split view is the #1 feature in the landing page copy but is stubbed out. A user clicking "Bilingual" in the reader sees broken UI.

3. **`VocabSidebar` is `position: fixed` — overlaps the reader header**
   - The sidebar is `fixed right-0 top-0 bottom-0`, but the reader header is also `fixed`. They overlap. The sidebar starts at the very top of the viewport, behind the header. Needs `top-[57px]` (or the actual header height).

4. **`WordPopup` positioning can go off-screen**
   - The popup is placed at `{ left: x, top: y }` using `rect.left` and `rect.bottom`. On mobile or for words near the right edge, the popup clips outside the viewport. Needs boundary-aware placement (clamp max `x` to `window.innerWidth - popupWidth`).

---

### 🟡 Medium Priority

5. **`Le Petit Prince` content is in English, not French**
   - Book `fr1` serves English-language content (`"Once when I was six years old..."`). This is a credibility issue for a French learning app. The mock content should be the actual French source text.

6. **Mock books have only 3 "chapters" but metadata says more**
   - Each book's `content` array has 3 string items, but metadata says e.g. `chapters: 27` for Le Petit Prince. The reader shows `1/3` for a 27-chapter book — visually inconsistent with what's advertised.

7. **"Sign In" / "Get Started" buttons go to `href="#"`**
   - These are dead links. For an MVP demo these should route to a `/waitlist` or `/coming-soon` page rather than silently staying on the same page.

8. **Language (globe/EN) button in Navbar is non-functional**
   - The EN button has no `onClick` handler. It renders but does nothing. Even a placeholder dropdown would show intentionality.

9. **Theme toggle button is non-functional**
   - The moon icon button (both desktop and mobile) has no `onClick`. Dark mode works via `prefers-color-scheme`, but the button creates a false expectation of manual control.

10. **`ReaderView` tokenizer leaves empty whitespace tokens**
    - `text.split(/(\\s+|[.,!?;:'\"()])/g)` produces whitespace string tokens (e.g. `" "`). `filter(Boolean)` removes `""` but not `" "`, so whitespace tokens can sneak into the rendered output and cause inconsistent spacing.

11. **`VocabSidebar` receives `bookId` prop but never uses it**
    - The prop is declared in the interface but not referenced inside the component body. Should either be used (e.g., for a "Review flashcards for this book" link) or removed.

---

### 🟢 Minor / Polish

12. **`globals.css` overrides the Geist font with Arial**
    - Line 25: `font-family: Arial, Helvetica, sans-serif` in the `body` rule wins over the CSS variable `--font-geist-sans` set by Next.js font loading. Either delete that line or replace it with `font-family: var(--font-sans)`.

13. **`Footer.tsx` is nearly empty**
    - A single centered copyright line. For MVP it's acceptable, but it has no links to Privacy Policy, About, Contact, etc. which are expected by users and help with trust signals.

14. **`Features.tsx` uses array `index` as React key**
    - `key={index}` on a static list is harmless but not best practice. Using a stable string like `key={feature.title}` is better and avoids potential future warnings.

15. **Navbar hash anchor links don't work from `/library`**
    - "How It Works", "Demo", and "About" are `/#how-it-works` etc. Clicking from `/library` navigates correctly but there's no smooth-scroll behavior. Consider hiding these links when not on the home page, or using `scrollIntoView` logic.

16. **`VocabSidebar` has duplicated word-item markup**
    - The Learning and Known word lists render identical JSX. This should be extracted into a `VocabWordItem` sub-component to reduce duplication and make future changes easier.

17. **No `loading.tsx` or `error.tsx` added**
    - Next.js App Router supports route-level loading/error UI boundaries. Adding them (especially `error.tsx` for the reader page) would make the app feel more robust.

---

## 📊 Score by Category

| Category              | Score      | Notes                                                  |
| --------------------- | ---------- | ------------------------------------------------------ |
| Project Structure     | ⭐⭐⭐⭐⭐ | Clean, scalable, well-organized                        |
| Code Quality          | ⭐⭐⭐⭐   | Good patterns, a few minor issues                      |
| Landing Page UI       | ⭐⭐⭐⭐⭐ | Hero + Features + HowItWorks are excellent             |
| Library Page          | ⭐⭐⭐⭐   | Strong; featured banner and filters work well          |
| Reader Core Feature   | ⭐⭐⭐     | Good structure, but translation is a stub              |
| Mobile Responsiveness | ⭐⭐⭐⭐   | Mostly solid; popup edge-case issues on small screens  |
| MVP Completeness      | ⭐⭐⭐     | Visual shell is done; core reading loop isn't wired up |

---

## 🗺️ Recommended Next Steps (in priority order)

| Priority | Task                                                               | Effort   |
| -------- | ------------------------------------------------------------------ | -------- |
| 🔴 1     | Fix `globals.css` Arial font override                              | ~5 min   |
| 🔴 2     | Fix `VocabSidebar` top offset to clear fixed reader header         | ~5 min   |
| 🔴 3     | Add real or hardcoded translations to `WordPopup`                  | ~1–2 hrs |
| 🔴 4     | Fix `Le Petit Prince` mock content to actual French text           | ~30 min  |
| 🟡 5     | Implement bilingual view (sentence-level translation in mock data) | ~2 hrs   |
| 🟡 6     | Fix `WordPopup` off-screen clamping for edge words                 | ~30 min  |
| 🟡 7     | Add `/waitlist` or `/coming-soon` page for CTA buttons             | ~30 min  |
| 🟢 8     | Wire up theme toggle button                                        | ~1 hr    |
| 🟢 9     | Extract `VocabWordItem` sub-component from `VocabSidebar`          | ~20 min  |
| 🟢 10    | Add `loading.tsx` and `error.tsx` to reader route                  | ~20 min  |

---

## 💬 Overall Assessment

This is a **very strong MVP visual shell**. The architecture decisions are sound, the UI polish is above average for a first build, and the `HowItWorks` interactive demo is genuinely impressive — it communicates the product's value instantly. The component breakdown is clean and reusable.

The main gap is that the **core reading loop** (translation popup, bilingual view) is still stubbed out — which is the primary value proposition of the entire product. That's the single most important thing to focus on next.

With the critical fixes applied, this would be demo-ready. 🚀
