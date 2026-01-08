// src/ProgressBar.tsx

import React from "react";

interface ProgressBarProps {
  progress: number; // range 0 to 1 (i.e., 0% to 100%)
  label?: string;
  milestone?: number; // show when close to a milestone (e.g., 7, 14)
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label, milestone }) => {
  // Clamp value between 0 and 1
  const pct = Math.min(Math.max(progress, 0), 1);

  return (
    <div style={{ width: "100%", margin: "20px 0" }}>
      {label && (
        <div style={{
          marginBottom: 5,
          fontWeight: 600,
          fontSize: 15,
          color: "#1976d2"
        }}>
          {label}
        </div>
      )}
      <div style={{
        background: "#d9edea",
        borderRadius: 10,
        height: 18,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          width: `${pct * 100}%`,
          height: "100%",
          background: "linear-gradient(78deg,#23efac 40%,#2391ef 110%)",
          borderRadius: 10,
          transition: "width 0.7s cubic-bezier(.3,1.2,.2,.9)",
          boxShadow: pct > 0.85 ? "0 1px 7px rgba(67,206,162,0.13)" : undefined
        }} />
        {milestone &&
          pct >= milestone / 30 - 0.02 && (
            <span style={{
              position: "absolute",
              right: "6px",
              top: "2px",
              fontSize: 19,
              fontWeight: 700,
              color: "#ffab00"
            }}>
              🎉
            </span>
          )}
      </div>
      <div style={{
        textAlign: "right",
        fontSize: 14,
        color: "#268180",
        marginTop: 3,
        fontWeight: 500
      }}>
        {Math.round(pct * 100)}%
      </div>
    </div>
  );
};

export default ProgressBar;
