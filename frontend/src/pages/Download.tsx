import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

interface FileInfo {
  originalName: string
  size: number
  mimetype: string
  createdAt: string
  expiresAt: string | null
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function Download() {
  const { token } = useParams<{ token: string }>()
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'not_found' | 'expired'>('loading')

  useEffect(() => {
    axios
      .get<FileInfo>(`${API_URL}/files/info/${token}`)
      .then(({ data }) => {
        setFileInfo(data)
        setStatus('ready')
      })
      .catch((err) => {
        if (err?.response?.status === 410) setStatus('expired')
        else setStatus('not_found')
      })
  }, [token])

  const handleDownload = () => {
    window.location.href = `${API_URL}/files/download/${token}`
  }

  return (
    <div className="download-page">
      <style>{`
        .download-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
          padding: 2rem 1rem;
        }
        .download-card {
          background: white;
          border-radius: var(--radius-xl, 24px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 440px;
          text-align: center;
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .download-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .download-icon.ready { background: #f0fdf4; }
        .download-icon.error { background: #fff5f5; }
        .download-icon.expired { background: #fffbeb; }
        .download-card h2 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 0.4rem;
        }
        .download-filename {
          font-size: 1rem;
          font-weight: 500;
          color: #1A1A1A;
          word-break: break-all;
          margin-bottom: 0.25rem;
        }
        .download-meta {
          font-size: 0.82rem;
          color: #888;
          margin-bottom: 1.75rem;
        }
        .download-btn {
          width: 100%;
          padding: 0.8rem 1rem;
          background: #1A1A1A;
          color: white;
          border: none;
          border-radius: var(--radius-md, 10px);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 1rem;
        }
        .download-btn:hover { background: #000; }
        .download-back {
          font-size: 0.85rem;
          color: #888;
          text-decoration: none;
        }
        .download-back:hover { color: #1A1A1A; }
        .download-subtitle {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
      `}</style>

      <div className="download-card">
        {status === 'loading' && (
          <>
            <div className="download-icon ready">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20"/>
              </svg>
            </div>
            <h2>Chargement…</h2>
          </>
        )}

        {status === 'ready' && fileInfo && (
          <>
            <div className="download-icon ready">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <div className="download-filename">{fileInfo.originalName}</div>
            <div className="download-meta">{formatBytes(fileInfo.size)} · {fileInfo.mimetype}</div>
            <button className="download-btn" onClick={handleDownload}>
              Télécharger
            </button>
            <Link to="/" className="download-back">Retour à l'accueil</Link>
          </>
        )}

        {status === 'expired' && (
          <>
            <div className="download-icon expired">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h2>Lien expiré</h2>
            <p className="download-subtitle">Ce fichier n'est plus disponible.<br/>Le lien de partage a dépassé sa date d'expiration.</p>
            <Link to="/" className="download-back">Retour à l'accueil</Link>
          </>
        )}

        {status === 'not_found' && (
          <>
            <div className="download-icon error">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <h2>Fichier introuvable</h2>
            <p className="download-subtitle">Ce lien ne correspond à aucun fichier.<br/>Il a peut-être été supprimé.</p>
            <Link to="/" className="download-back">Retour à l'accueil</Link>
          </>
        )}
      </div>
    </div>
  )
}
