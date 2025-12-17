export interface TradeCategoryLike {
  slug: string;
  name: string;
}

export interface ParsedSearchResult {
  tradeSlug: string | null;
  location: string | null;
}

const FILLER_PHRASES = ["i need", "looking for", "near me", "near", "in", "a"];

const normalizeForMatch = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const removeFillerPhrases = (text: string) => {
  let result = text.toLowerCase();

  FILLER_PHRASES.forEach((phrase) => {
    const pattern = new RegExp(`\\b${phrase.replace(/\s+/g, "\\s+")}\\b`, "gi");
    result = result.replace(pattern, " ");
  });

  return result.replace(/\s+/g, " ").trim();
};

export const extractTradeAndLocation = (
  input: string,
  categories: TradeCategoryLike[],
  towns: string[],
): ParsedSearchResult => {
  const cleaned = removeFillerPhrases(input);

  if (!cleaned) {
    return { tradeSlug: null, location: null };
  }

  const normalizedQuery = normalizeForMatch(cleaned);

  let tradeSlug: string | null = null;
  let location: string | null = null;

  for (const category of categories) {
    const normalizedCategoryName = normalizeForMatch(category.name);
    const normalizedCategorySlug = normalizeForMatch(category.slug);

    if (
      normalizedQuery.includes(normalizedCategoryName) ||
      normalizedQuery.includes(normalizedCategorySlug)
    ) {
      tradeSlug = category.slug;
      break;
    }
  }

  // First try exact match
  for (const town of towns) {
    const normalizedTown = normalizeForMatch(town);

    if (normalizedQuery.includes(normalizedTown)) {
      location = town;
      break;
    }
  }

  // If no exact match, try partial match (e.g., "benalmadena" matches "Benalmadena Costa")
  if (!location) {
    const queryWords = normalizedQuery.split(" ");
    for (const town of towns) {
      const normalizedTown = normalizeForMatch(town);
      const townFirstWord = normalizedTown.split(" ")[0];

      for (const word of queryWords) {
        // Match if query word starts with town's first word (min 4 chars)
        if (word.length >= 4 && townFirstWord.startsWith(word)) {
          location = town;
          break;
        }
        // Match if town's first word starts with query word (min 4 chars)
        if (word.length >= 4 && word.startsWith(townFirstWord.substring(0, 4))) {
          location = town;
          break;
        }
      }
      if (location) break;
    }
  }

  // If still no match, try fuzzy match for common misspellings (Levenshtein-like)
  if (!location) {
    const queryWords = normalizedQuery.split(" ");
    for (const town of towns) {
      const normalizedTown = normalizeForMatch(town);
      const townFirstWord = normalizedTown.split(" ")[0];

      for (const word of queryWords) {
        if (word.length >= 5 && townFirstWord.length >= 5) {
          // Simple fuzzy: check if most characters match (allowing 1-2 typos)
          const matches = countMatchingChars(word, townFirstWord);
          const similarity = matches / Math.max(word.length, townFirstWord.length);
          if (similarity >= 0.75) {
            location = town;
            break;
          }
        }
      }
      if (location) break;
    }
  }

  return { tradeSlug, location };
};

// Helper function for fuzzy matching
const countMatchingChars = (a: string, b: string): number => {
  let matches = 0;
  const shorter = a.length < b.length ? a : b;
  const longer = a.length >= b.length ? a : b;

  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) {
      matches++;
    }
  }
  return matches;
};
