import React, { useEffect, useState } from "react";
import { safeLocalStorage } from "./utils/storage";

// Simple themes for the app
const themes = [
  {
    name: "Light",
    background: "#f0fffc",
    card: "#fff",
    color: "#146768",
    accent: "#23efac"
  },
  {
    name: "Dark",
    background: "#172530",
    card: "#21303d",
    color: "#f2f2f2",
    accent: "#23efac"
  }
];

export type ThemeType = "Light" | "Dark";

interface ThemeSwitcherProps {
  onThemeChange: (theme: ThemeType) => void;
}

// Save theme in browser local storage
function setThemeToStorage(theme: ThemeType) {
  safeLocalStorage.setItem("theme", theme);
}
function getThemeFromStorage(): ThemeType {
  const t = safeLocalStorage.getItem("theme");
  return t === "Dark" ? "Dark" : "Light";
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange }) => {
  const [theme, setTheme] = useState<ThemeType>(getThemeFromStorage());

  useEffect(() => {
    document.body.style.background = themes[theme === "Dark" ? 1 : 0].background;
    onThemeChange(theme);
    setThemeToStorage(theme);
  }, [theme, onThemeChange]);

  function toggleTheme() {
    setTheme(theme === "Light" ? "Dark" : "Light");
  }

  return (
    <div style={{
      position: "absolute",
      top: 22,
      right: 22,
      zIndex: 100,
      fontSize: 15,
      fontWeight: 500,
      background: theme === "Light" ? "#23efac" : "#21303d",
      color: theme === "Light" ? "#146768" : "#f2f2f2",
      borderRadius: 8,
      padding: "6px 20px",
      boxShadow: "0 2px 11px rgba(98,255,172,0.13)",
      cursor: "pointer"
    }}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "Light" ? "dark" : "light"} mode`}
    >
      {theme === "Light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </div>
  );
};

export default ThemeSwitcher;
