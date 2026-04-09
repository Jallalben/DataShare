import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <style>{`
        .footer {
          padding: 2rem 0;
          margin-top: auto;
          text-align: center;
          color: white;
          font-weight: 500;
          opacity: 0.8;
          font-size: 0.875rem;
        }
      `}</style>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} DataShare - Share with confidence</p>
      </div>
    </footer>
  );
};
