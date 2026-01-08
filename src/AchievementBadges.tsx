// src/AchievementBadges.tsx

import React from "react";
import type { GratitudeEntry } from "./App";
import { analyzeSentiment } from "./SentimentUtils";

interface AchievementBadgesProps {
  entries: GratitudeEntry[];
  exported?: boolean; // flag: has user exported their log?
}

function checkAchievements(entries: GratitudeEntry[], exported?: boolean): {
  firstEntry: boolean;
  weekStreak: boolean;
  positiveTrend: boolean;
  exportedBadge: boolean;
} {
  const firstEntry = entries.length >= 1;
  const today = new Date();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d.toISOString().slice(0, 10);
  });
  const weekStreak = weekDates.every(date =>
    entries.some(e => e.date === date)
  );
  const lastFive = entries.slice(0, 5);
  const positiveTrend = lastFive.length > 0 &&
    lastFive.every(e => analyzeSentiment(e.text).score >= 0);

  return {
    firstEntry,
    weekStreak,
    positiveTrend,
    exportedBadge: !!exported,
  };
}

export const AchievementBadges: React.FC<AchievementBadgesProps> = ({ entries, exported }) => {
  const badges = checkAchievements(entries, exported);
  return (
    <div style={{
      margin: "17px 0 25px",
      background: "#f7fcf6",
      borderRadius: 21,
      boxShadow: "0 2px 11px rgba(67,206,162,0.10)",
      padding: "19px 11px",
      display: "flex",
      flexWrap: "wrap",
      gap: "14px"
    }}>
      {badges.firstEntry && (
        <Badge emoji="🎉" label="First Gratitude Logged!" color="#23efac" />
      )}
      {badges.weekStreak && (
        <Badge emoji="🏅" label="7-Day Streak!" color="#2391ef" />
      )}
      {badges.positiveTrend && (
        <Badge emoji="🌞" label="Positive Mood Trend" color="#ffd700" />
      )}
      {badges.exportedBadge && (
        <Badge emoji="📤" label="Log Exported" color="#b09aff" />
      )}
      {!badges.firstEntry && (
        <Badge emoji="📝" label="Log the first gratitude to unlock badges!" color="#eedc82" />
      )}
    </div>
  );
};

// Internal visual badge renderer
function Badge({ emoji, label, color }: { emoji: string; label: string; color: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: color,
      borderRadius: 13,
      color: "#fff",
      fontWeight: 600,
      fontSize: 15,
      padding: "7px 16px"
    }}>
      <span style={{ fontSize: 22, marginRight: 9 }}>{emoji}</span>
      {label}
    </div>
  );
}

export default AchievementBadges;
