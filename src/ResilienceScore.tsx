// src/ResilienceScore.tsx

import React from "react";
import type { GratitudeEntry } from "./App";
import { analyzeSentiment } from "./SentimentUtils";

// Resilience is calculated using streak length, frequency of positive/negative entries,
// and improvement trend. All logic is local and privacy-preserving.

interface ResilienceScoreProps {
  entries: GratitudeEntry[];
}

function calculateResilience(entries: GratitudeEntry[]): { score: number; tier: string; message: string } {
  if (entries.length === 0) {
    return { score: 0, tier: "None", message: "Start your gratitude journey for a resilience boost!" };
  }
  // Last 14 days
  const recent = entries.slice(0, 14);
  const positives = recent.filter(e => analyzeSentiment(e.text).score === 1).length;
  const negatives = recent.filter(e => analyzeSentiment(e.text).score === -1).length;
  const total = recent.length;
  const streak = calcStreak(recent);

  // Score formula (normalized to max 100)
  const score =
    Math.round(
      streak * 3 + positives * 2 +
      (positives - negatives) +
      (positives > negatives ? 6 : 0) +
      Math.min(total, 14)
    );
  let tier = "Growing";
  let message = "Your resilience is building — keep logging daily gratitude!";
  if (score > 60) {
    tier = "Strong";
    message = "Impressive! Your gratitude practice helps you thrive under stress.";
  } else if (score > 35) {
    tier = "Steady";
    message = "Well done! You’re growing more resilient each day.";
  } else if (score < 15) {
    tier = "Just Starting";
    message = "A few positive days go a long way. Your journey begins!";
  }
  return { score: Math.min(score, 100), tier, message };
}

// Calculate streak for recent days
function calcStreak(entries: GratitudeEntry[]): number {
  let streak = 0;
  if (entries.length === 0) return 0;
  let date = entries[0].date;
  const entryDates = entries.map(e => e.date);
  while (entryDates.includes(date)) {
    streak += 1;
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 1);
    date = prev.toISOString().slice(0, 10);
  }
  return streak;
}

export const ResilienceScore: React.FC<ResilienceScoreProps> = ({ entries }) => {
  const stats = calculateResilience(entries);

  return (
    <div style={{
      background: "#ecf6e7",
      borderRadius: 14,
      padding: "20px 0 8px",
      textAlign: "center",
      margin: "22px 0 8px",
      fontWeight: 600,
      boxShadow: "0 2px 10px rgba(72,116,25,0.11)"
    }}>
      <div style={{
        fontSize: 34,
        color: "#55b031",
        fontWeight: 700
      }}>
        {stats.score}
        <span style={{
          fontSize: 20,
          marginLeft: 8
        }}>/100</span>
      </div>
      <div style={{
        color: "#265312",
        fontSize: 17,
        marginTop: 4
      }}>
        {stats.tier}
      </div>
      <div style={{
        color: "#428342",
        fontSize: 15,
        marginTop: 8
      }}>
        {stats.message}
      </div>
    </div>
  );
};

export default ResilienceScore;
