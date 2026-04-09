import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

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
          text-decoration: none;
        }
      `}</style>
      <div className="container header-content">
        <Link to="/" className="logo">DataShare</Link>
        <div className="nav" style={{ display: 'flex', gap: '1rem' }}>
          {isAuthenticated ? (
            <Button variant="outline" size="sm" onClick={logout}>Se déconnecter</Button>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="sm">Se connecter</Button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm">S'inscrire</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
