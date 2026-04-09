import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`select-group ${fullWidth ? 'w-full' : ''} ${className}`}>
      <style>{`
        .select-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
        .select-label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }
        .select-field {
          padding: 0.6rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 1rem;
          transition: var(--transition);
          background: white;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.8rem center;
          background-size: 1rem;
        }
        .select-field:focus { outline: none; border-color: var(--orange); box-shadow: 0 0 0 3px var(--orange-light); }
        .select-error { font-size: 0.75rem; color: var(--danger); font-weight: 500; }
      `}</style>
      {label && <label className="select-label">{label}</label>}
      <select className={`select-field ${error ? 'has-error' : ''}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="select-error">{error}</span>}
    </div>
  );
};
