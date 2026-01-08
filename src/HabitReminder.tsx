// src/HabitReminder.tsx

import React, { useEffect, useState } from "react";

interface HabitReminderProps {
  label?: string;
}

export const HabitReminder: React.FC<HabitReminderProps> = ({ label }) => {
  const [hour, setHour] = useState(20);
  const [minute, setMinute] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === hour && now.getMinutes() === minute) {
        if (Notification.permission === "granted") {
          new Notification(`Reminder: ${label || "Time for your gratitude!"}`);
          setMessage("Reminder sent!");
        } else {
          alert(label || "Time for your gratitude!");
          setMessage("Reminder alert shown.");
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [enabled, hour, minute, label]);

  async function requestPermission() {
    if (!("Notification" in window)) {
      setMessage("Browser does not support notifications.");
      return;
    }
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setMessage("Notification permission denied.");
        return;
      }
    }
    setEnabled(true);
    setMessage(`Reminder set for ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
  }


  return (
    <div style={{
      background: "#e7f5ff",
      borderRadius: 17,
      padding: "18px 16px",
      maxWidth: 360,
      margin: "28px auto",
      boxShadow: "0 3px 16px rgba(35,145,239,0.1)",
      fontFamily: "Inter, Arial, sans-serif",
      textAlign: "center",
      color: "#2374e1"
    }}>
      <h4 style={{ marginBottom: 16, fontWeight: 700 }}>Set Daily Habit Reminder</h4>
      <div>
        <label>
          Hour:{" "}
          <input
            type="number"
            min={0}
            max={23}
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            style={{ width: 50, marginRight: 14, borderRadius: 7, border: "1px solid #81b3f9", padding: 4 }}
          />
        </label>
        <label>
          Minute:{" "}
          <input
            type="number"
            min={0}
            max={59}
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            style={{ width: 50, borderRadius: 7, border: "1px solid #81b3f9", padding: 4 }}
          />
        </label>
      </div>
      <button
        onClick={requestPermission}
        disabled={enabled}
        style={{
          marginTop: 18,
          background: enabled ? "#a0c5ff" : "#2391ef",
          border: "none",
          borderRadius: 11,
          padding: "9px 28px",
          color: "white",
          fontWeight: 700,
          fontSize: 16,
          cursor: enabled ? "default" : "pointer"
        }}
      >
        {enabled ? "Reminder Active" : "Enable Reminder"}
      </button>
      {message && <div style={{ marginTop: 15, color: "#1461c6" }}>{message}</div>}
    </div>
  );
};

export default HabitReminder;
