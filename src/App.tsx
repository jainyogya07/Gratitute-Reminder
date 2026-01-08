// src/App.tsx
import React, { useState, lazy, Suspense } from "react";
import './App.css';
import ExamMode from "./ExamMode";
import StreakBadge from "./StreakBadge";
import AffirmationBanner from "./AffirmationBanner";
import CoachAvatar from "./CoachAvatar";
import AchievementBadges from "./AchievementBadges";
import Skeleton from "./components/Skeleton";
import EmptyState from "./components/EmptyState";
const DashboardSummary = lazy(() => import("./DashboardSummary"));
const MoodChart = lazy(() => import("./MoodChart"));
const WeeklyReportGenerator = lazy(() => import("./WeeklyReportGenerator"));
import GratitudeCalendar from "./GratitudeCalendar";
import MultiGoalReminder from "./MultiGoalReminder";
import DemoMode from "./DemoMode";
import FeedbackForm from "./FeedbackForm";
import AdminPanel from "./AdminPanel";
import UsageStats from "./UsageStats";
// ThemeCustomizer imported previously but unused; removed to silence unused import warnings
import SyncIndicator from "./SyncIndicator";
// Leaderboard imported previously but unused; removed to silence unused import warnings
import PushNotificationHandler from "./PushNotificationHandler";
// MotivationalTimer imported previously but unused; removed to silence unused import warnings
// DailyReflectionTimer imported previously but unused; removed to silence unused import warnings
import ReflectionSummary from "./ReflectionSummary";
import AIJournalingAssistant from "./AIJournalingAssistant";
import MultilingualSupport from "./MultilingualSupport";
import CulturalQuotes from "./CulturalQuotes";
import LanguagePracticeQuiz from "./LanguagePracticeQuiz";
import CulturalStoryMode from "./CulturalStoryMode";
import InteractiveLanguageMap from "./InteractiveLanguageMap";
import HabitReminder from "./HabitReminder";
import UserSettings from "./UserSettings";
import { exportEntriesAsCSV, triggerFileDownload } from "./ExportUtility";
import { safeLocalStorage } from "./utils/storage";

// Type for a single gratitude entry
export interface GratitudeEntry {
  id: number;
  date: string;
  text: string;
}

// Local storage key
const LOG_KEY = "gratitude-log";

function getTodayDateStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadEntries(): GratitudeEntry[] {
  const data = safeLocalStorage.getItem(LOG_KEY);
  return data ? JSON.parse(data) : [];
}

function saveEntries(entries: GratitudeEntry[]) {
  safeLocalStorage.setItem(LOG_KEY, JSON.stringify(entries));
}

function calcStreak(entries: GratitudeEntry[]): number {
  let streak = 0;
  const today = getTodayDateStr();
  let date = today;
  const entryDates = entries.map(e => e.date);
  while (entryDates.includes(date)) {
    streak += 1;
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 1);
    date = prev.toISOString().slice(0, 10);
  }
  return streak;
}

const App: React.FC = () => {
  const [entryText, setEntryText] = useState("");
  const initial = loadEntries();
  const [entries, setEntries] = useState<GratitudeEntry[]>(() => initial);
  const [streak, setStreak] = useState(() => calcStreak(initial));
  const [examMode, setExamMode] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [hasExported, setHasExported] = useState(false);
  const [activeTab, setActiveTab] = useState<"journal" | "analytics" | "learning" | "settings">("journal");
  const [showLanding, setShowLanding] = useState(entries.length === 0);
  const [landingAnimating, setLandingAnimating] = useState(false);

  // Add a new gratitude entry
  function addEntry() {
    const today = getTodayDateStr();
    if (entryText.trim() === "") return;
    if (entries.some(e => e.date === today)) {
      alert("Already added gratitude for today!");
      return;
    }
    const newEntry: GratitudeEntry = {
      id: Date.now(),
      date: today,
      text: entryText.trim(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    setEntryText("");
    setStreak(calcStreak(updated));
  }

  function handleExport() {
    const csv = exportEntriesAsCSV(entries);
    triggerFileDownload(csv, "gratitude-log.csv");
    setHasExported(true);
  }

  function handleLogout() {
    if (confirm("Are you sure you want to log out and clear all data?")) {
      safeLocalStorage.clear();
      window.location.reload();
    }
  }

  if (demoMode) {
    return <DemoMode entries={entries} exported={hasExported} onExit={() => setDemoMode(false)} />;
  }

  return (
    <div className="app-container">
      <SyncIndicator />
      <AffirmationBanner />

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        {(["journal", "analytics", "learning", "settings"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setShowLanding(false); }}
            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-ghost'}`}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: "0 16px" }}>
        {/* JOURNAL TAB */}
        {activeTab === "journal" && (
          <div className="container-card card">
            {showLanding ? (
              <section className={`hero ${landingAnimating ? 'hero-exit' : ''}`} onAnimationEnd={() => {
                if (landingAnimating) {
                  setLandingAnimating(false);
                  setShowLanding(false);
                }
              }}>
                <h1>Daily Gratitude Journal</h1>
                <p className="hero-sub">Reflect daily, build a wellness streak, and get friendly micro-coaching prompts.</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18 }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      // trigger exit animation then hide
                      setLandingAnimating(true);
                    }}
                  >Get started</button>
                  <button className="btn btn-ghost" onClick={() => setDemoMode(true)}>See demo</button>
                </div>
              </section>
            ) : (
              <div className='journal-content'>
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <h2 style={{ color: '#1976d2', margin: 6 }}>Welcome back</h2>
                  <p style={{ color: '#555', margin: 0 }}>Log your gratitude for today and track your progress.</p>
                </div>

                <div className="top-row" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <CoachAvatar entries={entries} />
                  </div>
                  <div style={{ width: 180 }}>
                    <MultiGoalReminder today={getTodayDateStr()} />
                    <AIJournalingAssistant entries={entries} />
                  </div>
                </div>

                <div className="entry-block" style={{ marginBottom: 22 }}>
                  <textarea
                    value={entryText}
                    onChange={e => setEntryText(e.target.value)}
                    placeholder="I'm grateful for..."
                    rows={4}
                    className="entry-textarea"
                  />
                  <button onClick={addEntry} className="primary-cta">Add Gratitude</button>
                </div>

                <StreakBadge streak={streak} />
                <AchievementBadges entries={entries} exported={hasExported} />
                <ExamMode active={examMode} onToggle={setExamMode} />

                <h3 style={{ margin: "24px 0 12px", color: "#137882" }}>Your Gratitude Log</h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {entries.map(entry => (
                    <li key={entry.id} className="animate-fade-in" style={{
                      padding: "14px",
                      marginBottom: 10,
                      background: "#f7fcff",
                      borderRadius: 10,
                      borderLeft: "4px solid #23efac",
                      color: "#146768"
                    }}>
                      <span style={{
                        fontWeight: 600,
                        color: "#2391ef",
                        marginRight: 12,
                        display: "block",
                        marginBottom: 6
                      }}>{entry.date}</span>
                      {entry.text}
                    </li>
                  ))}
                </ul>
                {entries.length === 0 && (
                  <div style={{ marginTop: 12 }}>
                    <EmptyState onStart={() => {
                      setTimeout(() => {
                        const ta = document.querySelector('textarea');
                        if (ta && (ta as HTMLTextAreaElement).focus) (ta as HTMLTextAreaElement).focus();
                      }, 120);
                    }} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div style={{ maxWidth: 900, margin: "32px auto" }}>
            <Suspense fallback={<Skeleton lines={3} style={{ maxWidth: 420, margin: '18px auto' }} />}>
              <DashboardSummary entries={entries} />
            </Suspense>
            <Suspense fallback={<Skeleton lines={4} style={{ maxWidth: 720, margin: '18px auto' }} />}>
              <MoodChart entries={entries} />
            </Suspense>
            <GratitudeCalendar entries={entries} />
            <Suspense fallback={<Skeleton lines={3} style={{ maxWidth: 720, margin: '18px auto' }} />}>
              <WeeklyReportGenerator entries={entries} />
            </Suspense>
            <ReflectionSummary entries={entries} />
            <UsageStats entries={entries} />
            <button
              onClick={handleExport}
              style={{
                display: "block",
                margin: "24px auto",
                padding: "12px 32px",
                background: "#2391ef",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Export Log (CSV)
            </button>
            <button
              onClick={() => setDemoMode(true)}
              style={{
                display: "block",
                margin: "12px auto",
                padding: "12px 32px",
                background: "#ff9800",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Enter Demo Mode
            </button>
          </div>
        )}

        {/* LEARNING TAB */}
        {activeTab === "learning" && (
          <div style={{ maxWidth: 800, margin: "32px auto" }}>
            <CulturalQuotes />
            <CulturalStoryMode />
            <InteractiveLanguageMap />
            <LanguagePracticeQuiz />
            <MultilingualSupport />
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div style={{ maxWidth: 600, margin: "32px auto" }}>
            <UserSettings entries={entries} onLogout={handleLogout} />
            <HabitReminder label="Log your daily gratitude!" />
            <PushNotificationHandler />
            <FeedbackForm />
            <AdminPanel entries={entries} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
