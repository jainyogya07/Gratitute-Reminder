// src/SentimentUtils.ts

/**
 * Simple sentiment analysis utility for client-side use.
 * Returns a sentiment score (-1 = negative, 0 = neutral, +1 = positive)
 * and a feedback message (string) based on detected mood.
 */

export type SentimentScore = -1 | 0 | 1;

interface SentimentResult {
  score: SentimentScore;
  feedback: string;
}

// Basic word banks for pattern matching
const positiveWords = [
  "happy", "grateful", "thankful", "excited", "joy", "love", "support", "amazing", "peace", "great",
  "proud", "good", "cheerful", "healthy"
];
const negativeWords = [
  "sad", "angry", "tired", "stress", "worried", "anxious", "upset", "hard", "bad",
  "hate", "sick", "hurt", "depressed", "lonely"
];

// Helper to clean and normalize text
function normalizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

// Main sentiment function
export function analyzeSentiment(entry: string): SentimentResult {
  const words = normalizeText(entry);
  let score: SentimentScore = 0;

  const positives = words.filter(w => positiveWords.includes(w)).length;
  const negatives = words.filter(w => negativeWords.includes(w)).length;

  if (positives > negatives) score = 1;
  else if (negatives > positives) score = -1;

  let feedback = "";
  if (score === 1) feedback = "Awesome! Keep focusing on your strengths.";
  else if (score === 0) feedback = "Thanks for sharing—reflect deeper for positive highlights.";
  else if (score === -1) feedback = "Tough day? Remember, gratitude can help shift perspective.";

  // Extra encouragement for streaks
  if (score === 1 && positives >= 2) {
    feedback += " Your positive energy is contagious!";
  }
  if (score === -1 && negatives >= 2) {
    feedback += " Try a short break or breathing exercise.";
  }

  return { score, feedback };
}

/**
 * Example usage in App.tsx:
 * import { analyzeSentiment } from "./SentimentUtils";
 * const result = analyzeSentiment(latestEntry.text);
 * result.feedback  // show on UI!
 */
