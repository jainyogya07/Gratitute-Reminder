// src/CulturalQuotes.tsx

import React, { useState, useEffect } from "react";

interface Quote {
  text: string;
  author: string;
  languageTag?: string; // e.g. 'hi', 'jp', 'ar'
  sourceLanguagePhrase?: string; // actual phrase in native script for highlighting
}

const quotes: Quote[] = [
  {
    text: "Gratitude turns what we have into enough.",
    author: "Anonymous",
  },
  {
    text: "[translate:धन्यवाद से जीवन सुंदर बन जाता है]",
    author: "[translate:अज्ञात]",
    languageTag: "hi",
    sourceLanguagePhrase: "धन्यवाद से जीवन सुंदर बन जाता है"
  },
  {
    text: "[translate:感謝は心の鍵です]",
    author: "不詳",
    languageTag: "jp",
    sourceLanguagePhrase: "感謝は心の鍵です"
  },
  {
    text: "[translate:الشكر يفتح القلوب]",
    author: "[translate:مجهول]",
    languageTag: "ar",
    sourceLanguagePhrase: "الشكر يفتح القلوب"
  }
];

export const CulturalQuotes: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const quote = quotes[index];

  return (
    <div style={{
      maxWidth: 460,
      margin: "28px auto",
      padding: 24,
      backgroundColor: "#f5f8fd",
      borderRadius: 20,
      boxShadow: "0 2px 20px rgba(56,122,183,0.15)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#1a4071",
      textAlign: "center",
      fontSize: 17,
      fontWeight: 600,
      lineHeight: 1.5
    }}>
      <div>
        {quote.languageTag && quote.sourceLanguagePhrase ? (
          <span>[translate:{quote.sourceLanguagePhrase}]</span>
        ) : (
          quote.text
        )}
      </div>
      <div style={{ marginTop: 14, fontSize: 15, fontWeight: 400, color: "#507ba2" }}>
        — {quote.author}
      </div>
    </div>
  );
};

export default CulturalQuotes;
