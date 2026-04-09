import React from 'react';
import { Button } from './Button';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <style>{`
        .header {
          background: white;
          border-bottom: 1px solid var(--border-light);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--orange);
          letter-spacing: -0.025em;
        }
      `}</style>
      <div className="container header-content">
        <div className="logo">DataShare</div>
        <div className="nav">
          <Button variant="outline" size="sm">Se connecter</Button>
        </div>
      </div>
    </header>
  );
};
