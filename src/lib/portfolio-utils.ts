const MOJIBAKE_REPLACEMENTS: Array<[string, string]> = [
  ["â€”", "-"],
  ["â€“", "-"],
  ["Â·", " / "],
  ["â†", "<-"],
  ["Ã—", "x"],
  ["Ã©", "e"],
  ["Â©", "(c)"],
];

export function sanitizePortfolioText(value: unknown): string {
  if (typeof value !== "string") return "";

  let sanitized = value.replace(/\u00a0/g, " ");

  for (const [search, replacement] of MOJIBAKE_REPLACEMENTS) {
    sanitized = sanitized.split(search).join(replacement);
  }

  return sanitized
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function portableTextToPlainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return sanitizePortfolioText(blocks);

  return sanitizePortfolioText(
    blocks
      .map((block: any) => {
        if (!block || !Array.isArray(block.children)) return "";
        return block.children
          .map((child: any) => (typeof child?.text === "string" ? child.text : ""))
          .join("");
      })
      .filter(Boolean)
      .join("\n\n"),
  );
}

export function excerptText(text: string, maxLength = 160): string {
  const clean = sanitizePortfolioText(text);
  if (!clean) return "";
  if (clean.length <= maxLength) return clean;

  const sliced = clean.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : maxLength).trim()}...`;
}

export function firstSentence(text: string): string {
  const clean = sanitizePortfolioText(text);
  if (!clean) return "";

  const match = clean.match(/^.*?[.!?](?:\s|$)/);
  return (match?.[0] || clean).trim();
}

export function buildProjectSummary(...sources: Array<string | undefined>): string {
  for (const source of sources) {
    const sentence = firstSentence(source || "");
    if (sentence) return excerptText(sentence, 150);
  }

  return "";
}

export function buildProjectHighlight(...sources: Array<string | undefined>): string {
  for (const source of sources) {
    const clean = sanitizePortfolioText(source || "");
    if (clean) return excerptText(clean, 120);
  }

  return "";
}

export function splitIntoHighlights(text: string, maxItems = 3): string[] {
  const clean = sanitizePortfolioText(text);
  if (!clean) return [];

  return clean
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, maxItems)
    .map((part) => excerptText(part, 88));
}
