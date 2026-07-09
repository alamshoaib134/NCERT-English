import unitData from "@/data/unit1.json";

export interface DictionaryResult {
  word: string;
  meaning: string;
  source: "local" | "api" | "cache";
}

const CACHE_KEY = "poorvi_dict_cache";

function getCache(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setCache(word: string, meaning: string) {
  if (typeof window === "undefined") return;
  try {
    const cache = getCache();
    cache[word.toLowerCase()] = meaning;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage might be full, silently fail
  }
}

/**
 * Clean a word by stripping punctuation and converting to lowercase
 */
export function cleanWord(word: string): string {
  return word.replace(/[^a-zA-Z'-]/g, "").toLowerCase();
}

/**
 * Look up a word in the chapter's local dictionary (instant, offline)
 */
export function lookupLocal(
  word: string,
  chapterId: number = 1
): DictionaryResult | null {
  const cleaned = cleanWord(word);
  if (!cleaned) return null;

  const chapter = unitData.chapters.find((c) => c.chapterId === chapterId);
  if (!chapter) return null;

  const dict = chapter.localDictionary as Record<string, string>;

  // Direct match
  if (dict[cleaned]) {
    return { word: cleaned, meaning: dict[cleaned], source: "local" };
  }

  // Try without trailing 's' (simple plural handling)
  const singular = cleaned.endsWith("s") ? cleaned.slice(0, -1) : null;
  if (singular && dict[singular]) {
    return { word: cleaned, meaning: dict[singular], source: "local" };
  }

  // Try without trailing 'ed' (simple past tense)
  const base = cleaned.endsWith("ed") ? cleaned.slice(0, -2) : null;
  if (base && dict[base]) {
    return { word: cleaned, meaning: dict[base], source: "local" };
  }

  // Try without trailing 'ing'
  const gerund = cleaned.endsWith("ing") ? cleaned.slice(0, -3) : null;
  if (gerund && dict[gerund]) {
    return { word: cleaned, meaning: dict[gerund], source: "local" };
  }

  return null;
}

/**
 * Look up a word from the localStorage cache
 */
export function lookupCache(word: string): DictionaryResult | null {
  const cleaned = cleanWord(word);
  if (!cleaned) return null;

  const cache = getCache();
  if (cache[cleaned]) {
    return { word: cleaned, meaning: cache[cleaned], source: "cache" };
  }
  return null;
}

/**
 * Look up a word from the MyMemory Translation API (online fallback)
 */
export async function lookupRemote(
  word: string
): Promise<DictionaryResult | null> {
  const cleaned = cleanWord(word);
  if (!cleaned) return null;

  // Check cache first
  const cached = lookupCache(cleaned);
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleaned)}&langpair=en|hi`
    );
    const data = await res.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const meaning = data.responseData.translatedText;
      setCache(cleaned, meaning);
      return { word: cleaned, meaning, source: "api" };
    }
  } catch {
    // Network error — silently fail
  }

  return null;
}

/**
 * Combined lookup: tries local first, then cache, then API
 */
export async function lookupWord(
  word: string,
  chapterId: number = 1
): Promise<DictionaryResult | null> {
  const local = lookupLocal(word, chapterId);
  if (local) return local;

  const cached = lookupCache(word);
  if (cached) return cached;

  return lookupRemote(word);
}
