// src/AccessibilityPanel.tsx

import React, { useState, useEffect } from "react";

export const AccessibilityPanel: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(17);
  const [dyslexiaFont, setDyslexiaFont] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    document.body.style.fontFamily = dyslexiaFont
      ? "'OpenDyslexic', Arial, sans-serif"
      : "Inter, Arial, sans-serif";
    document.body.style.filter = highContrast ? "contrast(1.3)" : "none";
    document.body.style.backgroundColor = highContrast ? "#111" : "";
    document.body.style.color = highContrast ? "#fff" : "";
  }, [fontSize, dyslexiaFont, highContrast]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 26,
        right: 26,
        background: "#e4f5ff",
        borderRadius: 24,
        padding: "18px 16px",
        boxShadow: "0 6px 24px rgba(50,130,205,0.11)",
        zIndex: 200,
        maxWidth: 260,
        fontSize: 16,
        color: "#147868",
        fontFamily: "Inter, Arial, sans-serif",
        textAlign: "left",
      }}
    >
      <h4 style={{ marginTop: 0, marginBottom: 13, color: "#1976d2", fontWeight: 600 }}>
        Accessibility
      </h4>
      <div style={{ marginBottom: 14 }}>
        <label>
          <span style={{ marginRight: 6 }}>Font Size:</span>
          <input
            type="range"
            min={14}
            max={24}
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
          />
          <span style={{ marginLeft: 8 }}>{fontSize}px</span>
        </label>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label>
          <input
            type="checkbox"
            checked={dyslexiaFont}
            onChange={e => setDyslexiaFont(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Dyslexia-Friendly Font
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={e => setHighContrast(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          High-Contrast Mode
        </label>
      </div>
    </div>
  );
};

export default AccessibilityPanel;
