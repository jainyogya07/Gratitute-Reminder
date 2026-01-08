// src/AffirmationBanner.tsx

import React, { useEffect, useState } from "react";

// Science-backed daily affirmations for well-being
const affirmations = [
  "You are making progress—every entry counts!",
  "Your efforts matter, even if today feels small.",
  "By reflecting on gratitude, you’re building resilience.",
  "Tough days are temporary—growth is lasting.",
  "You deserve compassion as much as anyone.",
  "Small habits add up to meaningful change.",
  "Patience and persistence make you stronger.",
  "You are creating a positive ripple in your world.",
  "It’s okay to rest—recovery is part of victory.",
  "Each day is a new opportunity to be kind to yourself."
];

const initialAffirmationIdx = Math.floor(Math.random() * affirmations.length);

export const AffirmationBanner: React.FC = () => {
  const [idx, setIdx] = useState(initialAffirmationIdx);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % affirmations.length);
    }, 15000); // Change every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: "100%",
      padding: "13px 0",
      background: "linear-gradient(90deg,#23efac 33%,#2391ef 96%)",
      color: "#fff",
      textAlign: "center",
      fontWeight: 600,
      fontSize: 17,
      letterSpacing: ".2px",
      boxShadow: "0 2px 8px rgba(35,225,172,0.07)"
    }}>
      {affirmations[idx]}
    </div>
  );
};

export default AffirmationBanner;
