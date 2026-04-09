import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Callout } from '../components/Callout';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        email: data.email,
        password: data.password,
      });
      navigate('/login?registered=true');
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
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
          background: var(--bg-glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: var(--radius-figma);
          box-shadow: var(--shadow-premium);
          border: 1px solid rgba(255, 255, 255, 0.4);
          animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes cardAppear {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .auth-logo {
          font-size: 2rem;
          font-weight: 800;
          color: var(--orange);
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: -0.04em;
        }
        .auth-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          text-align: center;
          color: var(--text-primary);
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
        <h1 className="auth-title">Inscription</h1>
        <p className="auth-subtitle">Créez votre compte sécurisé.</p>

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
              required: "Le mot de passe est requis",
              minLength: { value: 8, message: "8 caractères minimum" }
            })}
          />

          <Input
            label="Confirmer le mot de passe"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: "La confirmation est requise",
              validate: value => value === password || "Les mots de passe divergent"
            })}
          />

          <Button type="submit" fullWidth loading={loading} size="lg">
            S'inscrire
          </Button>
        </form>

        <div className="auth-footer">
          Déjà un compte ? 
          <Link to="/login" className="auth-link">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
