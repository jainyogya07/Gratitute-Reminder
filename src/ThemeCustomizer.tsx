// src/ThemeCustomizer.tsx

import React, { useState, useEffect } from "react";

const accentColors = [
  { name: "Teal", value: "#23efac" },
  { name: "Blue", value: "#2391ef" },
  { name: "Purple", value: "#7b2ff2" },
  { name: "Orange", value: "#f9873a" },
];

const backgrounds = [
  { name: "Light", value: "#f5fcff" },
  { name: "Gray", value: "#ededed" },
  { name: "Dark", value: "#172530" },
];

const fonts = [
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
];

export const ThemeCustomizer: React.FC = () => {
  const [accent, setAccent] = useState(accentColors[0].value);
  const [background, setBackground] = useState(backgrounds[0].value);
  const [font, setFont] = useState(fonts[0].value);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", accent);
    document.body.style.backgroundColor = background;
    document.body.style.fontFamily = font;
  }, [accent, background, font]);

  return (
    <div style={{
      background: "#f0f5fb",
      borderRadius: 18,
      padding: 22,
      maxWidth: 400,
      margin: "25px auto",
      boxShadow: "0 2px 18px rgba(35,50,130,0.1)",
      fontFamily: font,
    }}>
      <h3 style={{ color: "#2391ef", fontWeight: 700, marginBottom: 15 }}>
        Customize Your Theme
      </h3>

      <label style={{ marginBottom: 14, display: "block" }}>
        Accent Color:
        <select
          value={accent}
          onChange={e => setAccent(e.target.value)}
          style={{ marginLeft: 8, padding: 6, borderRadius: 8 }}
        >
          {accentColors.map(color => (
            <option key={color.value} value={color.value}>
              {color.name}
            </option>
          ))}
        </select>
      </label>

      <label style={{ marginBottom: 14, display: "block" }}>
        Background:
        <select
          value={background}
          onChange={e => setBackground(e.target.value)}
          style={{ marginLeft: 8, padding: 6, borderRadius: 8 }}
        >
          {backgrounds.map(bg => (
            <option key={bg.value} value={bg.value}>
              {bg.name}
            </option>
          ))}
        </select>
      </label>

      <label style={{ marginBottom: 14, display: "block" }}>
        Font Style:
        <select
          value={font}
          onChange={e => setFont(e.target.value)}
          style={{ marginLeft: 8, padding: 6, borderRadius: 8 }}
        >
          {fonts.map(f => (
            <option key={f.value} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default ThemeCustomizer;
