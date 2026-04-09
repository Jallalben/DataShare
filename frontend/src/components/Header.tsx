import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  // Si on est sur une page d'auth, on ne montre pas le header global (car le logo est dans la card)
  if (isAuthPage) return null;

  return (
    <header className="header">
      <style>{`
        .header {
          padding: 1.5rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: var(--transition);
        }
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.04em;
          text-decoration: none;
          transition: var(--transition);
        }
        .logo:hover {
          opacity: 0.9;
          transform: scale(1.02);
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
            <Button variant="outline" size="sm" onClick={logout}>Se déconnecter</Button>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" size="sm">Connexion</Button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="sm">S'inscrire</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
