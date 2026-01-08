// src/DemoMode.tsx

import React, { useEffect, useState } from "react";
import DashboardSummary from "./DashboardSummary";
import AchievementBadges from "./AchievementBadges";
import MoodChart from "./MoodChart";
import WeeklyReportGenerator from "./WeeklyReportGenerator";
import CoachAvatar from "./CoachAvatar";
import GratitudeCalendar from "./GratitudeCalendar";
import type { GratitudeEntry } from "./App";
import generateDemoEntries from "./utils/demoData";
import { safeLocalStorage } from "./utils/storage";

interface DemoModeProps {
  entries: GratitudeEntry[];
  exported?: boolean;
  onExit: () => void;
}

const sections = [
  { key: "summary", label: "Summary" },
  { key: "badges", label: "Achievements" },
  { key: "chart", label: "Mood Chart" },
  { key: "weekly", label: "Weekly Report" },
  { key: "coach", label: "Coach Avatar" },
  { key: "calendar", label: "Calendar" },
];

export const DemoMode: React.FC<DemoModeProps> = ({ entries, exported, onExit }) => {
  const [sectionIdx, setSectionIdx] = useState(0);

  // Auto-cycle every 8 seconds (hackathon demo)
  useEffect(() => {
    const timer = setInterval(() => {
      setSectionIdx(i => (i + 1) % sections.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  function renderSection() {
    switch (sections[sectionIdx].key) {
      case "summary":
        return <DashboardSummary entries={entries} />;
      case "badges":
        return <AchievementBadges entries={entries} exported={exported} />;
      case "chart":
        return <MoodChart entries={entries} />;
      case "weekly":
        return <WeeklyReportGenerator entries={entries} />;
      case "coach":
        return <CoachAvatar entries={entries} />;
      case "calendar":
        return <GratitudeCalendar entries={entries} />;
      default:
        return null;
    }
  }

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100vw",
      height: "100vh",
      background: "#f7fcff",
      zIndex: 9999,
      overflowY: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <div style={{
        boxShadow: "0 7px 30px rgba(67,206,162,0.11)",
        borderRadius: 28,
        padding: "39px 23px",
        background: "#fff",
        minWidth: 330,
        maxWidth: 430,
        margin: "24px 0"
      }}>
        <div style={{
          textAlign: "center",
          fontWeight: 700,
          color: "#23efac",
          fontSize: 23,
          marginBottom: 10
        }}>
          Hackathon Demo Mode
        </div>
        <div style={{
          textAlign: "center",
          fontWeight: 500,
          color: "#2391ef",
          fontSize: 16,
          marginBottom: 14
        }}>
          {sections[sectionIdx].label}
        </div>
        {renderSection()}
      </div>
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => {
            const demo = generateDemoEntries(14);
            safeLocalStorage.setItem('gratitude-log', JSON.stringify(demo));
            window.location.reload();
          }}
          style={{ background: '#23efac', color: '#06364b', border: 'none', padding: '8px 18px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}
        >Load Demo Data</button>
      </div>
      <button
        onClick={onExit}
        style={{
          background: "#2391ef",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          borderRadius: 13,
          padding: "9px 32px",
          marginTop: 15,
          fontSize: 19,
          cursor: "pointer"
        }}
      >
        Exit Demo Mode
      </button>
    </div>
  );
};

export default DemoMode;
