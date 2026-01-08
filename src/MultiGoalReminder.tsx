// src/MultiGoalReminder.tsx

import React, { useState, useEffect } from "react";
import { safeLocalStorage } from "./utils/storage";

// Simple goal definition for hackathon MVP
type Goal = { key: string; label: string; done: boolean };
const defaultGoals: Goal[] = [
  { key: "gratitude", label: "Log gratitude entry", done: false },
  { key: "studyBreak", label: "Take a study break", done: false },
  { key: "drinkWater", label: "Drink water 3 times", done: false },
  { key: "move", label: "Stand and stretch", done: false }
];

interface MultiGoalReminderProps {
  today?: string;
}

// Utility for today's date moved above usage
function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export const MultiGoalReminder: React.FC<MultiGoalReminderProps> = ({ today }) => {
  const [goals, setGoals] = useState<Goal[]>(() =>
    (JSON.parse(safeLocalStorage.getItem("goals-" + (today || getToday())) || "null") as Goal[])
    || defaultGoals
  );

  // Save goals daily
  useEffect(() => {
    safeLocalStorage.setItem("goals-" + (today || getToday()), JSON.stringify(goals));
  }, [goals, today]);

  function toggleGoal(idx: number) {
    setGoals(prev =>
      prev.map((g, i) =>
        i === idx ? { ...g, done: !g.done } : g
      )
    );
  }

  function resetGoals() {
    setGoals(defaultGoals);
  }

  // (getToday defined above)

  return (
    <div style={{
      background: "#fff8e6",
      borderRadius: 18,
      padding: "18px 14px",
      margin: "21px 0 16px",
      boxShadow: "0 1px 9px rgba(249,186,67,0.13)",
      maxWidth: 390,
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <h4 style={{ marginTop: 0, marginBottom: 10, color: "#ff9800", fontWeight: 700 }}>
        Today's Wellness Goals
      </h4>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {goals.map((goal, idx) => (
          <li key={goal.key} style={{
            background: goal.done ? "#23efac" : "#ffd950",
            color: goal.done ? "#fff" : "#7f5c18",
            borderRadius: 11,
            fontWeight: 600,
            fontSize: 15,
            padding: "10px 14px",
            marginBottom: 8,
            cursor: "pointer",
            boxShadow: goal.done ? "0 1px 6px rgba(35,225,172,0.07)" : undefined,
            transition: "background 0.2s"
          }}
            onClick={() => toggleGoal(idx)}
          >
            {goal.done ? "✓ " : ""}
            {goal.label}
          </li>
        ))}
      </ul>
      <button
        onClick={resetGoals}
        style={{
          background: "#ffd950",
          color: "#7f5c18",
          border: "none",
          borderRadius: 9,
          fontWeight: 600,
          padding: "7px 18px",
          marginTop: 8,
          cursor: "pointer",
          fontSize: 14
        }}
      >
        Reset Today's Goals
      </button>
    </div>
  );
};

export default MultiGoalReminder;
