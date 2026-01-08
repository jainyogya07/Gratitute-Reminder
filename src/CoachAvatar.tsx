// src/CoachAvatar.tsx

import React, { useMemo } from "react";
import type { GratitudeEntry } from "./App";
import { analyzeSentiment } from "./SentimentUtils";

interface CoachAvatarProps {
  entries: GratitudeEntry[];
}

const avatarSprites = [
  { src: "/coach-smile.png", alt: "Coach Smiling" },
  { src: "/coach-encourage.png", alt: "Coach Encouraging" },
  { src: "/coach-cheer.png", alt: "Coach Cheering" },
];

function getCoachMessage(entries: GratitudeEntry[]) {
  if (entries.length === 0)
    return { sprite: 0, msg: "Ready to start your gratitude journey? I'm here to support you every step!" };

  const streak = calcStreak(entries);
  const lastMood = entries[0] ? analyzeSentiment(entries[0].text).score : 0;

  if (streak >= 7 && lastMood > 0)
    return { sprite: 2, msg: "Amazing! 7+ day streak, positive mood—you're a gratitude champion!" };

  if (lastMood < 0)
    return { sprite: 1, msg: "Every day brings its ups and downs. Reflect deeper—I'm cheering you on!" };

  if (streak > 0)
    return { sprite: 0, msg: `Current streak: ${streak} days. Small steps build big habits!` };

  return { sprite: 0, msg: "Log today's gratitude to begin your streak." };
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

export const CoachAvatar: React.FC<CoachAvatarProps> = ({ entries }) => {
  const state = useMemo(() => getCoachMessage(entries), [entries]);

  return (
    <div style={{
      background: "#eeebff",
      borderRadius: 19,
      padding: "16px 16px",
      minWidth: 230,
      maxWidth: 340,
      margin: "0 auto 18px",
      boxShadow: "0 2px 11px rgba(132,104,255,0.10)",
      display: "flex",
      alignItems: "center"
    }}>
      <img
        src={avatarSprites[state.sprite].src}
        alt={avatarSprites[state.sprite].alt}
        style={{
          width: 55,
          height: 55,
          marginRight: 18,
          borderRadius: "50%",
          border: "2px solid #c5b9f5",
          boxShadow: "0 2px 7px rgba(132,104,255,0.09)"
        }}
      />
      <div style={{ fontSize: 15, fontWeight: 600, color: "#594fc8", lineHeight: 1.45 }}>
        {state.msg}
      </div>
    </div>
  );
};

export default CoachAvatar;
