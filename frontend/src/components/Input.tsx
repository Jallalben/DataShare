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
    <div className={`input-container ${fullWidth ? 'w-full' : ''} ${className}`}>
      <style>{`
        .input-container {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
          width: 100%;
        }
        .input-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-left: 0.5rem;
        }
        .input-field-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-field {
          width: 100%;
          padding: 0.9rem 1.25rem;
          border: 2px solid rgba(0, 0, 0, 0.05);
          border-radius: var(--radius-lg);
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          transition: var(--transition);
          background: rgba(255, 255, 255, 0.8);
          color: var(--text-primary);
        }
        .input-field::placeholder {
          color: var(--text-muted);
          opacity: 0.6;
        }
        .input-field:focus {
          outline: none;
          background: white;
          border-color: var(--orange);
          box-shadow: 0 0 0 4px rgba(255, 126, 95, 0.1);
          transform: translateY(-1px);
        }
        .input-field.has-error {
          border-color: var(--danger);
          background: #FFF5F5;
        }
        .input-error {
          font-size: 0.75rem;
          color: var(--danger);
          font-weight: 600;
          margin-left: 0.5rem;
          margin-top: 0.25rem;
          animation: slideIn 0.2s ease-out;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {label && <label className="input-label">{label}</label>}
      <div className="input-field-wrapper">
        <input
          className={`input-field ${error ? 'has-error' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};
