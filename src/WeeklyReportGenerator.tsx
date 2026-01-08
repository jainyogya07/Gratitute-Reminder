// src/WeeklyReportGenerator.tsx

import React from "react";
import type { GratitudeEntry } from "./App";
import { analyzeSentiment } from "./SentimentUtils";

interface WeeklyReportGeneratorProps {
  entries: GratitudeEntry[];
}

function getPastWeekEntries(entries: GratitudeEntry[]): GratitudeEntry[] {
  // Get last 7 days; assumes entries are sorted newest first
  const today = new Date();
  const dateStrings = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d.toISOString().slice(0, 10);
  });
  return entries.filter(e => dateStrings.includes(e.date));
}

function countStreak(entries: GratitudeEntry[]): number {
  // For past week only
  let streak = 0;
  const dateStrings = getPastWeekEntries(entries).map(e => e.date);
  const date = new Date();
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date();
    checkDate.setDate(date.getDate() - i);
    const str = checkDate.toISOString().slice(0, 10);
    if (dateStrings.includes(str)) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

function avgMood(entries: GratitudeEntry[]): string {
  if (entries.length === 0) return "N/A";
  const scores = entries.map(e => analyzeSentiment(e.text).score as number);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  if (avg > 0.35) return "😊 Upbeat";
  if (avg > -0.15) return "😐 Mixed";
  return "😞 Challenging";
}

export const WeeklyReportGenerator: React.FC<WeeklyReportGeneratorProps> = ({ entries }) => {
  const weekEntries = getPastWeekEntries(entries);
  const streak = countStreak(entries);
  const mood = avgMood(weekEntries);

  return (
    <div style={{
      background: "#f3ffe7",
      borderRadius: 18,
      padding: "22px 16px",
      minWidth: 290,
      maxWidth: 390,
      margin: "24px auto 18px",
      boxShadow: "0 3px 17px rgba(32,149,42,0.10)",
      fontFamily: "Inter, Arial, sans-serif",
    }}>
      <h3 style={{
        color: "#23786a",
        fontWeight: 700,
        marginBottom: 14,
        textAlign: "center"
      }}>
        Your Weekly Gratitude Report
      </h3>
      <div style={{
        fontWeight: 600,
        fontSize: 15,
        color: "#2391ef",
        marginBottom: 11
      }}>
        Entries: {weekEntries.length} &nbsp; | &nbsp; Streak: {streak} &nbsp; | &nbsp; Avg Mood: {mood}
      </div>
      <ul style={{ fontSize: 15, color: "#178399", marginBottom: 14 }}>
        {weekEntries.length === 0 && (
          <li>No gratitude entries logged this week. Start today for progress!</li>
        )}
        {weekEntries.map(e => (
          <li key={e.date} style={{ marginBottom: 7 }}>
            <span style={{ color: "#6ba8a0", marginRight: 10 }}>{e.date}</span>
            <span style={{ color: "#23ad69", fontWeight: 500 }}>{e.text}</span>
          </li>
        ))}
      </ul>
      <div style={{
        color: "#265312",
        fontSize: 15,
        marginTop: 7,
        textAlign: "center"
      }}>
        {streak > 5
          ? "Fantastic dedication—your streak is growing!"
          : streak > 2
          ? "Great start—keep the momentum going!"
          : "Every day counts—you're building resilience!"}
      </div>
    </div>
  );
};

export default WeeklyReportGenerator;
