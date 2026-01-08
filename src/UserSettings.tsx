// src/UserSettings.tsx

import React, { useState } from "react";
import ThemeCustomizer from "./ThemeCustomizer";
import { exportEntriesAsCSV, triggerFileDownload } from "./ExportUtility";
import type { GratitudeEntry } from "./App";

interface UserSettingsProps {
  entries: GratitudeEntry[];
  onLogout: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ entries, onLogout }) => {
  const [notifEnabled, setNotifEnabled] = useState(true);

  function handleExport() {
    const csv = exportEntriesAsCSV(entries);
    triggerFileDownload(csv, "gratitude-log.csv");
  }

  return (
    <div style={{
      maxWidth: 460,
      margin: "30px auto",
      background: "#eef6ff",
      borderRadius: 20,
      boxShadow: "0 3px 21px rgba(36,102,175,0.12)",
      padding: 28,
      fontFamily: "'Inter', sans-serif",
      color: "#145a96"
    }}>
      <h3 style={{ marginBottom: 25, fontWeight: 700, fontSize: 22 }}>
        User Settings
      </h3>
      <div style={{ marginBottom: 22 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 600 }}>
          <input
            type="checkbox"
            checked={notifEnabled}
            onChange={() => setNotifEnabled(!notifEnabled)}
            style={{ width: 18, height: 18, cursor: "pointer" }}
          />
          Enable Daily Notifications
        </label>
      </div>
      <div style={{ marginBottom: 30 }}>
        <ThemeCustomizer />
      </div>
      <button
        onClick={handleExport}
        style={{
          width: "100%",
          backgroundColor: "#2391ef",
          color: "#fff",
          padding: "13px 0",
          fontWeight: 700,
          fontSize: 18,
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
          marginBottom: 30,
          boxShadow: "0 2px 12px rgba(35,145,239,0.33)"
        }}
      >
        Export Gratitude Log (CSV)
      </button>
      <button
        onClick={onLogout}
        style={{
          width: "100%",
          backgroundColor: "#ef4444",
          color: "#fff",
          padding: "13px 0",
          fontWeight: 700,
          fontSize: 18,
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
          boxShadow: "0 2px 12px rgba(239,68,68,0.33)"
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default UserSettings;
