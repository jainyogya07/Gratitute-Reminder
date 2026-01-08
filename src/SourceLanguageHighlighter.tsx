// src/SourceLanguageHighlighter.tsx

import React from "react";

interface HighlighterProps {
  text: string;
  nativePhrases: string[]; // array of whole native-script phrases to highlight
}

/**
 * This component wraps whole contiguous native-script phrases found in `text`
 * with [translate:...] tags. It leaves other text unchanged.
 * It never splits phrases and respects your highlight accuracy needs.
 */
export const SourceLanguageHighlighter: React.FC<HighlighterProps> = ({ text, nativePhrases }) => {
  if (nativePhrases.length === 0) return <>{text}</>;

  // Escape regex special chars in phrases for safe regex
  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Build regex pattern to match any whole phrase
  const pattern = nativePhrases.map(escapeRegExp).join('|');
  const regex = new RegExp(`(${pattern})`, 'g');

  // Replace matches by wrapping with [translate:...]
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const { index } = match;
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }
    parts.push(`[translate:${match[0]}]`);
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>)}</>;
};

export default SourceLanguageHighlighter;
