import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Download from './pages/Download'
import MySpace from './pages/MySpace'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/myspace" element={<MySpace />} />
        <Route
          path="*"
          element={
            <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main className="container" style={{ flex: 1, padding: '2rem 0' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/download/:token" element={<Download />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
