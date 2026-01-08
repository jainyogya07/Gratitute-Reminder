// src/QuoteRandomizer.tsx

import React, { useState } from "react";

const quotes = [
  "Gratitude turns what we have into enough. – Anonymous",
  "The struggle ends when gratitude begins. – Neale Donald Walsch",
  "Start each day with a grateful heart.",
  "Happiness is not having what you want, but wanting what you have. – Rabbi H. Schachtel",
  "Joy grows where gratitude flows.",
  "Take a moment to appreciate — it's the secret to resilience.",
  "When you can’t find sunshine, be grateful for rain. – Anonymous",
  "Expressing gratitude is scientifically proven to boost mood.",
  "Gratitude is the healthiest of all human emotions. – Zig Ziglar",
  "Your journey to positivity begins with a single thankful reflection.",
];

const initialQuoteIdx = Math.floor(Math.random() * quotes.length);

export const QuoteRandomizer: React.FC = () => {
  const [idx, setIdx] = useState<number>(initialQuoteIdx);

  function nextQuote() {
    setIdx(Math.floor(Math.random() * quotes.length));
  }

  return (
    <div style={{
      background: "#f7fbe7",
      borderRadius: 13,
      padding: "18px 14px",
      margin: "30px 0 18px",
      boxShadow: "0 2px 12px rgba(40,90,20,0.07)",
      maxWidth: 380,
      textAlign: "center"
    }}>
      <div style={{
        fontSize: 16,
        fontWeight: 500,
        color: "#287548",
        fontStyle: "italic",
        marginBottom: 10
      }}>
        “{quotes[idx]}”
      </div>
      <button
        onClick={nextQuote}
        style={{
          background: "#23efac",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
          padding: "7px 22px",
          cursor: "pointer",
          fontSize: 15
        }}>
        Shuffle Quote
      </button>
    </div>
  );
};

export default QuoteRandomizer;
