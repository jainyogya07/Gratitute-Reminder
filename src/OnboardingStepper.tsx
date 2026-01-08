// src/OnboardingStepper.tsx

import React from "react";

interface OnboardingStepperProps {
  current: number;   // active step index (0-based)
  total: number;     // total number of steps
  labels?: string[]; // optional labels for each step
}

export const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ current, total, labels }) => {
  return (
    <div style={{
      margin: "22px auto 28px",
      maxWidth: 394,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {[...Array(total)].map((_, i) => (
        <div key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: i < total - 1 ? 16 : 0
          }}>
          <div style={{
            minWidth: 33,
            height: 33,
            borderRadius: "50%",
            background: i <= current ? "#23efac" : "#ccd6db",
            color: i === current ? "#fff" : "#6f9098",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 17,
            border: i === current ? "2px solid #2391ef" : "1.5px solid #b5dbd9",
            boxShadow: i === current ? "0 1px 6px rgba(35,225,172,0.12)" : undefined,
            transition: "background 0.2s"
          }}>
            {i + 1}
          </div>
          {labels && (
            <div style={{
              marginTop: 6,
              fontSize: 13,
              color: i === current ? "#2391ef" : "#929aab",
              fontWeight: 500,
              textAlign: "center",
              maxWidth: 64,
              minWidth: 40,
              letterSpacing: "0.2px"
            }}>
              {labels[i]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OnboardingStepper;
