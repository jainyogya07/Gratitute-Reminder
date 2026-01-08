// src/Onboarding.tsx

import React, { useState } from "react";
import { requestNotificationPermission } from "./NotificationHelper";

interface OnboardingProps {
  onFinish: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Welcome to Gratitude Reminder",
      desc: "Start your daily journey towards positivity and stress relief. Log one thing you’re grateful for each day and track your progress.",
      img: "/welcome_illustration.svg",
      button: "Next"
    },
    {
      title: "Privacy First",
      desc: "Your data never leaves your device. No signup, no cloud—just personal reflections for your eyes only.",
      img: "/privacy.svg",
      button: "Next"
    },
    {
      title: "AI-Powered Insights",
      desc: "Get real-time motivational feedback with built-in sentiment analysis. Let personalized prompts guide you through stressful times like exams.",
      img: "/ai.svg",
      button: "Next"
    },
    {
      title: "Daily Notifications",
      desc: "Want gentle reminders for gratitude logging and study breaks? Enable notifications now for maximum benefit.",
      img: "/notify.svg",
      button: "Enable Notifications"
    }
  ];

  function handleAction() {
    if (step === steps.length - 1) {
      requestNotificationPermission();
      onFinish();
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(97deg,#f0fdff,#f7e0fa)",
    }}>
      <div style={{
        maxWidth: 400,
        background: "#fff",
        padding: "38px 28px 28px",
        borderRadius: 22,
        boxShadow: "0 5px 25px rgba(72,0,89,0.10)",
        textAlign: "center"
      }}>
        <img
          src={steps[step].img}
          alt={steps[step].title}
          style={{ width: "42%", marginBottom: 24 }}
        />
        <h2 style={{ fontWeight: 700, marginBottom: 14, color: "#7b2ff2" }}>
          {steps[step].title}
        </h2>
        <p style={{ color: "#555", marginBottom: 32, fontSize: 16 }}>
          {steps[step].desc}
        </p>
        <button
          onClick={handleAction}
          style={{
            padding: "11px 27px",
            fontWeight: 600,
            background: "linear-gradient(85deg,#7b2ff2,#f7e0fa)",
            color: "#fff",
            fontSize: 16,
            border: "none",
            borderRadius: 9,
            boxShadow: "0 1px 5px rgba(55,40,95,0.10)",
            cursor: "pointer",
            marginTop: 8
          }}
        >
          {steps[step].button}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
