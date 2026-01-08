// src/LanguageLearningMode.tsx

import React, { useState } from "react";

interface LanguageLearningModeProps {
  entries: { date: string; text: string; }[];
}

const translations = {
  hi: (text: string) => `[translate:${text}]`, // Mark source language phrases in Hindi script or others as needed
  es: (text: string) => `"[translate:${text}]"`, // Example for Spanish, wrapping whole text with translate tags
};

type LanguageCode = 'hi' | 'es';

export const LanguageLearningMode: React.FC<LanguageLearningModeProps> = ({ entries }) => {
  const [language, setLanguage] = useState<LanguageCode>('hi');

  function translateText(text: string): string {
    if (language === 'hi') return translations.hi(text);
    if (language === 'es') return translations.es(text);
    return text;
  }

  return (
    <div style={{
      maxWidth: 480,
      margin: "28px auto",
      padding: 20,
      backgroundColor: "#f7f9fc",
      borderRadius: 18,
      boxShadow: "0 1px 15px rgba(0,0,0,0.06)",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        <label htmlFor="language-select" style={{ marginRight: 8, fontWeight: 600, color: "#2778b2" }}>
          Select Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={e => setLanguage(e.target.value as LanguageCode)}
          style={{ padding: "6px 12px", borderRadius: 7, borderColor: "#618ebb" }}
        >
          <option value="hi">[translate:हिन्दी]</option>
          <option value="es">Español</option>
        </select>
      </div>
      <ul style={{ listStyle: "none", padding: 0, color: "#333", fontSize: 16 }}>
        {entries.map((e, idx) => (
          <li key={idx} style={{ background: "#e9f3ff", marginBottom: 10, borderRadius: 10, padding: "14px 16px" }}>
            <div>{e.date}</div>
            <div style={{ marginTop: 6, fontWeight: 600, color: "#235f9b" }}>
              {translateText(e.text)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageLearningMode;
