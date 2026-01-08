// src/ExamMode.tsx

import React, { useState } from "react";

/**
 * ExamModeProps:
 * - active: boolean (exam mode toggled)
 * - onToggle: function to change state in parent
 */
interface ExamModeProps {
  active: boolean;
  onToggle: (active: boolean) => void;
}

// Motivational tips for exam stress
const examTips = [
  "Take regular short breaks—focus improves with rest.",
  "Practice deep breathing for 90 seconds to reduce anxiety.",
  "Recall one thing that went well today, no matter how small.",
  "Have water and healthy snacks nearby—fuel your brain.",
  "Visualize acing your exam—positive self-talk helps confidence.",
  "Step away from your screen for 5 minutes—move around.",
  "Reach out to a friend for support; you’re not alone.",
];

// Choose an initial tip index once at module load time to avoid calling
// impure functions during render or setting state synchronously in an effect.
const initialTipIndex = Math.floor(Math.random() * examTips.length);

export const ExamMode: React.FC<ExamModeProps> = ({ active, onToggle }) => {
  // Show a random exam tip each time. Initialize from module-scoped random
  // value so we don't call impure functions during render or trigger
  // synchronous setState inside an effect.
  const [tipIndex, setTipIndex] = useState<number>(initialTipIndex);

  function nextTip() {
    setTipIndex((i) => (i + 1) % examTips.length);
  }

  return (
    <div style={{
      margin: "28px 0",
      padding: "18px",
      background: active ? "linear-gradient(92deg,#ffe0e0,#f7f7ff 80%)" : "#e3f6fb",
      borderRadius: 16,
      boxShadow: "0 1px 11px rgba(173, 68, 68, 0.08)",
      border: active ? "2px solid #c62828" : "2px solid #00bcd4"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <span style={{
          fontWeight: 600,
          color: active ? "#c62828" : "#00868b",
          fontSize: 18
        }}>
          {active ? "🚨 Exam Mode On" : "Exam Mode Off"}
        </span>
        <label style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer"
        }}>
          <input
            type="checkbox"
            checked={active}
            onChange={e => onToggle(e.target.checked)}
            style={{ marginRight: 6 }}
          />
          <span style={{
            color: active ? "#d32f2f" : "#00868b",
            fontWeight: 500
          }}>
            {active ? "ON" : "OFF"}
          </span>
        </label>
      </div>
      {active && (
        <div style={{
          marginTop: 16,
          color: "#a31545",
          fontSize: 15,
          background: "#fff7f7",
          borderRadius: 10,
          padding: "12px 10px",
        }}>
          <b>Tip:</b> {examTips[tipIndex]}
          <button
            onClick={nextTip}
            style={{
              float: "right",
              background: "#ffc1c1",
              border: "none",
              borderRadius: 8,
              color: "#a31545",
              fontWeight: 500,
              padding: "3px 12px",
              marginLeft: 12,
              cursor: "pointer"
            }}
          >
            Next Tip
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamMode;
