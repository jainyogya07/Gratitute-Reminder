// src/DashboardSummary.tsx

import React from "react";
import type { GratitudeEntry } from "./App";
import { analyzeSentiment } from "./SentimentUtils";
import { ResilienceScore } from "./ResilienceScore";

interface DashboardSummaryProps {
  entries: GratitudeEntry[];
}

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

function calcAvgSentiment(entries: GratitudeEntry[]): string {
  if (entries.length === 0) return "N/A";
  const scores = entries.map(e => analyzeSentiment(e.text).score as number);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  if (avg > 0.35) return "😊 Positive";
  if (avg > -0.25) return "😐 Neutral";
  return "😞 Negative";
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({ entries }) => {
  const total = entries.length;
  const streak = calcStreak(entries);
  const avgSentiment = calcAvgSentiment(entries);

  return (
    <div style={{
      background: "#eafee3",
      borderRadius: 20,
      padding: "22px 18px",
      maxWidth: 415,
      margin: "24px auto 10px",
      boxShadow: "0 3px 17px rgba(32,110,26,0.10)",
      fontFamily: "Inter, Arial, sans-serif",
      textAlign: "left"
    }}>
      <h3 style={{
        color: "#2391ef",
        fontWeight: 700,
        marginBottom: 15,
        textAlign: "center"
      }}>
        Dashboard Summary
      </h3>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 19,
        fontWeight: 600,
        fontSize: 17,
        color: "#23786a"
      }}>
        <div>
          <span style={{ color: "#287548", fontSize: 19 }}>📝</span> Entries: {total}
        </div>
        <div>
          <span style={{ color: "#f9873a", fontSize: 19 }}>🔥</span> Streak: {streak}
        </div>
        <div>
          <span style={{ color: "#2391ef", fontSize: 19 }}>🙂</span> Avg Mood: {avgSentiment}
        </div>
      </div>
      <div>
        <ResilienceScore entries={entries} />
      </div>
    </div>
  );
};

export default DashboardSummary;
