// src/utils/highlightNativePhrases.ts

/**
 * Highlights native-script phrases in a text by wrapping each whole, contiguous block with [translate:...].
 * - Does not split phrases.
 * - Skips transliterated or phonetic spellings.
 * - Inserts tags inside markdown constructs, not wrapping around them.
 *
 * @param text The full input text to highlight within.
 * @param nativePhrases Array of contiguous native-script phrases (exact matches).
 * @returns The text with all native-script phrases wrapped with [translate:...].
 */
export function highlightNativePhrases(text: string, nativePhrases: string[]): string {
  if (nativePhrases.length === 0) return text;

  // Escape regex special chars in phrases
  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Sort phrases by length desc to match longest first and avoid overlapping partials
  const sortedPhrases = [...nativePhrases].sort((a, b) => b.length - a.length);
  const pattern = sortedPhrases.map(escapeRegex).join('|');

  const regex = new RegExp(pattern, 'g');

  // Replace each match with wrapped tag
  return text.replace(regex, match => `[translate:${match}]`);
}
