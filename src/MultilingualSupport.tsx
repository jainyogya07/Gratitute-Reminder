// src/MultilingualSupport.tsx

import React, { useState } from "react";

const translations = {
  en: {
    greeting: "Welcome to your Gratitude Journal",
    logEntry: "Log your gratitude",
    submit: "Submit",
    theme: "Select Theme",
    settings: "Settings",
  },
  hi: {
    greeting: "[translate:आपके कृतज्ञता जर्नल में आपका स्वागत है]",
    logEntry: "[translate:अपनी कृतज्ञता दर्ज करें]",
    submit: "[translate:जमा करें]",
    theme: "[translate:थीम चुनें]",
    settings: "[translate:सेटिंग्स]",
  },
  es: {
    greeting: "Bienvenido a tu Diario de Gratitud",
    logEntry: "Registra tu gratitud",
    submit: "Enviar",
    theme: "Seleccionar tema",
    settings: "Configuraciones",
  }
};

export const MultilingualSupport: React.FC = () => {
  const [lang, setLang] = useState<keyof typeof translations>("en");

  const t = translations[lang];

  return (
    <div style={{
      maxWidth: 460,
      margin: "30px auto",
      padding: 22,
      borderRadius: 20,
      background: "#f4f4f7",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      fontFamily: "Arial, sans-serif",
      textAlign: "center"
    }}>
      <h2>{t.greeting}</h2>
      <div style={{ margin: "20px 0" }}>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as keyof typeof translations)}
          style={{ fontSize: 16, padding: "6px 14px", borderRadius: 8, cursor: "pointer" }}
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="hi">[translate:हिन्दी]</option>
          <option value="es">Español</option>
        </select>
      </div>
      <button style={{
        backgroundColor: "#2391ef",
        color: "#fff",
        border: "none",
        borderRadius: 9,
        padding: "10px 24px",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: 16,
      }}>
        {t.submit}
      </button>
    </div>
  );
};

export default MultilingualSupport;
