// src/DailyReflectionTimer.tsx

import React, { useState, useEffect, useRef } from "react";

const phases = [
  { label: "Prepare to Reflect", duration: 10 }, // seconds
  { label: "Write Your Gratitude", duration: 120 },
  { label: "Take a Deep Breath", duration: 30 },
  { label: "End Reflection", duration: 0 }
];

export const DailyReflectionTimer: React.FC = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].duration);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (phases[phaseIndex].duration === 0) {
      clearInterval(timerRef.current!);
      return;
    }
  // Set timeLeft asynchronously to avoid synchronous setState inside an effect
  setTimeout(() => setTimeLeft(phases[phaseIndex].duration), 0);
    timerRef.current = setInterval(() => {
      setTimeLeft(tl => {
        if (tl <= 1) {
          clearInterval(timerRef.current!);
          setPhaseIndex(idx => Math.min(idx + 1, phases.length - 1));
          return 0;
        }
        return tl - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phaseIndex]);

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m > 0 ? m + ":" : ""}${s.toString().padStart(2, "0")}`;
  }

  return (
    <div style={{
      maxWidth: 360,
      margin: "30px auto",
      padding: "22px 20px",
      background: "#dff2e1",
      borderRadius: 20,
      boxShadow: "0 3px 18px rgba(41,141,82,0.15)",
      fontFamily: "'Inter', Arial, sans-serif",
      color: "#2d5f32",
      textAlign: "center"
    }}>
      <h3 style={{ marginBottom: 16, fontWeight: 700 }}>
        {phases[phaseIndex].label}
      </h3>
      <div style={{ fontSize: 48, fontWeight: 600, letterSpacing: "1.5px" }}>
        {formatTime(timeLeft)}
      </div>
      {phaseIndex === phases.length - 1 && (
        <div style={{ marginTop: 18, fontSize: 16, fontWeight: 600, color: "#237a2e" }}>
          Reflection complete. Well done!
        </div>
      )}
    </div>
  );
};

export default DailyReflectionTimer;
