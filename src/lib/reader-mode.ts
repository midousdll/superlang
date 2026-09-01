/** The two reader views. Lives in lib so both the server page (SSR) and
 *  the client shell share one definition. ReaderNavBar re-exports it. */
export type ReaderMode = "translation" | "words";

/** Cookie that remembers the last-used reader mode. A cookie (not
 *  localStorage) because it must be readable by the SERVER during SSR —
 *  localStorage is browser-only, so the server would always paint the
 *  default view and the user's mode would only appear after hydration
 *  (a visible flash on every reload / chapter navigation). */
export const READER_MODE_COOKIE = "superlang.reader.mode";

/** Old localStorage key — migrated to the cookie once, then removed. */
const LEGACY_MODE_STORAGE_KEY = "superlang.reader.mode";

/** Only the two real modes are valid — anything else falls back to default. */
export function isValidMode(value: string | null | undefined): value is ReaderMode {
  return value === "translation" || value === "words";
}

/** Validate a raw stored value, falling back to the default mode. */
export function parseMode(value: string | null | undefined): ReaderMode {
  return isValidMode(value) ? value : "translation";
}

/** Read the mode from document.cookie (client only). */
export function readModeFromCookie(): ReaderMode {
  try {
    const entry = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${READER_MODE_COOKIE}=`));
    return parseMode(entry ? entry.split("=")[1] : null);
  } catch {
    return "translation";
  }
}

/** Write the mode cookie (client only). Sent with every request afterwards,
 *  so the server renders the right view on reload and chapter navigation. */
export function writeModeCookie(mode: ReaderMode): void {
  try {
    document.cookie = `${READER_MODE_COOKIE}=${mode}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    // no-op — persistence is best-effort only.
  }
}

/** One-time migration from the old localStorage preference. Returns the
 *  migrated mode when the cookie changed (caller should notify subscribers),
 *  or `null` when there was nothing to migrate. */
export function migrateLegacyMode(): ReaderMode | null {
  try {
    if (document.cookie.includes(`${READER_MODE_COOKIE}=`)) {
      // Cookie already in charge — just drop the legacy key if present.
      localStorage.removeItem(LEGACY_MODE_STORAGE_KEY);
      return null;
    }
    const legacy = localStorage.getItem(LEGACY_MODE_STORAGE_KEY);
    localStorage.removeItem(LEGACY_MODE_STORAGE_KEY);
    if (isValidMode(legacy)) {
      writeModeCookie(legacy);
      return legacy;
    }
    return null;
  } catch {
    return null;
  }
}