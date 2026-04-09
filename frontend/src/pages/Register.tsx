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
    <div className="auth-container">
      <style>{`
        .auth-container { max-width: 400px; margin: 4rem auto; padding: 2rem; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 1px solid var(--border); }
        .auth-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; text-align: center; }
        .auth-subtitle { color: var(--text-secondary); text-align: center; margin-bottom: 2rem; font-size: 0.875rem; }
        .auth-footer { margin-top: 1.5rem; text-align: center; font-size: 0.875rem; color: var(--text-secondary); }
        .auth-link { color: var(--orange); font-weight: 600; text-decoration: none; }
        .auth-link:hover { text-decoration: underline; }
      `}</style>

      <h1 className="auth-title">Créer un compte</h1>
      <p className="auth-subtitle">Rejoignez DataShare pour gérer vos fichiers en toute sécurité.</p>

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
            validate: value => value === password || "Les mots de passe ne correspondent pas"
          })}
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Création en cours..." : "S'inscrire"}
        </Button>
      </form>

      <div className="auth-footer">
        Déjà un compte ? <Link to="/login" className="auth-link">Se connecter</Link>
      </div>
    </div>
  );
};

export default Register;
