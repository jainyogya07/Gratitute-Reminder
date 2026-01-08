// src/UsageStats.tsx

import React, { useMemo, useState } from "react";
import type { GratitudeEntry } from "./App";
import { safeLocalStorage } from "./utils/storage";

interface UsageStatsProps {
  entries: GratitudeEntry[];
}

export const UsageStats: React.FC<UsageStatsProps> = ({ entries }) => {
  // Increase session count once (derived during initial render)
  const initialSessions = (() => {
    const prev = parseInt(safeLocalStorage.getItem("session-count") || "0", 10);
    const next = prev + 1;
    safeLocalStorage.setItem("session-count", next.toString());
    return next;
  })();
  const [sessions] = useState(initialSessions);

  const avgDaily = useMemo(() => {
    const today = new Date();
    const dayCounts: Record<string, number> = {};
    entries.forEach(e => (dayCounts[e.date] = (dayCounts[e.date] || 0) + 1));
    let totalEntries = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      totalEntries += dayCounts[key] || 0;
    }
    return totalEntries / 7;
  }, [entries]);

  const timeSpent = useMemo(() => Math.round(entries.length * 1.5), [entries]);

  return (
    <div style={{
      background: "#e0f1f7",
      borderRadius: 17,
      padding: "18px 14px",
      maxWidth: 390,
      margin: "28px auto 20px",
      boxShadow: "0 2px 14px rgba(33,85,143,0.1)",
      fontFamily: "Inter, Arial, sans-serif",
      color: "#1b2d4a",
      fontWeight: 600,
      textAlign: "center"
    }}>
      <h3 style={{ marginBottom: 18, color: "#2380e7" }}>
        App Usage Stats
      </h3>
      <p>Sessions opened: <b>{sessions}</b></p>
      <p>Avg entries daily (last 7 days): <b>{avgDaily.toFixed(2)}</b></p>
      <p>Time spent (minutes): <b>{timeSpent}</b></p>
    </div>
  );
};

export default UsageStats;
