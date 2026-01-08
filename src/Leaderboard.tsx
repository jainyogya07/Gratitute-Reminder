// src/Leaderboard.tsx

import React from "react";
import type { GratitudeEntry } from "./App";

interface LeaderboardProps {
  users: {
    id: string;
    name: string;
    entries: GratitudeEntry[];
  }[];
}

function calcStreak(entries: GratitudeEntry[]): number {
  let streak = 0;
  if (entries.length === 0) return 0;
  let date = entries[0].date;
  const dates = entries.map(e => e.date);
  while (dates.includes(date)) {
    streak++;
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 1);
    date = prev.toISOString().slice(0, 10);
  }
  return streak;
}

function resilienceScore(entries: GratitudeEntry[]): number {
  // Similar logic as previous resilience calculation
  return Math.min(entries.length * 5, 100);
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  // Sort descending by streak
  const sortedUsers = [...users].sort((a, b) => calcStreak(b.entries) - calcStreak(a.entries));

  return (
    <div style={{
      maxWidth: 460,
      background: "#fafafa",
      borderRadius: 18,
      padding: 22,
      margin: "26px auto",
      boxShadow: "0 3px 21px rgba(0,0,0,0.08)",
      fontFamily: "Inter, Arial, sans-serif",
      color: "#3a3a3a"
    }}>
      <h3 style={{ textAlign: "center", marginBottom: 15, color: "#2380e7" }}>
        Gratitude Leaderboard (Hackathon Demo)
      </h3>
      <ol style={{ paddingLeft: 18, fontSize: 15 }}>
  {sortedUsers.map((user) => (
          <li key={user.id} style={{ marginBottom: 12 }}>
            <strong>{user.name}</strong> – Streak: {calcStreak(user.entries)} days, Entries: {user.entries.length}, Score: {resilienceScore(user.entries)}
          </li>
        ))}
      </ol>
      {sortedUsers.length === 0 && (
        <p style={{ textAlign: "center", color: "#999" }}>
          No users yet. Invite friends to join your gratitude journey!
        </p>
      )}
    </div>
  );
};

export default Leaderboard;
