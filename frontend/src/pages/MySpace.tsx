import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient, API_URL } from '../services/api'
import { useAuth } from '../context/AuthContext'

interface FileItem {
  id: string
  originalName: string
  size: number
  mimetype: string
  downloadToken: string
  createdAt: string
  expiresAt: string | null
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function MySpace() {
  const { token, user } = useAuth()
  const navigate = useNavigate()
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    apiClient
      .get<FileItem[]>('/files/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => setFiles(data))
      .catch(() => setFiles([]))
      .finally(() => setLoading(false))
  }, [token, navigate])

  const handleDelete = async (file: FileItem) => {
    if (!window.confirm(`Supprimer "${file.originalName}" ? Cette action est irréversible.`)) return
    setDeletingId(file.id)
    try {
      await apiClient.delete(`/files/${file.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setFiles((prev) => prev.filter((f) => f.id !== file.id))
    } catch {
      // silently ignore
    } finally {
      setDeletingId(null)
    }
  }

  const handleCopy = (file: FileItem) => {
    const link = `${window.location.origin}/download/${file.downloadToken}`
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(file.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return (
    <div className="myspace-page">
      <style>{`
        .myspace-page {
          max-width: 700px;
          margin: 0 auto;
          padding: 2rem 1rem;
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .myspace-header {
          margin-bottom: 2rem;
        }
        .myspace-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1A1A1A;
          letter-spacing: -0.03em;
          margin-bottom: 0.25rem;
        }
        .myspace-subtitle {
          font-size: 0.9rem;
          color: #888;
        }
        .myspace-empty {
          text-align: center;
          padding: 4rem 1rem;
          color: #888;
          font-size: 0.95rem;
        }
        .file-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .file-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: box-shadow 0.15s;
        }
        .file-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .file-icon {
          width: 40px;
          height: 40px;
          background: #f5f5f5;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .file-info {
          flex: 1;
          min-width: 0;
        }
        .file-name {
          font-size: 0.95rem;
          font-weight: 500;
          color: #1A1A1A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0.2rem;
        }
        .file-meta {
          font-size: 0.78rem;
          color: #999;
        }
        .file-copy-btn {
          flex-shrink: 0;
          background: #1A1A1A;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.4rem 0.9rem;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .file-copy-btn:hover { background: #000; }
        .file-copy-btn.copied { background: #16a34a; }
        .file-delete-btn {
          flex-shrink: 0;
          background: transparent;
          color: #ccc;
          border: none;
          border-radius: 8px;
          padding: 0.4rem 0.5rem;
          cursor: pointer;
          transition: color 0.15s;
          display: flex;
          align-items: center;
        }
        .file-delete-btn:hover { color: #dc2626; }
        .file-delete-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="myspace-header">
        <h1 className="myspace-title">Mon espace</h1>
        <p className="myspace-subtitle">
          {user?.email} · {files.length} fichier{files.length !== 1 ? 's' : ''}
        </p>
      </div>

      {loading && <div className="myspace-empty">Chargement…</div>}

      {!loading && files.length === 0 && (
        <div className="myspace-empty">
          Aucun fichier pour l'instant. Envoie-en un depuis l'accueil.
        </div>
      )}

      {!loading && files.length > 0 && (
        <div className="file-list">
          {files.map((file) => (
            <div className="file-card" key={file.id}>
              <div className="file-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div className="file-info">
                <div className="file-name">{file.originalName}</div>
                <div className="file-meta">
                  {formatBytes(file.size)} · {formatDate(file.createdAt)}
                  {file.expiresAt && ` · expire le ${formatDate(file.expiresAt)}`}
                </div>
              </div>
              <button
                className={`file-copy-btn${copiedId === file.id ? ' copied' : ''}`}
                onClick={() => handleCopy(file)}
              >
                {copiedId === file.id ? 'Copié !' : 'Copier le lien'}
              </button>
              <button
                className="file-delete-btn"
                onClick={() => handleDelete(file)}
                disabled={deletingId === file.id}
                title="Supprimer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
