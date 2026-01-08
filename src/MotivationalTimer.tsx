// src/MotivationalTimer.tsx

import React, { useState, useEffect, useRef } from "react";

const messages = [
  "Take a deep breath and appreciate the moment.",
  "A quick break can boost your focus—try it now!",
  "Remember: small daily gratitude grows big happiness.",
  "Stretch, smile, and log your gratitude today.",
  "Mindfulness is a muscle—train it with gratitude.",
  "Pause, breathe, and renew your energy.",
  "Well-being grows with every positive reflection.",
  "You’re doing great—keep the momentum!",
  "Reset your mind with a moment of calm.",
  "Embrace the moment and cherish progress."
];

export const MotivationalTimer: React.FC<{ durationMinutes?: number }> = ({ durationMinutes = 25 }) => {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [messageIndex, setMessageIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current!);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(tl => tl - 1);
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [timeLeft]);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex(i => (i + 1) % messages.length);
    }, 15000);
    return () => clearInterval(msgInterval);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  function formatTime(num: number) {
    return num.toString().padStart(2, "0");
  }

  return (
    <div style={{
      background: "#daf1ff",
      borderRadius: 18,
      padding: "20px 26px",
      maxWidth: 360,
      margin: "28px auto",
      boxShadow: "0 3px 22px rgba(48,118,180,0.14)",
      fontFamily: "Inter, Arial, sans-serif",
      textAlign: "center",
      color: "#1373ca",
      fontWeight: 600,
      userSelect: "none"
    }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>
        {formatTime(mins)}:{formatTime(secs)}
      </div>
      <div style={{ fontSize: 16, fontWeight: 500 }}>
        {messages[messageIndex]}
      </div>
    </div>
  );
};

export default MotivationalTimer;
