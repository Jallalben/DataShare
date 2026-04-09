import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="header">
      <style>{`
        .header {
          padding: 1.5rem 0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
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
          color: #000000;
          letter-spacing: -0.04em;
          text-decoration: none;
        }
        .nav {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }
      `}</style>
      <div className="container header-content">
        <Link to="/" className="logo">DataShare</Link>
        <div className="nav">
          {isAuthenticated ? (
            <Link to="/myspace" style={{ textDecoration: 'none' }}>
              <Button variant="black" size="sm">Mon espace</Button>
            </Link>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="black" size="sm">Se connecter</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
