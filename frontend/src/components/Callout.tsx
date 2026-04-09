import React from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
  className = '',
}) => {
  const styles = `
    .callout {
      padding: 1rem;
      border-radius: var(--radius-md);
      border: 1px solid;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .callout-info { background: var(--callout-info-bg); border-color: var(--callout-info-border); color: #004085; }
    .callout-warning { background: var(--callout-warning-bg); border-color: var(--callout-warning-border); color: #856404; }
    .callout-error { background: var(--callout-error-bg); border-color: var(--callout-error-border); color: var(--danger); }
    .callout-title { font-weight: 700; font-size: 0.875rem; text-transform: uppercase; }
    .callout-content { font-size: 0.875rem; }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className={`callout callout-${type} ${className}`}>
        {title && <div className="callout-title">{title}</div>}
        <div className="callout-content">{children}</div>
      </div>
    </>
  );
};
