import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { UploadModal } from './components/UploadModal'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

function Home() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [uploadOpen, setUploadOpen] = useState(false)

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      setUploadOpen(true)
    }
  }

  return (
    <>
    <UploadModal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />
    <section className="hero-section">
      <style>{`
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 1rem;
          color: #000000;
          animation: fadeIn 0.8s ease-out;
          min-height: 70vh;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 500;
          color: #000000;
          margin-bottom: 2.5rem;
          letter-spacing: -0.02em;
        }
        .upload-portal {
          width: 80px;
          height: 80px;
          background: #1A1A1A;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        .upload-portal::after {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.05);
          z-index: -1;
          transition: var(--transition);
        }
        .upload-portal:hover {
          transform: scale(1.08);
          background: #000000;
        }
        .upload-portal:hover::after {
          transform: scale(1.1);
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
      
      <h1 className="hero-title">Tu veux partager un fichier ?</h1>
      
      <div className="upload-portal" onClick={handleUploadClick}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19c.7 0 1.3-.2 1.8-.7s.7-1.1.7-1.8c0-1.3-1-2.4-2.2-2.5C17.4 11 15 9 12 9c-2.3 0-4.3 1.2-5.4 3.1C5.4 12.4 4 13.5 4 15.5c0 1.9 1.6 3.5 3.5 3.5h10Z"/>
          <path d="M12 13v6"/>
          <path d="m9 16 3-3 3 3"/>
        </svg>
      </div>
    </section>
    </>
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
