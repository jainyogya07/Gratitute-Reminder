import React from 'react';
import generateDemoEntries from '../utils/demoData';
import { safeLocalStorage } from '../utils/storage';

export const EmptyState: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  function loadDemo() {
    const demo = generateDemoEntries(14);
    safeLocalStorage.setItem('gratitude-log', JSON.stringify(demo));
    window.location.reload();
  }

  return (
    <div style={{ textAlign: 'center', padding: 24, color: '#466' }}>
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 12 }}>
        <circle cx="12" cy="12" r="10" fill="#e8fbf4" />
        <path d="M8 12c.667-1 2.667-2 4-2s3.333 1 4 2" stroke="#23efac" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 9l.5-1.5" stroke="#2391ef" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <h3 style={{ color: '#1976d2', marginBottom: 8 }}>Welcome — start your gratitude practice</h3>
      <p style={{ color: '#5b6b6b', marginBottom: 18, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
        Capture small moments of joy. Your entries are private and stored only on your device.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={() => onStart?.()} style={{ minWidth: 160 }}>Add first entry</button>
        <button className="btn btn-ghost" onClick={loadDemo} style={{ minWidth: 160 }}>Load demo data</button>
      </div>
    </div>
  );
};

export default EmptyState;
