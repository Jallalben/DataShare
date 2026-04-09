import { Routes, Route, Link } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import heroImg from './assets/hero.png'
import './App.css'

function Home() {
  return (
    <section className="hero-section">
      <style>{`
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 1rem;
          color: white;
          animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin-bottom: 3rem;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
      
      <h1 className="hero-title">Partagez vos fichiers <br/>en toute confiance.</h1>
      <p className="hero-subtitle">
        Solution sécurisée, temporaire et sans fioritures pour vos transferts de documents critiques.
      </p>
      
      <div className="hero-actions">
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button variant="secondary" size="lg">Commencer maintenant</Button>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="outline" size="lg">Se connecter</Button>
        </Link>
      </div>
    </section>
  )
}

function App() {
  return (
    <AuthProvider>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main className="container" style={{ flex: 1, padding: '2rem 0' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
