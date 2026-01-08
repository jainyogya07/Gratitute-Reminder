// src/SciencePopup.tsx

import React from "react";

interface SciencePopupProps {
  open: boolean;
  onClose: () => void;
}

export const SciencePopup: React.FC<SciencePopupProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      background: "rgba(96,28,112,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 18,
        maxWidth: 420,
        width: "92vw",
        padding: "34px 26px 22px",
        boxShadow: "0 8px 33px rgba(68,28,112,0.17)"
      }}>
        <h2 style={{
          marginBottom: 12,
          fontWeight: 700,
          color: "#7b2ff2",
          textAlign: "center"
        }}>
          The Science of Gratitude & Resilience
        </h2>
        <ul style={{ fontSize: 16, color: "#3a254e", marginBottom: 20, lineHeight: 1.58 }}>
          <li>
            Regular gratitude journaling improves mood, sleep, and stress resilience, per leading studies at Harvard and UC Berkeley.
          </li>
          <li>
            Reflecting on positive events—even small ones—can retrain your brain towards optimism and coping skills.
          </li>
          <li>
            Resilience isn’t just "toughness"—it’s adaptability. Logging gratitude in high-pressure times helps the mind recover faster from setbacks.
          </li>
          <li>
            Students who log gratitude during exams report reduced anxiety, improved concentration, and better academic outcomes.
          </li>
          <li>
            No data ever leaves your device: all reflections and scores are private and ethically processed.
          </li>
        </ul>
        <div style={{
          color: "#428342",
          fontSize: 15,
          textAlign: "center",
          marginBottom: 14
        }}>
          Keep logging, and see the science-backed benefits unfold!
        </div>
        <button
          onClick={onClose}
          style={{
            background: "#7b2ff2",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            padding: "9px 28px",
            fontSize: 16,
            cursor: "pointer",
            float: "right"
          }}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default SciencePopup;
