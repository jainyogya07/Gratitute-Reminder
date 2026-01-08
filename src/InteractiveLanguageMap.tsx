// src/InteractiveLanguageMap.tsx

import React, { useState } from "react";

interface Region {
  id: string;
  name: string;
  phrase: string;
  sourceLanguagePhrase: string;
  coords: { top: string; left: string };
}

const regions: Region[] = [
  {
    id: "india",
    name: "India",
    phrase: "[translate:धन्यवाद से जीवन सुंदर बन जाता है]",
    sourceLanguagePhrase: "धन्यवाद से जीवन सुंदर बन जाता है",
    coords: { top: "60%", left: "45%" }
  },
  {
    id: "japan",
    name: "Japan",
    phrase: "[translate:感謝は心の鍵です]",
    sourceLanguagePhrase: "感謝は心の鍵です",
    coords: { top: "45%", left: "70%" }
  },
  {
    id: "arab_world",
    name: "Arab World",
    phrase: "[translate:الشكر يفتح القلوب]",
    sourceLanguagePhrase: "الشكر يفتح القلوب",
    coords: { top: "58%", left: "32%" }
  }
];

export const InteractiveLanguageMap: React.FC = () => {
  const [active, setActive] = useState<Region | null>(null);

  return (
    <div style={{
      position: "relative",
      maxWidth: 740,
      margin: "30px auto",
      backgroundColor: "#eef5f9",
      borderRadius: 18,
      padding: "24px",
      fontFamily: "'Inter', sans-serif",
      color: "#263238",
      boxShadow: "0 3px 26px rgba(0,0,0,0.08)"
    }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
        alt="World Map"
        style={{ width: "100%", borderRadius: 14, userSelect: "none" }}
      />
      {regions.map(region => (
        <button
          key={region.id}
          onClick={() => setActive(region)}
          style={{
            position: "absolute",
            top: region.coords.top,
            left: region.coords.left,
            transform: "translate(-50%, -50%)",
            backgroundColor: active?.id === region.id ? "#2391ef" : "#56b2e8",
            border: "none",
            borderRadius: "50%",
            width: 18,
            height: 18,
            cursor: "pointer",
          }}
          aria-label={`Show phrase from ${region.name}`}
        />
      ))}
      {active && (
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#ffffffcc",
          padding: 18,
          borderRadius: 14,
          maxWidth: 320,
          boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          textAlign: "center"
        }}>
          <h4 style={{ marginBottom: 6 }}>{active.name}</h4>
          <p style={{ fontWeight: 600, fontSize: 16, color: "#0d47a1" }}>
            {active.phrase}
          </p>
          <div style={{ marginTop: 6, fontStyle: "italic", color: "#555" }}>
            [translate:{active.sourceLanguagePhrase}]
          </div>
          <button
            onClick={() => setActive(null)}
            style={{
              marginTop: 12,
              backgroundColor: "#2391ef",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "6px 18px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveLanguageMap;
