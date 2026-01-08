// src/AIJournalingAssistant.tsx

import React, { useState, useEffect } from "react";
import type { GratitudeEntry } from "./App";
import { devLog } from "./utils/devLog";

interface AIJournalingAssistantProps {
  entries: GratitudeEntry[];
  onNewPrompt?: (prompt: string) => void;
}

const promptTemplates = [
  "What moment today made you smile?",
  "Name someone you're thankful for and why.",
  "Recall a challenge you overcame recently.",
  "What small joy brightened your day?",
  "Describe something you learned this week.",
  "How did you nurture yourself today?",
  "What act of kindness did you witness or do?",
  "What's a goal you feel optimistic about?",
];

function generatePrompt(entries: GratitudeEntry[]): string {
  if (entries.length === 0) return "Start by writing about something good today!";
  const lastEntry = entries[0].text.toLowerCase();

  if (lastEntry.includes("family")) {
    return "Tell me more about your family and what they mean to you.";
  }
  if (lastEntry.includes("work") || lastEntry.includes("job")) {
    return "What accomplishment at work are you proud of?";
  }
  if (lastEntry.includes("health") || lastEntry.includes("feeling")) {
    return "How have you taken care of your health lately?";
  }
  
  return promptTemplates[entries.length % promptTemplates.length];
}

// Gemini API call with your API key
async function getSmartPromptGemini(entries: GratitudeEntry[]): Promise<string> {
  // Call the server-side proxy which holds the GEMINI_API_KEY in process.env
  try {
    // Allow overriding the API base URL at build time via Vite env VITE_API_BASE.
    // This makes it easy to serve the static build from a different origin
    // (for local preview) while still calling the backend running on another
    // port (e.g. http://localhost:3001).
  const apiBase = ((import.meta as unknown) as { env?: { VITE_API_BASE?: string } }).env?.VITE_API_BASE || '';
    const resp = await fetch(`${apiBase}/api/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries })
    });
    if (!resp.ok) {
      const text = await resp.text();
      devLog('Server /api/gemini error:', resp.status, text);
      throw new Error(`Server error ${resp.status}`);
    }
    const data = await resp.json().catch(err => {
      devLog('Failed to parse JSON from /api/gemini:', err);
      throw err;
    });
    return data?.prompt || '';
  } catch (err) {
    devLog('Error fetching prompt from /api/gemini:', err);
    throw err;
  }
}

export const AIJournalingAssistant: React.FC<AIJournalingAssistantProps> = ({
  entries, onNewPrompt
}) => {
  const [currentPrompt, setCurrentPrompt] = useState(() => generatePrompt(entries));
  const [loading, setLoading] = useState(false);
  const [aiError, setAIError] = useState(false);

  useEffect(() => {
    setCurrentPrompt(generatePrompt(entries));
    setAIError(false);
  }, [entries]);

  async function requestAIPrompt() {
    if (entries.length === 0) {
      setCurrentPrompt("Write your first entry, then I can personalize prompts for you!");
      return;
    }
    
    setLoading(true);
    setAIError(false);
    try {
      const smartPrompt = await getSmartPromptGemini(entries);
      if (smartPrompt && smartPrompt.length > 5) {
        setCurrentPrompt(smartPrompt.trim());
  onNewPrompt?.(smartPrompt);
      } else {
        throw new Error("AI prompt empty");
      }
    } catch (err) {
  devLog("AI Error:", err);
      setCurrentPrompt("AI unavailable right now – try a template prompt below!");
      setAIError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleNextPromptLocal() {
    const newPrompt = promptTemplates[Math.floor(Math.random() * promptTemplates.length)];
    setCurrentPrompt(newPrompt);
  onNewPrompt?.(newPrompt);
    setAIError(false);
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: 22,
      padding: "24px 28px",
      maxWidth: 420,
      margin: "32px auto",
      boxShadow: "0 4px 28px rgba(102,126,234,0.25)",
      fontFamily: "'Inter', sans-serif",
      color: "#fff",
      textAlign: "center",
      fontWeight: 600
    }}>
      <h3 style={{ marginBottom: 16, fontSize: 20 }}>
        ✨ AI Journaling Assistant
      </h3>
      <p style={{
        fontSize: 17,
        lineHeight: 1.5,
        marginBottom: 22,
        minHeight: 50,
        background: "rgba(255,255,255,0.15)",
        borderRadius: 12,
        padding: "14px 18px",
        color: aiError ? "#ffcccc" : "#fff"
      }}>
        {currentPrompt}
      </p>
      <button
        onClick={requestAIPrompt}
        disabled={loading}
        style={{
          background: "#23efac",
          color: "#1c4686",
          border: "none",
          borderRadius: 12,
          padding: "12px 36px",
          fontSize: 16,
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          marginBottom: 12,
          width: "100%",
          boxShadow: "0 2px 10px rgba(35,239,172,0.3)",
          transition: "all 0.2s ease"
        }}
      >
        {loading ? "🤔 Thinking..." : "🚀 Get AI Prompt"}
      </button>
      <button
        onClick={handleNextPromptLocal}
        disabled={loading}
        style={{
          background: "rgba(255,255,255,0.25)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: 10,
          padding: "10px 28px",
          fontSize: 15,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          width: "100%",
          transition: "all 0.2s ease"
        }}
      >
        🎲 Random Template
      </button>
      {aiError && (
        <div style={{ color: "#ffcccc", marginTop: 12, fontSize: 14, fontWeight: 500 }}>
          ⚠️ AI temporarily unavailable. Try template prompts!
        </div>
      )}
    </div>
  );
};

export default AIJournalingAssistant;
