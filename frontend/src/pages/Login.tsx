import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
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
      const response = await axios.post('http://localhost:3001/api/auth/login', data);
      login(response.data.access_token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || "Identifiants incorrects.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <style>{`
        .auth-container { max-width: 400px; margin: 4rem auto; padding: 2rem; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid var(--border); }
        .auth-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; text-align: center; }
        .auth-subtitle { color: var(--text-secondary); text-align: center; margin-bottom: 2rem; font-size: 0.875rem; }
        .auth-footer { margin-top: 1.5rem; text-align: center; font-size: 0.875rem; color: var(--text-secondary); }
        .auth-link { color: var(--orange); font-weight: 600; text-decoration: none; }
      `}</style>

      {registered && !error && (
        <Callout 
          type="primary" 
          message="Compte créé ! Vous pouvez maintenant vous connecter." 
          className="mb-4"
        />
      )}

      <h1 className="auth-title">Connexion</h1>
      <p className="auth-subtitle">Accédez à votre espace DataShare.</p>

      {error && <Callout type="danger" message={error} className="mb-4" />}

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

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <div className="auth-footer">
        Pas encore de compte ? <Link to="/register" className="auth-link">S'inscrire</Link>
      </div>
    </div>
  );
};

export default Login;
