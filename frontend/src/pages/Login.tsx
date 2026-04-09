import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Callout } from '../components/Callout';

const Login: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const registered = searchParams.get('registered');

  return (
    <div className="auth-container">
      <style>{`
        .auth-container { max-width: 400px; margin: 4rem auto; padding: 2rem; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid var(--border); }
        .auth-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; text-align: center; }
        .auth-footer { margin-top: 1.5rem; text-align: center; font-size: 0.875rem; color: var(--text-secondary); }
        .auth-link { color: var(--orange); font-weight: 600; text-decoration: none; }
      `}</style>

      {registered && (
        <Callout 
          type="primary" 
          message="Compte créé avec succès ! Vous pouvez maintenant vous connecter." 
          className="mb-4"
        />
      )}

      <h1 className="auth-title">Connexion</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        Bientôt disponible... (Phase US04)
      </p>

      <div className="auth-footer">
        Pas encore de compte ? <Link to="/register" className="auth-link">S'inscrire</Link>
      </div>
    </div>
  );
};

export default Login;
