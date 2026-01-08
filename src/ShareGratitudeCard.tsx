// src/ShareGratitudeCard.tsx

import React, { useRef } from "react";

interface ShareGratitudeCardProps {
  entry?: string;
  date?: string;
}

export const ShareGratitudeCard: React.FC<ShareGratitudeCardProps> = ({ entry, date }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Copy card text to clipboard
  function handleCopy() {
    if (entry) {
      navigator.clipboard.writeText(
        `Gratitude (${date ?? "Today"}): ${entry}`
      );
      alert("Gratitude copied! You can share it anywhere.");
    }
  }

  // Download card as image (client-side, for demo; uses browser canvas API)
  function handleDownload() {
    if (!cardRef.current) return;
    const node = cardRef.current;
    import("html2canvas").then(html2canvas => {
      html2canvas.default(node, { backgroundColor: "#fff" }).then(canvas => {
        const link = document.createElement("a");
        link.download = "gratitude-card.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    });
  }

  return (
    <div style={{ margin: "28px 0", textAlign: "center" }}>
      <div
        ref={cardRef}
        style={{
          display: "inline-block",
          background: "linear-gradient(96deg,#e0ffe0 22%,#e0fcff 80%)",
          borderRadius: 17,
          padding: "20px 28px",
          minWidth: 220,
          boxShadow: "0 2px 8px rgba(31,150,71,0.14)",
          fontSize: 18,
          fontFamily: "Inter, sans-serif",
          color: "#147868",
          position: "relative"
        }}
      >
        <div style={{
          fontSize: 16,
          color: "#66ad90",
          marginBottom: 8,
          fontWeight: 700
        }}>
          {date ?? "Today"}
        </div>
        <div style={{
          fontWeight: 500,
          lineHeight: 1.42
        }}>
          {entry ? entry : "No gratitude logged yet today."}
        </div>
        <div style={{
          fontSize: 26,
          marginTop: 13,
        }}>
          🌟
        </div>
      </div>
      <div style={{ marginTop: 19 }}>
        <button
          onClick={handleCopy}
          style={{
            background: "#23efac",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: 9,
            padding: "7px 24px",
            marginRight: 12,
            cursor: "pointer"
          }}>
          Copy
        </button>
        <button
          onClick={handleDownload}
          style={{
            background: "#2391ef",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: 9,
            padding: "7px 24px",
            marginRight: 12,
            cursor: "pointer"
          }}>
          Download
        </button>
      </div>
      <div style={{
        fontSize: 13,
        color: "#8899aa",
        marginTop: 8
      }}>
        Sharing gratitude motivates others—spread positivity!
      </div>
    </div>
  );
};

export default ShareGratitudeCard;
