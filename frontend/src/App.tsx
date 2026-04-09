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
    <section id="center">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="DataShare Hero" />
      </div>
      <div>
        <h1>Partagez vos fichiers en toute sécurité</h1>
        <p>
          DataShare vous permet de téléverser des documents avec liens temporaires et protection par mot de passe.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Link to="/register" className="counter" style={{ textDecoration: 'none' }}>
          Commencer
        </Link>
        <Link to="/login" className="counter" style={{ textDecoration: 'none', background: 'transparent', border: '1px solid var(--orange)', color: 'var(--orange)' }}>
          Se connecter
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
