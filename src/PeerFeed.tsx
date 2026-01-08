// src/PeerFeed.tsx

import React, { useState } from "react";

// For hackathon: use a static array for peer entries.
// In a real app, can fetch from Supabase free tier (or peer sync API).
const demoPeers = [
  { date: "2025-11-21", text: "Grateful for a supportive friend after a tough exam.", tag: "Exam Week" },
  { date: "2025-11-22", text: "Thankful for healthy meals this semester.", tag: "Wellbeing" },
  { date: "2025-11-23", text: "Appreciate late-night study sessions powering through!", tag: "Study" },
  { date: "2025-11-24", text: "Grateful for having time to rest and recharge.", tag: "Self-care" },
  { date: "2025-11-24", text: "Thankful for great teachers encouraging curiosity.", tag: "Mentorship" },
];

interface PeerFeedProps {
  peers?: { date: string; text: string; tag: string }[];
}

export const PeerFeed: React.FC<PeerFeedProps> = ({ peers }) => {
  const [showMore, setShowMore] = useState(false);
  const entries = peers ?? demoPeers;

  return (
    <div style={{
      margin: "30px 0 18px",
      padding: "18px 10px",
      background: "#eafee3",
      borderRadius: 16,
      boxShadow: "0 2px 10px rgba(32,110,26,0.08)",
      maxWidth: 450
    }}>
      <h4 style={{ color: "#287548", fontWeight: 700, margin: "2px 0 18px", textAlign: "left", fontSize: 18 }}>
        Peer Gratitude Feed
      </h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 15 }}>
        {(showMore ? entries : entries.slice(0, 3)).map((e, i) => (
          <li key={i} style={{
            background: "#fff",
            borderRadius: 9,
            marginBottom: 10,
            padding: "11px 13px",
            boxShadow: "0 1px 5px rgba(67,206,162,0.11)"
          }}>
            <span style={{ color: "#a0bb71", marginRight: 11 }}>{e.date}</span>
            <span style={{ color: "#23ad69", fontWeight: 500 }}>{e.text}</span>
            <span style={{ float: "right", background: "#e9ffd1", borderRadius: 8, padding: "2px 9px", fontSize: 13, color: "#8aac35", fontWeight: 600 }}>
              {e.tag}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowMore(!showMore)}
        style={{
          background: "#23efac",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          borderRadius: 9,
          padding: "7px 21px",
          cursor: "pointer",
          fontSize: 14,
          marginTop: 6
        }}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
      <div style={{
        fontSize: 13,
        color: "#7b8b9a",
        marginTop: 8,
        textAlign: "left"
      }}>
        Sharing gratitude creates a ripple—your reflections help others!
      </div>
    </div>
  );
};

export default PeerFeed;
