import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      fontFamily: 'Outfit, sans-serif',
    }}>
      <p style={{ fontSize: '4rem', fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}>404</p>
      <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1A1A1A', margin: '1rem 0 0.5rem' }}>
        Cette page n'existe pas.
      </p>
      <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '2rem' }}>
        Le lien est peut-être incorrect ou la page a été déplacée.
      </p>
      <Link
        to="/"
        style={{
          background: '#1A1A1A',
          color: 'white',
          padding: '0.6rem 1.4rem',
          borderRadius: '99px',
          fontWeight: 600,
          fontSize: '0.9rem',
          textDecoration: 'none',
        }}
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}
