// src/FeedbackForm.tsx

import React, { useState } from "react";
import { safeLocalStorage } from "./utils/storage";

interface FeedbackFormProps {
  onSubmit?: (feedback: { mood: string; text: string }) => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [mood, setMood] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitted(true);
    if (onSubmit) {
      onSubmit({ mood, text });
    }
    // For local demo, optionally store in localStorage for developer review
    const prev = JSON.parse(safeLocalStorage.getItem("feedback-log") || "[]");
    safeLocalStorage.setItem("feedback-log", JSON.stringify([...prev, { mood, text, date: new Date().toISOString() }]));
    setTimeout(() => {
      setText("");
      setMood("");
      setSubmitted(false);
    }, 1800);
  }

  if (submitted) {
    return (
      <div style={{
        background: "#e0ffe8",
        padding: "13px 21px",
        borderRadius: 10,
        color: "#2391ef",
        textAlign: "center",
        fontWeight: 600
      }}>
        Thank you for your feedback!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: "#f7fcff",
      borderRadius: 17,
      padding: "20px 15px",
      margin: "20px auto",
      maxWidth: 335,
      boxShadow: "0 2px 11px rgba(120,168,255,0.07)",
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <h4 style={{
        marginTop: 0,
        marginBottom: 9,
        color: "#1976d2",
        fontWeight: 700,
        textAlign: "center"
      }}>
        Feedback & Suggestions
      </h4>
      <label style={{ fontWeight: 500, color: "#267898" }}>
        How do you feel about the app?
        <select
          value={mood}
          onChange={e => setMood(e.target.value)}
          style={{
            marginLeft: 9,
            borderRadius: 4,
            padding: "3px 8px",
            fontSize: 14
          }}
        >
          <option value="">Select</option>
          <option value="excellent">Excellent 😊</option>
          <option value="good">Good 🙂</option>
          <option value="average">Average 😐</option>
          <option value="bad">Needs Improvement 😕</option>
        </select>
      </label>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your feedback, feature ideas, or bug reports here..."
        style={{
          width: "100%",
          minHeight: 65,
          marginTop: 13,
          marginBottom: 14,
          fontSize: 15,
          borderRadius: 10,
          border: "1px solid #bddaff",
          padding: "9px 10px",
          resize: "vertical"
        }}
        required
        maxLength={500}
      />
      <button
        type="submit"
        style={{
          background: "#23efac",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 15,
          padding: "8px 26px",
          cursor: "pointer"
        }}
      >
        Submit
      </button>
      <div style={{
        fontSize: 12,
        color: "#b7bacc",
        marginTop: 8,
        textAlign: "center"
      }}>
        Anonymous & local: feedback stored for demo only.
      </div>
    </form>
  );
};

export default FeedbackForm;
