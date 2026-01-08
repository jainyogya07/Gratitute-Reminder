// src/GratitudeCalendar.tsx

import React from "react";
import type { GratitudeEntry } from "./App";

interface GratitudeCalendarProps {
  entries: GratitudeEntry[];
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function entryOnDate(entries: GratitudeEntry[], date: string): GratitudeEntry | undefined {
  return entries.find(e => e.date === date);
}

export const GratitudeCalendar: React.FC<GratitudeCalendarProps> = ({ entries }) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const days = getDaysInMonth(year, month);

  // Generate date string: YYYY-MM-DD
  function dayStr(day: number) {
    return `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  }

  return (
    <div style={{
      background: "#f9fbdc",
      borderRadius: 20,
      padding: "22px 14px",
      maxWidth: 350,
      margin: "29px auto",
      boxShadow: "0 3px 17px rgba(160,195,63,0.13)",
    }}>
      <h4 style={{ color: "#2391ef", fontWeight: 700, marginBottom: 15, textAlign: "center" }}>
        Gratitude Calendar
      </h4>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "7px"
      }}>
        {[...Array(days)].map((_, i) => {
          const dateStr = dayStr(i + 1);
          const entry = entryOnDate(entries, dateStr);

          return (
            <div
              key={dateStr}
              title={entry ? entry.text : ""}
              style={{
                height: 38,
                borderRadius: 7,
                background: entry
                  ? "linear-gradient(89deg,#23efac,#e6ffd4)"
                  : "#e6eafc",
                color: entry ? "#227868" : "#7f8da0",
                fontWeight: entry ? 700 : 400,
                fontSize: 15,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: entry ? "pointer" : "default",
                boxShadow: entry ? "0 1px 7px rgba(67,206,162,0.07)" : undefined,
                border: entry ? "2px solid #23efac" : "1px solid #c3c3e3"
              }}
            >
              {i + 1}
              {entry && (
                <span style={{
                  fontSize: 17,
                  marginLeft: 8
                }}>
                  🌟
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{
        marginTop: 16,
        color: "#807b8a",
        fontSize: 13,
        textAlign: "center"
      }}>
        Tap a highlighted date to view your gratitude entry.
      </div>
    </div>
  );
};

export default GratitudeCalendar;
