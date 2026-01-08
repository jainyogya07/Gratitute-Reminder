// src/SettingsPanel.tsx

import React, { useState } from "react";
import { scheduleDailyNotification } from "./NotificationHelper";

interface SettingsPanelProps {
  examMode: boolean;
  onExamModeToggle: (active: boolean) => void;
  onResetLog: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  examMode,
  onExamModeToggle,
  onResetLog,
}) => {
  const [notifHour, setNotifHour] = useState<number>(20); // Default: 8PM
  const [notifMinute, setNotifMinute] = useState<number>(0);

  function handleTimeUpdate() {
    scheduleDailyNotification(notifHour, notifMinute);
    alert(
      `Notifications set for ${String(notifHour).padStart(2, "0")}:${String(
        notifMinute
      ).padStart(2, "0")}`
    );
  }

  function handleExamToggle(e: React.ChangeEvent<HTMLInputElement>) {
    onExamModeToggle(e.target.checked);
  }

  function handleReset() {
    if (
      window.confirm(
        "Are you sure you want to delete all your gratitude entries? This cannot be undone."
      )
    ) {
      onResetLog();
    }
  }

  return (
    <div
      style={{
        background: "#f7fbff",
        borderRadius: 14,
        padding: "22px 18px",
        margin: "30px 0 24px",
        boxShadow: "0 2px 12px rgba(32,110,210,0.07)",
        maxWidth: 420,
      }}
    >
      <h3 style={{ color: "#1976d2", marginBottom: 12 }}>
        App Settings
      </h3>
      <div style={{ marginBottom: 17 }}>
        <label
          style={{
            fontWeight: 500,
            marginRight: 16,
            color: "#2b618c",
          }}
        >
          Daily Notification Time:
          <input
            type="number"
            min={0}
            max={23}
            value={notifHour}
            onChange={(e) => setNotifHour(Number(e.target.value))}
            style={{
              width: 38,
              margin: "0 7px",
              borderRadius: 6,
              border: "1px solid #aad6ff",
              padding: "2px 6px",
            }}
          />
          :
          <input
            type="number"
            min={0}
            max={59}
            value={notifMinute}
            onChange={(e) => setNotifMinute(Number(e.target.value))}
            style={{
              width: 38,
              marginLeft: "7px",
              borderRadius: 6,
              border: "1px solid #aad6ff",
              padding: "2px 6px",
            }}
          />
        </label>
        <button
          onClick={handleTimeUpdate}
          style={{
            padding: "6px 22px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </div>
      <div style={{ marginBottom: 17 }}>
        <label style={{ fontWeight: 500, color: "#2b618c" }}>
          <input
            type="checkbox"
            checked={examMode}
            onChange={handleExamToggle}
            style={{ marginRight: 7, accentColor: "#d32f2f" }}
          />
          Exam Mode
        </label>
      </div>
      <div>
        <button
          onClick={handleReset}
          style={{
            padding: "8px 18px",
            background: "#ffb3b3",
            color: "#c62828",
            fontWeight: 700,
            border: "none",
            borderRadius: 7,
            marginTop: 8,
            cursor: "pointer",
          }}
        >
          Reset Gratitude Log
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
