import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <style>{`
        .footer {
          padding: 2rem 0;
          margin-top: auto;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
          border-top: 1px solid var(--border-light);
        }
      `}</style>
      <div className="container">
        Copyright DataShare® 2025
      </div>
    </footer>
  );
};
