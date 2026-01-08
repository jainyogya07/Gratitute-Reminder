// src/AdminPanel.tsx

import React, { useState } from "react";
import type { GratitudeEntry } from "./App";
import { analyzeSentiment } from "./SentimentUtils";
import generateDemoEntries from "./utils/demoData";
import { safeLocalStorage } from "./utils/storage";

interface AdminPanelProps {
  entries: GratitudeEntry[];
}

function getSentimentStats(entries: GratitudeEntry[]) {
  const stats = { positive: 0, neutral: 0, negative: 0 };
  entries.forEach(e => {
    const score = analyzeSentiment(e.text).score;
    if (score === 1) stats.positive += 1;
    else if (score === 0) stats.neutral += 1;
    else if (score === -1) stats.negative += 1;
  });
  return stats;
}

type FeedbackLog = { date?: string; mood?: string; text?: string };

function getFeedbackStats() {
  const logs = (JSON.parse(safeLocalStorage.getItem("feedback-log") || "[]") as FeedbackLog[]);
  return logs.length;
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

export const AdminPanel: React.FC<AdminPanelProps> = ({ entries }) => {
  const totalEntries = entries.length;
  const streak = calcStreak(entries);
  const feedbackCount = getFeedbackStats();
  const moodStats = getSentimentStats(entries);

  const [showDetails, setShowDetails] = useState(false);

  function loadDemo() {
    const demo = generateDemoEntries(14);
    safeLocalStorage.setItem('gratitude-log', JSON.stringify(demo));
    // reload so App picks up the demo entries synchronously
    window.location.reload();
  }

  return (
    <div style={{
      background: "#efebfb",
      borderRadius: 24,
      boxShadow: "0 2px 22px rgba(102,89,205,0.09)",
      padding: "33px 21px",
      maxWidth: 470,
      margin: "30px auto"
    }}>
      <h3 style={{
        color: "#3926cd",
        fontWeight: 700,
        marginBottom: 15,
        textAlign: "center"
      }}>
        Admin & Stats Panel
      </h3>
      <div style={{
        fontWeight: 600,
        fontSize: 17,
        color: "#2391ef",
        marginBottom: 15,
        display: "flex",
        flexWrap: "wrap",
        gap: "19px"
      }}>
        <div>📝 Gratitude Entries: {totalEntries}</div>
        <div>🔥 Current Streak: {streak}</div>
        <div>💬 Feedback Logged: {feedbackCount}</div>
      </div>
      <div style={{
        background: "#f4f7ff",
        borderRadius: 12,
        padding: "12px 10px",
        marginBottom: 11,
        color: "#3926cd",
        fontSize: 15
      }}>
        <b>Mood Stats:</b>
        <div>😊 Positive: {moodStats.positive}</div>
        <div>😐 Neutral: {moodStats.neutral}</div>
        <div>😞 Negative: {moodStats.negative}</div>
      </div>
      <button
        onClick={() => setShowDetails(!showDetails)}
        style={{
          marginTop: 13,
          background: "#3926cd",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          borderRadius: 9,
          padding: "9px 28px",
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <button
          onClick={loadDemo}
          style={{
            marginTop: 13,
            background: '#23efac',
            color: '#06364b',
            fontWeight: 700,
            border: 'none',
            borderRadius: 9,
            padding: '9px 28px',
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          Load 14-day Demo Data
        </button>
      </div>
      {showDetails && (
        <div style={{
          background: "#ede3f7",
          borderRadius: 12,
          padding: "12px 9px",
          color: "#6349a3",
          marginTop: 12,
          fontSize: 14
        }}>
          <div>
            <b>All Feedback (local):</b>
            <ul style={{ marginTop: 4 }}>
              {((JSON.parse(safeLocalStorage.getItem("feedback-log") || "[]") as FeedbackLog[]))
                .map((f: FeedbackLog, i: number) => (
                  <li key={i} style={{ marginBottom: 7 }}>
                    [{f.date?.slice(0, 10) || "??"}] {f.mood}: {f.text}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
