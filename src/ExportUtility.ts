// src/ExportUtility.ts

import type { GratitudeEntry } from "./App";

/**
 * Export entries as CSV string.
 */
export function exportEntriesAsCSV(entries: GratitudeEntry[]): string {
  const header = "Date,Gratitude";
  const rows = entries.map(e => `"${e.date}","${e.text.replace(/"/g, '""')}"`);
  return [header, ...rows].join("\n");
}

/**
 * Export entries as plain text block.
 */
export function exportEntriesAsText(entries: GratitudeEntry[]): string {
  return entries.map(e => `[${e.date}] ${e.text}`).join("\n");
}

/**
 * Trigger browser download of given string (CSV or TXT).
 */
export function triggerFileDownload(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 1800);
}

/**
 * Example usage (in UI):
 * 
 * import { exportEntriesAsCSV, triggerFileDownload } from "./ExportUtility";
 * 
 * const csv = exportEntriesAsCSV(entries);
 * triggerFileDownload(csv, "gratitude-log.csv");
 */
