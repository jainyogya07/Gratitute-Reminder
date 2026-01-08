// src/ReflectionSummary.tsx

import React from "react";
import type { GratitudeEntry } from "./App";
import { analyzeSentiment } from "./SentimentUtils";

interface ReflectionSummaryProps {
  entries: GratitudeEntry[];
}

function extractThemes(entries: GratitudeEntry[]) {
  // Simple keyword frequency extraction for demo
  const keywords: Record<string, number> = {};
  entries.forEach(e => {
    const words = e.text.toLowerCase().match(/\b\w{4,}\b/g) || [];
    words.forEach(word => {
      keywords[word] = (keywords[word] || 0) + 1;
    });
  });
  const sorted = Object.entries(keywords).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 5).map(([word]) => word);
}

export const ReflectionSummary: React.FC<ReflectionSummaryProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div style={{
        fontSize: 15,
        padding: 22,
        maxWidth: 360,
        margin: "28px auto",
        borderRadius: 17,
        background: "#f0f0f7",
        textAlign: "center",
        color: "#767093"
      }}>
        No reflections yet. Start your gratitude journey today!
      </div>
    );
  }

  const commonThemes = extractThemes(entries);
  const sentiments = entries.map(e => analyzeSentiment(e.text).score as number);
  const avgSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;

  return (
    <div style={{
      maxWidth: 370,
      margin: "28px auto",
      padding: 22,
      background: "#e3f3ff",
      borderRadius: 21,
      boxShadow: "0 2px 16px rgba(35,145,239,0.1)",
      fontFamily: "'Inter', sans-serif",
      color: "#2370c6"
    }}>
      <h3 style={{ fontWeight: 700, marginBottom: 18, color: "#1a4d8f" }}>
        Reflection Summary
      </h3>
      <div style={{ marginBottom: 14, fontWeight: 600 }}>
        Common Themes:
      </div>
      <ul style={{ marginLeft: 20, marginBottom: 22, fontSize: 15 }}>
        {commonThemes.map((theme, idx) => (
          <li key={idx} style={{ marginBottom: 7 }}>
            {theme}
          </li>
        ))}
      </ul>
      <div style={{ fontWeight: 600, fontSize: 15 }}>
        Average Mood:{" "}
        {avgSentiment > 0.4
          ? "😊 Positive"
          : avgSentiment > 0
          ? "🙂 Slightly Positive"
          : avgSentiment === 0
          ? "😐 Neutral"
          : "😞 Reflective"}
      </div>
    </div>
  );
};

export default ReflectionSummary;
