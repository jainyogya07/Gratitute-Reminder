// src/PushNotificationHandler.tsx

import React, { useState } from "react";

export const PushNotificationHandler: React.FC = () => {
  const initialPermission = typeof Notification !== "undefined" ? Notification.permission : "default";
  const initialError = typeof Notification !== "undefined" ? null : "This browser does not support notifications.";
  const [permission, setPermission] = useState(initialPermission);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  async function requestPermission() {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === "granted") {
        subscribeUser();
      }
    } catch (err) {
      setError("Failed to request notification permission.");
      // only log in dev
      try {
        const mode = ((import.meta as unknown) as { env?: { MODE?: string } }).env?.MODE || 'development';
        if (mode !== 'production') console.error(err);
      } catch (e) {
        // ignore logging failures
        void e;
      }
    }
  }

  async function subscribeUser() {
    // For demo: simulate subscription success
    // Real service worker and push subscription logic would be implemented here.
    setSubscribed(true);
    setError(null);
  }

  function renderStatus() {
    if (error) return <p style={{color:'red'}}>{error}</p>;
    if (permission === "granted") {
      return subscribed ? (
        <p style={{color:'green'}}>Subscribed to push notifications!</p>
      ) : (
        <button onClick={subscribeUser} style={buttonStyle}>
          Enable Push Notifications
        </button>
      );
    }
    if (permission === "denied") return <p>Notifications blocked. Please enable in browser settings.</p>;
    return (
      <button onClick={requestPermission} style={buttonStyle}>
        Request Notification Permission
      </button>
    );
  }

  const buttonStyle = {
    backgroundColor: "#2391ef",
    color: "#fff",
    border: "none",
    borderRadius: 9,
    padding: "8px 20px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 15,
  };

  return (
    <div style={{margin: "22px auto", maxWidth: 400, textAlign: "center"}}>
      <h4 style={{color: "#2391ef", marginBottom: 12}}>Push Notifications</h4>
      {renderStatus()}
    </div>
  );
};

export default PushNotificationHandler;
