// src/AnimatedHelper.tsx

import React, { useEffect, useState } from "react";

const tips = [
  "🌻 Welcome! Logging gratitude daily builds positivity.",
  "💡 Tip: Try focusing on small wins as well as big ones.",
  "🌿 Remember, streaks motivate habit—but missing a day is OK!",
  "🎉 Share your best gratitude for a ripple effect in the community.",
  "🌙 Need support? Exam mode sends extra motivation!",
  "🚀 See your progress in the calendar and chart features.",
  "🎓 Science shows gratitude helps manage stress and boosts resilience.",
];

export const AnimatedHelper: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Auto-update tip every 14 seconds, loop through array
  useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx(idx => (idx + 1) % tips.length);
    }, 14000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 38,
      left: 40,
      zIndex: 201,
      background: "linear-gradient(99deg,#daf1ff 60%,#efffc4 99%)",
      borderRadius: 18,
      boxShadow: "0 5px 22px rgba(77,170,155,0.09)",
      minWidth: 260,
      maxWidth: 340,
      padding: "19px 18px",
      fontSize: 17,
      fontWeight: 500,
      color: "#178399",
      animation: "slideInHelper 0.8s cubic-bezier(.3,1.2,.4,.9)",
      transition: "opacity 0.3s",
      display: "flex",
      alignItems: "center",
    }}>
      <div style={{ flex: 1 }}>
        {tips[msgIdx]}
      </div>
      <button
        style={{
          marginLeft: 10,
          border: "none",
          background: "#23efac",
          color: "#fff",
          borderRadius: 9,
          fontSize: 14,
          fontWeight: 600,
          padding: "3px 10px",
          cursor: "pointer"
        }}
        onClick={() => setVisible(false)}
        aria-label="Dismiss helper"
      >
        ✕
      </button>
      <style>
        {`
        @keyframes slideInHelper {
          from {transform: translateY(28px); opacity: 0;}
          to {transform: translateY(0); opacity: 1;}
        }
        `}
      </style>
    </div>
  );
};

export default AnimatedHelper;
