import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiClient } from '../services/api';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Callout } from '../components/Callout';
import { useAuth } from '../context/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const registered = searchParams.get('registered');

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/login', data);
      login(response.data.access_token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || "Identifiants incorrects.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .auth-card {
          width: 100%;
          max-width: 440px;
          padding: 3rem;
          background: #FFFFFF;
          border-radius: var(--radius-figma);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.04);
          animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes cardAppear {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .auth-logo {
          font-size: 2rem;
          font-weight: 800;
          color: #000000;
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: -0.04em;
        }
        .auth-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          text-align: center;
          color: #000000;
        }
        .auth-subtitle {
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: 2.5rem;
          font-size: 0.9375rem;
          font-weight: 400;
        }
        .auth-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9375rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .auth-link {
          color: var(--orange);
          font-weight: 700;
          text-decoration: none;
          margin-left: 0.5rem;
          transition: var(--transition);
        }
        .auth-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-card">
        <div className="auth-logo">DataShare</div>
        <h1 className="auth-title">Connexion</h1>
        <p className="auth-subtitle">Content de vous revoir !</p>

        {registered && !error && (
          <Callout 
            type="primary" 
            message="Compte créé avec succès ! Connectez-vous." 
            className="mb-6"
          />
        )}

        {error && <Callout type="danger" message={error} className="mb-6" />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Adresse Email"
            type="email"
            placeholder="votre@email.com"
            error={errors.email?.message}
            {...register('email', {
              required: "L'email est requis",
              pattern: { value: /^\S+@\S+$/i, message: "Email invalide" }
            })}
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', {
              required: "Le mot de passe est requis"
            })}
          />

          <Button type="submit" fullWidth loading={loading} size="lg">
            Se connecter
          </Button>
        </form>

        <div className="auth-footer">
          Pas encore de compte ? 
          <Link to="/register" className="auth-link">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
