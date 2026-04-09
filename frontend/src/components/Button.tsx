import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      <style>{`
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          border-radius: var(--radius-figma);
          transition: var(--transition);
          font-family: 'Outfit', sans-serif;
          gap: 0.6rem;
          white-space: nowrap;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .btn:active:not(:disabled) {
          transform: scale(0.96);
        }

        .btn-full { width: 100%; }

        .btn-sm { padding: 0.5rem 1.25rem; font-size: 0.875rem; }
        .btn-md { padding: 0.75rem 1.75rem; font-size: 1rem; }
        .btn-lg { padding: 1rem 2.5rem; font-size: 1.125rem; }

        .btn-primary {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 126, 95, 0.25);
        }
        .btn-primary:hover:not(:disabled) {
          box-shadow: 0 8px 25px rgba(255, 126, 95, 0.35);
          transform: translateY(-2px);
        }

        .btn-black {
          background: #1A1A1A;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .btn-black:hover:not(:disabled) {
          background: #000000;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-secondary {
          background: white;
          color: #000000;
          box-shadow: var(--shadow-premium);
        }
        .btn-secondary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .btn-outline {
          background: transparent;
          border-color: rgba(255, 255, 255, 0.5);
          color: white;
          backdrop-filter: blur(4px);
        }
        .btn-outline:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
        }

        .btn-ghost {
          color: white;
          opacity: 0.8;
        }
        .btn-ghost:hover:not(:disabled) {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-danger {
          background: var(--danger);
          color: white;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          filter: grayscale(0.5);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loader {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
      {loading && <div className="loader" />}
      <span style={{ opacity: loading ? 0 : 1 }}>{children}</span>
    </button>
  );
};
