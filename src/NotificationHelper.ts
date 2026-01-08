// src/NotificationHelper.ts

/**
 * Utility for managing browser notifications.
 * Safe for solo hackathon use—no backend required!
 */

export function isNotificationSupported(): boolean {
  return "Notification" in window;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return "denied";
  return Notification.requestPermission();
}

export function sendGratitudeNotification(message?: string) {
  if (!isNotificationSupported()) return;
  if (Notification.permission === "granted") {
    new Notification("Gratitude Reminder", {
      body: message || "What are you grateful for today? Log your gratitude entry.",
      icon: "/icon-192.png" // set your app icon here if desired
    });
  }
}

/**
 * Schedule a daily notification (simple hackathon demo version)
 * Usage: call in App.tsx within useEffect.
 */
export function scheduleDailyNotification(hour = 20, minute = 0) {
  if (!isNotificationSupported() || Notification.permission !== "granted") return;
  const now = new Date();
  let millisTillNext = (hour * 60 + minute) * 60 * 1000 -
    ((now.getHours() * 60 + now.getMinutes()) * 60 * 1000 + now.getSeconds() * 1000);
  if (millisTillNext < 0) millisTillNext += 24 * 60 * 60 * 1000; // Next day
  setTimeout(() => {
    sendGratitudeNotification();
    // Optionally, reschedule for demo: scheduleDailyNotification(hour, minute);
  }, millisTillNext);
}

/**
 * Example integration in App.tsx:
 *
 * import { requestNotificationPermission, scheduleDailyNotification } from "./NotificationHelper";
 *
 * useEffect(() => {
 *   requestNotificationPermission().then(() => {
 *     scheduleDailyNotification(20,0); // 8:00 PM
 *   });
 * }, []);
 */

