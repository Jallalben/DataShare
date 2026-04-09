import React from 'react';

interface CalloutProps {
  type?: 'primary' | 'info' | 'warning' | 'danger';
  message: string;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  message,
  className = '',
}) => {
  return (
    <div className={`callout callout-${type} ${className}`}>
      <style>{`
        .callout {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1px solid transparent;
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .callout-primary {
          background: rgba(255, 126, 95, 0.1);
          color: #E8734A;
          border-color: rgba(255, 126, 95, 0.2);
        }
        .callout-info {
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
          border-color: rgba(59, 130, 246, 0.2);
        }
        .callout-warning {
          background: rgba(245, 158, 11, 0.1);
          color: #F59E0B;
          border-color: rgba(245, 158, 11, 0.2);
        }
        .callout-danger {
          background: rgba(239, 68, 68, 0.1);
          color: #EF4444;
          border-color: rgba(239, 68, 68, 0.2);
        }
      `}</style>
      {message}
    </div>
  );
};
