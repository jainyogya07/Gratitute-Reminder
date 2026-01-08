// src/StreakBadge.tsx

import React from "react";

interface StreakBadgeProps {
  streak: number;
}

// Badge visuals by streak tiers
const streakLevels = [
  { days: 3, color: "#23efac", label: "Starter", emoji: "🌱", message: "3-day streak! Keep going!" },
  { days: 7, color: "#b5ef23", label: "Growth", emoji: "🌿", message: "7 days—forming a habit!" },
  { days: 14, color: "#2391ef", label: "Momentum", emoji: "🌲", message: "14 days strong! Impressive progress!" },
  { days: 30, color: "#f9873a", label: "Champion", emoji: "🏆", message: "30 days! You’re unstoppable!" }
];

function getBadge(streak: number) {
  // Largest reward for which streak >= days
  let badge = streakLevels[0];
  for (const level of streakLevels) {
    if (streak >= level.days) badge = level;
  }
  return badge;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak }) => {
  if (streak < 3) return null; // No badge until 3-day streak
  const badge = getBadge(streak);
  return (
    <div className="pulse" style={{
      background: badge.color,
      color: "#fff",
      borderRadius: 14,
      padding: "14px 0",
      textAlign: "center",
      fontWeight: 600,
      margin: "22px 0 6px",
      boxShadow: "0 2px 8px rgba(33,33,33,0.14)",
      fontSize: 20,
      letterSpacing: "0.5px"
    }}>
      <span style={{
        fontSize: 28,
        marginRight: 10,
        verticalAlign: "middle"
      }}>{badge.emoji}</span>
      {badge.message} <span style={{ fontSize: 15, marginLeft: 12 }}>{badge.label}</span>
    </div>
  );
};

export default StreakBadge;
