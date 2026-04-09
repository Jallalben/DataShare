import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[var(--orange)] text-white hover:bg-[var(--orange-hover)] shadow-sm',
    secondary: 'bg-[var(--orange-light)] text-[var(--orange)] hover:bg-[var(--orange)] hover:text-white',
    outline: 'border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--orange)] hover:text-[var(--orange)]',
    danger: 'bg-[var(--danger)] text-white hover:opacity-90',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const styles = `
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      border-radius: var(--radius-md);
      transition: var(--transition);
      cursor: pointer;
      border: none;
      gap: 0.5rem;
    }
    .btn:active { transform: scale(0.98); }
    .btn-primary { background: var(--orange); color: white; }
    .btn-primary:hover { background: var(--orange-hover); }
    .btn-secondary { background: var(--orange-light); color: var(--orange); }
    .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text-primary); }
    .btn-danger { background: var(--danger); color: white; }
    .btn-full { width: 100%; }
    .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.875rem; }
    .btn-md { padding: 0.6rem 1.2rem; }
    .btn-lg { padding: 0.8rem 1.6rem; font-size: 1.1rem; }
  `;

  return (
    <>
      <style>{styles}</style>
      <button
        className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    </>
  );
};
