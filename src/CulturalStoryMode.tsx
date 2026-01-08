// src/CulturalStoryMode.tsx

import React, { useState, useEffect } from "react";

interface Story {
  title: string;
  content: string;
  sourceLanguageText?: string;
}

const stories: Story[] = [
  {
    title: "Indian Proverb",
    content: "[translate:विनती से बढ़कर कोई भेंट नहीं होती]",
    sourceLanguageText: "विनती से बढ़कर कोई भेंट नहीं होती"
  },
  {
    title: "Japanese Saying",
    content: "[translate:七転び八起き (Nanakorobi yaoki)] – Fall seven times, stand up eight.",
    sourceLanguageText: "七転び八起き"
  },
  {
    title: "Arabic Wisdom",
    content: "[translate:الصبر مفتاح الفرج] – Patience is the key to relief.",
    sourceLanguageText: "الصبر مفتاح الفرج"
  },
  {
    title: "English Quote",
    content: "Gratitude is the fairest blossom which springs from the soul."
  }
];

export const CulturalStoryMode: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % stories.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const story = stories[index];

  return (
    <div style={{
      maxWidth: 480,
      margin: "30px auto",
      backgroundColor: "#fbfaf7",
      padding: "24px 28px",
      borderRadius: 24,
      boxShadow: "0 4px 26px rgba(45,51,74,0.12)",
      fontFamily: "'Georgia', serif",
      color: "#41403e",
      textAlign: "center",
      fontSize: 18,
      lineHeight: 1.5,
      userSelect: "none"
    }}>
      <h2 style={{ marginBottom: 14, fontWeight: 700, color: "#7d5b42" }}>
        {story.title}
      </h2>
      <blockquote style={{
        fontStyle: "italic",
        color: "#5c503d",
        fontSize: 20
      }}>
        {story.content}
      </blockquote>
      {story.sourceLanguageText && (
        <div style={{ marginTop: 18, fontSize: 24, color: "#a67c39" }}>
          [translate:{story.sourceLanguageText}]
        </div>
      )}
    </div>
  );
};

export default CulturalStoryMode;
