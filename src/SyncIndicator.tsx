// src/SyncIndicator.tsx

import React, { useEffect, useState } from "react";

interface SyncIndicatorProps {
  isSyncing?: boolean;
}

export const SyncIndicator: React.FC<SyncIndicatorProps> = ({ isSyncing = false }) => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setOnline(true);
    }
    function handleOffline() {
      setOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 18,
      right: 18,
      background: online ? (isSyncing ? "#ffd54f" : "#23efac") : "#f44336",
      color: "#222",
      padding: "6px 18px",
      borderRadius: 13,
      fontWeight: 600,
      userSelect: "none",
      boxShadow: online ? "0 2px 8px rgba(35,225,172,0.3)" : "0 2px 8px rgba(255,69,58,0.4)",
      cursor: "default",
      fontSize: 14,
      textAlign: "center",
      minWidth: 95
    }}>
      {!online ? "Offline" : isSyncing ? "Syncing..." : "Online"}
    </div>
  );
};

export default SyncIndicator;
