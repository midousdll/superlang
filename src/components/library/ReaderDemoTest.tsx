"use client"

import { useState, useRef, useEffect } from "react"
import { Check, BookmarkPlus, X } from "lucide-react"

type Target = "en" | "fr" | "ar"

type Entry = { en: string; fr: string; ar: string }

// Public-domain text: Aesop, "The North Wind and the Sun"
const SOURCE =
  "The North Wind and the Sun disputed which was the stronger . Suddenly they saw a traveler coming down the road , wrapped in a warm cloak ."

const DICT: Record<string, Entry> = {
  north: { en: "toward the cold pole", fr: "nord", ar: "شمال" },
  wind: { en: "moving air", fr: "vent", ar: "ريح" },
  sun: { en: "the star that lights our day", fr: "soleil", ar: "شمس" },
  disputed: { en: "argued about", fr: "se disputaient", ar: "تنازعت" },
  stronger: { en: "more powerful", fr: "plus fort", ar: "الأقوى" },
  suddenly: { en: "all at once", fr: "soudain", ar: "فجأة" },
  saw: { en: "noticed with the eyes", fr: "virent", ar: "رأى" },
  traveler: { en: "a person on a journey", fr: "voyageur", ar: "مسافر" },
  coming: { en: "moving toward", fr: "venant", ar: "قادم" },
  road: { en: "a path for travel", fr: "route", ar: "طريق" },
  wrapped: { en: "covered around", fr: "enveloppé", ar: "ملتف" },
  warm: { en: "gently hot", fr: "chaud", ar: "دافئ" },
  cloak: { en: "a loose outer garment", fr: "manteau", ar: "عباءة" },
}

const TRANSLATION: Record<Target, string> = {
  en: SOURCE.replace(/\s+([.,])/g, "$1"),
  fr: "La Bise et le Soleil se disputaient, chacun assurant qu'il était le plus fort. Soudain, ils virent un voyageur qui s'avançait sur la route, enveloppé dans un manteau bien chaud.",
  ar: "تنازعت الريح الشمالية والشمس أيّهما الأقوى. وفجأةً رأيا مسافرًا يسير على الطريق، ملتفًّا في عباءةٍ دافئة.",
}

const TARGET_LABEL: Record<Target, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
}

export function ReaderDemo() {
  const [target, setTarget] = useState<Target>("fr")
  const [active, setActive] = useState<number | null>(null)
  const [known, setKnown] = useState<Set<string>>(new Set())
  const [toLearn, setToLearn] = useState<Set<string>>(new Set(["cloak"]))
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setActive(null)
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  const tokens = SOURCE.split(" ")

  function wordKey(raw: string) {
    return raw.replace(/[.,]/g, "").toLowerCase()
  }

  function toggle(setFn: React.Dispatch<React.SetStateAction<Set<string>>>, other: React.Dispatch<React.SetStateAction<Set<string>>>, key: string) {
    setFn((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
    // ensure a word only lives in one list
    other((prev) => {
      if (!prev.has(key)) return prev
      const next = new Set(prev)
      next.delete(key)
      return next
    })
  }

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-2xl border border-border bg-test-color px-60 items-center shadow-[0_20px_40px_-24px_rgba(60,50,30,0.35)]"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/50 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
          <p className="font-serif text-sm font-medium tracking-tight">
            The North Wind &amp; the Sun
          </p>
          <span className="rounded-full bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
            English
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-background p-1" role="group" aria-label="Translate to">
          <span className="px-2 text-[11px] text-muted-foreground">Translate to</span>
          {(["en", "fr", "ar"] as Target[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTarget(t)}
              aria-pressed={target === t}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                target === t
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-side */}
      <div className="grid gap-px bg-border sm:grid-cols-2">
        {/* Source */}
        <div className="relative bg-card p-5 sm:p-6">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Original
          </p>
          <p className="font-serif text-lg leading-relaxed sm:text-xl">
            {tokens.map((raw, i) => {
              const key = wordKey(raw)
              const known_ = known.has(key)
              const learn_ = toLearn.has(key)
              const clickable = Boolean(DICT[key])
              if (!clickable) {
                return (
                  <span key={i} className="text-foreground/90">
                    {raw}{" "}
                  </span>
                )
              }
              return (
                <span key={i} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(active === i ? null : i)}
                    className={`rounded px-0.5 underline decoration-2 underline-offset-4 transition-colors hover:bg-accent ${
                      known_
                        ? "decoration-primary text-foreground"
                        : learn_
                          ? "decoration-highlight text-foreground"
                          : "decoration-border text-foreground/90"
                    }`}
                  >
                    {raw}
                  </button>{" "}
                  {active === i && (
                    <WordPopover
                      word={raw.replace(/[.,]/g, "")}
                      entry={DICT[key]}
                      target={target}
                      isKnown={known_}
                      isLearn={learn_}
                      onKnown={() => {
                        toggle(setKnown, setToLearn, key)
                        setActive(null)
                      }}
                      onLearn={() => {
                        toggle(setToLearn, setKnown, key)
                        setActive(null)
                      }}
                      onClose={() => setActive(null)}
                    />
                  )}
                </span>
              )
            })}
          </p>
        </div>

        {/* Translation */}
        <div className="bg-card p-5 sm:p-6" dir={target === "ar" ? "rtl" : "ltr"}>
          <p
            className={`mb-3 text-[11px] font-medium text-muted-foreground ${
              target === "ar"
                ? "font-arabic text-right text-sm"
                : "uppercase tracking-widest"
            }`}
          >
            {TARGET_LABEL[target]}
          </p>
          <p
            className={`leading-relaxed text-foreground/90 ${
              target === "ar" ? "font-arabic text-xl" : "font-serif text-lg sm:text-xl"
            }`}
          >
            {TRANSLATION[target]}
          </p>
        </div>
      </div>

      {/* Vocab footer */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border bg-secondary/40 px-4 py-3 text-sm sm:px-5">
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
          Known
          <span className="font-medium text-foreground">{known.size}</span>
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-highlight" aria-hidden />
          To learn
          <span className="font-medium text-foreground">{toLearn.size}</span>
        </span>
        <span className="ml-auto text-xs text-muted-foreground">Tap an underlined word</span>
      </div>
    </div>
  )
}

function WordPopover({
  word,
  entry,
  target,
  isKnown,
  isLearn,
  onKnown,
  onLearn,
  onClose,
}: {
  word: string
  entry: Entry
  target: Target
  isKnown: boolean
  isLearn: boolean
  onKnown: () => void
  onLearn: () => void
  onClose: () => void
}) {
  return (
    <span
      className="absolute left-1/2 top-full z-20 mt-2 block w-60 -translate-x-1/2 rounded-xl border border-border bg-popover p-3 text-left shadow-[0_16px_32px_-16px_rgba(60,50,30,0.5)]"
      role="dialog"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="font-serif text-base font-medium text-popover-foreground">{word}</span>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </span>
      <span
        className={`mt-1 block text-sm text-muted-foreground ${
          target === "ar" ? "font-arabic text-right text-base" : ""
        }`}
        dir={target === "ar" ? "rtl" : "ltr"}
      >
        {entry[target]}
      </span>
      <span className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onKnown}
          className={`inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
            isKnown
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          <Check className="h-3.5 w-3.5" />
          Known
        </button>
        <button
          type="button"
          onClick={onLearn}
          className={`inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
            isLearn
              ? "bg-highlight text-highlight-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          <BookmarkPlus className="h-3.5 w-3.5" />
          To learn
        </button>
      </span>
    </span>
  )
}
