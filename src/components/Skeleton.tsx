import React from 'react';

export const Skeleton: React.FC<{lines?: number; style?: React.CSSProperties}> = ({ lines = 3, style }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton skeleton-line" />
      ))}
    </div>
  );
};

export default Skeleton;
