import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiClient } from '../services/api'
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

type Tab = 'actifs' | 'expires'

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getDaysUntilExpiry(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function expiryLabel(file: FileItem): string {
  if (!file.expiresAt) return `Envoyé le ${new Date(file.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`
  const days = getDaysUntilExpiry(file.expiresAt)
  if (days <= 0) return 'Ce fichier a expiré, il sera bientôt supprimé'
  if (days === 1) return 'Expire demain'
  return `Expire dans ${days} jours`
}

function isExpired(file: FileItem): boolean {
  return !!file.expiresAt && getDaysUntilExpiry(file.expiresAt) <= 0
}

export default function MySpace() {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('actifs')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    apiClient
      .get<FileItem[]>('/files/my', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setFiles(data))
      .catch(() => setFiles([]))
      .finally(() => setLoading(false))
  }, [token, navigate])

  const handleDelete = async (file: FileItem) => {
    if (!window.confirm(`Supprimer "${file.originalName}" ? Cette action est irréversible.`)) return
    setDeletingId(file.id)
    try {
      await apiClient.delete(`/files/${file.id}`, { headers: { Authorization: `Bearer ${token}` } })
      setFiles((prev) => prev.filter((f) => f.id !== file.id))
    } catch { /* ignore */ } finally {
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

  const handleLogout = () => { logout(); navigate('/') }

  const filtered = files.filter((f) => tab === 'expires' ? isExpired(f) : !isExpired(f))

  return (
    <div className="ds-dashboard">
      <style>{`
        .ds-dashboard {
          min-height: 100vh;
          background: var(--gradient-primary);
          background-attachment: fixed;
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', sans-serif;
        }

        /* ── Header ── */
        .ds-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2rem;
        }
        .ds-logo {
          font-size: 1.4rem;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.04em;
          text-decoration: none;
        }
        .ds-header-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .ds-btn-primary {
          background: #1A1A1A;
          color: white;
          border: none;
          border-radius: 99px;
          padding: 0.5rem 1.1rem;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
          font-family: inherit;
        }
        .ds-btn-primary:hover { background: #000; }
        .ds-btn-ghost {
          background: transparent;
          color: #1A1A1A;
          border: 1.5px solid rgba(0,0,0,0.2);
          border-radius: 99px;
          padding: 0.5rem 1.1rem;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        .ds-btn-ghost:hover { border-color: #1A1A1A; }

        /* ── Body ── */
        .ds-body {
          display: flex;
          gap: 1.5rem;
          padding: 0 2rem 2rem;
          flex: 1;
        }

        /* ── Sidebar ── */
        .ds-sidebar {
          width: 180px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.25);
          border-radius: 16px;
          padding: 1rem 0.75rem;
          height: fit-content;
        }
        .ds-sidebar-item {
          display: block;
          padding: 0.6rem 0.9rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1A1A1A;
          text-decoration: none;
          background: rgba(255,255,255,0.5);
          transition: background 0.15s;
        }
        .ds-sidebar-item:hover { background: rgba(255,255,255,0.7); }

        /* ── Main ── */
        .ds-main {
          flex: 1;
          background: white;
          border-radius: 16px;
          padding: 1.75rem 2rem;
          min-height: 400px;
        }
        .ds-main-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 1.25rem;
        }

        /* ── Tabs ── */
        .ds-tabs {
          display: flex;
          gap: 0;
          margin-bottom: 1.5rem;
          border-bottom: 1.5px solid #e5e7eb;
        }
        .ds-tab {
          padding: 0.5rem 1rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: #999;
          cursor: pointer;
          border: none;
          background: transparent;
          border-bottom: 2.5px solid transparent;
          margin-bottom: -1.5px;
          font-family: inherit;
          transition: color 0.15s;
        }
        .ds-tab:hover { color: #1A1A1A; }
        .ds-tab.active {
          color: #1A1A1A;
          border-bottom-color: #1A1A1A;
        }

        /* ── File rows ── */
        .ds-file-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ds-file-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .ds-file-row:last-child { border-bottom: none; }
        .ds-file-icon {
          width: 36px;
          height: 36px;
          background: #f5f5f5;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ds-file-info { flex: 1; min-width: 0; }
        .ds-file-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: #1A1A1A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ds-file-meta {
          font-size: 0.78rem;
          color: #999;
          margin-top: 0.1rem;
        }
        .ds-file-meta.expired { color: #f97316; }
        .ds-file-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        .ds-action-btn {
          padding: 0.35rem 0.85rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
          border: 1.5px solid #e5e7eb;
          background: transparent;
          color: #555;
        }
        .ds-action-btn:hover { border-color: #1A1A1A; color: #1A1A1A; }
        .ds-action-btn.danger { color: #dc2626; border-color: #fecaca; }
        .ds-action-btn.danger:hover { background: #fef2f2; border-color: #dc2626; }
        .ds-action-btn.success { color: #16a34a; border-color: #bbf7d0; }
        .ds-action-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── Empty ── */
        .ds-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: #999;
          font-size: 0.9rem;
        }
      `}</style>

      {/* Header */}
      <header className="ds-header">
        <Link to="/" className="ds-logo">DataShare</Link>
        <div className="ds-header-actions">
          <button className="ds-btn-primary" onClick={() => navigate('/')}>
            Ajouter des fichiers
          </button>
          <button className="ds-btn-ghost" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="ds-body">
        {/* Sidebar */}
        <aside className="ds-sidebar">
          <span className="ds-sidebar-item">Mes fichiers</span>
        </aside>

        {/* Main */}
        <main className="ds-main">
          <h1 className="ds-main-title">Mes fichiers</h1>

          <div className="ds-tabs">
            <button
              className={`ds-tab${tab === 'actifs' ? ' active' : ''}`}
              onClick={() => setTab('actifs')}
            >
              Actifs
            </button>
            <button
              className={`ds-tab${tab === 'expires' ? ' active' : ''}`}
              onClick={() => setTab('expires')}
            >
              Expirés
            </button>
          </div>

          {loading && <div className="ds-empty">Chargement…</div>}

          {!loading && filtered.length === 0 && (
            <div className="ds-empty">
              {tab === 'actifs'
                ? 'Aucun fichier actif. Envoie-en un depuis l\'accueil.'
                : 'Aucun fichier expiré.'}
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="ds-file-list">
              {filtered.map((file) => (
                <div className="ds-file-row" key={file.id}>
                  <div className="ds-file-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div className="ds-file-info">
                    <div className="ds-file-name">{file.originalName}</div>
                    <div className={`ds-file-meta${isExpired(file) ? ' expired' : ''}`}>
                      {formatBytes(file.size)} · {expiryLabel(file)}
                    </div>
                  </div>
                  <div className="ds-file-actions">
                    <button
                      className="ds-action-btn danger"
                      onClick={() => handleDelete(file)}
                      disabled={deletingId === file.id}
                    >
                      Supprimer
                    </button>
                    {!isExpired(file) && (
                      <button
                        className={`ds-action-btn${copiedId === file.id ? ' success' : ''}`}
                        onClick={() => handleCopy(file)}
                      >
                        {copiedId === file.id ? 'Copié !' : 'Accéder'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
