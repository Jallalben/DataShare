import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-group ${fullWidth ? 'w-full' : ''} ${className}`}>
      <style>{`
        .input-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
        .input-label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }
        .input-field {
          padding: 0.6rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 1rem;
          transition: var(--transition);
          background: white;
        }
        .input-field:focus { outline: none; border-color: var(--orange); box-shadow: 0 0 0 3px var(--orange-light); }
        .input-field.has-error { border-color: var(--danger); }
        .input-error { font-size: 0.75rem; color: var(--danger); font-weight: 500; }
      `}</style>
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input-field ${error ? 'has-error' : ''}`}
        {...props}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};
