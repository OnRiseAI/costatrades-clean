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

  for (const town of towns) {
    const normalizedTown = normalizeForMatch(town);

    if (normalizedQuery.includes(normalizedTown)) {
      location = town;
      break;
    }
  }

  return { tradeSlug, location };
};
