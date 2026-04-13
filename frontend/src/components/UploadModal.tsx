import React, { useRef, useState } from 'react';
import axios from 'axios';
import { apiClient, API_URL } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Modal } from './Modal';

interface UploadResult {
  id: string;
  originalName: string;
  size: number;
  mimetype: string;
  downloadToken: string;
  createdAt: string;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const { token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [expirationDays, setExpirationDays] = useState(7);

  const reset = () => {
    setSelectedFile(null);
    setIsDragging(false);
    setUploading(false);
    setProgress(0);
    setResult(null);
    setError(null);
    setCopied(false);
    setExpirationDays(7);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleUpload = async () => {
    if (!selectedFile || !token) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('expirationDays', String(expirationDays));

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const { data } = await apiClient.post<UploadResult>(
        '/files/upload',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (evt) => {
            if (evt.total) {
              setProgress(Math.round((evt.loaded * 100) / evt.total));
            }
          },
        },
      );
      setResult(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? 'Une erreur est survenue lors de l\'envoi.',
      );
    } finally {
      setUploading(false);
    }
  };

  const shareLink = result
    ? `${window.location.origin}/download/${result.downloadToken}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Envoyer un fichier">
      <style>{`
        .upload-dropzone {
          border: 2px dashed var(--border-light, #e5e7eb);
          border-radius: var(--radius-lg, 12px);
          padding: 2rem 1rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          background: transparent;
        }
        .upload-dropzone.drag-over {
          border-color: #1A1A1A;
          background: rgba(0,0,0,0.03);
        }
        .upload-dropzone.has-file {
          border-color: #1A1A1A;
        }
        .upload-dropzone-icon {
          width: 48px;
          height: 48px;
          background: #f5f5f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem;
        }
        .upload-filename {
          font-weight: 500;
          font-size: 0.95rem;
          color: #1A1A1A;
          margin-bottom: 0.25rem;
          word-break: break-all;
        }
        .upload-filesize {
          font-size: 0.8rem;
          color: #666;
        }
        .upload-hint {
          font-size: 0.85rem;
          color: #888;
          margin-top: 0.5rem;
        }
        .upload-progress-bar {
          height: 6px;
          background: #e5e7eb;
          border-radius: 99px;
          overflow: hidden;
          margin-top: 1rem;
        }
        .upload-progress-fill {
          height: 100%;
          background: #1A1A1A;
          border-radius: 99px;
          transition: width 0.15s ease;
        }
        .upload-progress-label {
          font-size: 0.8rem;
          color: #666;
          text-align: right;
          margin-top: 0.25rem;
        }
        .upload-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }
        .upload-btn {
          flex: 1;
          padding: 0.7rem 1rem;
          border-radius: var(--radius-md, 8px);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: opacity 0.2s;
        }
        .upload-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .upload-btn-primary { background: #1A1A1A; color: white; }
        .upload-btn-primary:hover:not(:disabled) { background: #000; }
        .upload-btn-ghost { background: transparent; color: #1A1A1A; border: 1.5px solid #e5e7eb; }
        .upload-btn-ghost:hover:not(:disabled) { border-color: #1A1A1A; }
        .upload-error {
          margin-top: 0.75rem;
          padding: 0.6rem 0.9rem;
          background: #fff5f5;
          border: 1px solid #fecaca;
          border-radius: var(--radius-md, 8px);
          font-size: 0.85rem;
          color: #dc2626;
        }
        .upload-success {
          text-align: center;
        }
        .upload-success-icon {
          width: 56px;
          height: 56px;
          background: #f0fdf4;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .upload-success h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .upload-success p {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 1.25rem;
        }
        .upload-link-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: var(--radius-md, 8px);
          padding: 0.5rem 0.75rem;
          margin-bottom: 1rem;
        }
        .upload-link-text {
          flex: 1;
          font-size: 0.8rem;
          color: #444;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }
        .upload-copy-btn {
          flex-shrink: 0;
          background: #1A1A1A;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.35rem 0.75rem;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .upload-copy-btn:hover { background: #000; }
        .upload-expiry {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
          font-size: 0.85rem;
          color: #555;
        }
        .upload-expiry select {
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 0.35rem 0.6rem;
          font-size: 0.85rem;
          font-family: inherit;
          color: #1A1A1A;
          background: white;
          cursor: pointer;
        }
        .upload-expiry select:focus { outline: none; border-color: #1A1A1A; }
      `}</style>

      {!result ? (
        <>
          {/* Drop zone */}
          <div
            className={`upload-dropzone${isDragging ? ' drag-over' : ''}${selectedFile ? ' has-file' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !uploading && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              disabled={uploading}
            />

            <div className="upload-dropzone-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19c.7 0 1.3-.2 1.8-.7s.7-1.1.7-1.8c0-1.3-1-2.4-2.2-2.5C17.4 11 15 9 12 9c-2.3 0-4.3 1.2-5.4 3.1C5.4 12.4 4 13.5 4 15.5c0 1.9 1.6 3.5 3.5 3.5h10Z"/>
                <path d="M12 13v6"/>
                <path d="m9 16 3-3 3 3"/>
              </svg>
            </div>

            {selectedFile ? (
              <>
                <div className="upload-filename">{selectedFile.name}</div>
                <div className="upload-filesize">{formatBytes(selectedFile.size)}</div>
              </>
            ) : (
              <>
                <div style={{ fontWeight: 500, fontSize: '0.95rem', color: '#1A1A1A' }}>
                  Glisse ton fichier ici
                </div>
                <div className="upload-hint">ou clique pour choisir un fichier · max 50 Mo</div>
              </>
            )}
          </div>

          {/* Progress */}
          {uploading && (
            <>
              <div className="upload-progress-bar">
                <div className="upload-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="upload-progress-label">{progress}%</div>
            </>
          )}

          {/* Error */}
          {error && <div className="upload-error">{error}</div>}

          {/* Expiration */}
          <div className="upload-expiry">
            <span>Expire dans</span>
            <select
              value={expirationDays}
              onChange={(e) => setExpirationDays(Number(e.target.value))}
              disabled={uploading}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <option key={d} value={d}>{d} jour{d > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="upload-actions">
            <button className="upload-btn upload-btn-ghost" onClick={handleClose} disabled={uploading}>
              Annuler
            </button>
            <button
              className="upload-btn upload-btn-primary"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? 'Envoi en cours…' : 'Envoyer'}
            </button>
          </div>
        </>
      ) : (
        /* Success state */
        <div className="upload-success">
          <div className="upload-success-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3>Fichier envoyé !</h3>
          <p>{result.originalName} · {formatBytes(result.size)}</p>

          <div className="upload-link-row">
            <span className="upload-link-text">{shareLink}</span>
            <button className="upload-copy-btn" onClick={handleCopy}>
              {copied ? 'Copié !' : 'Copier'}
            </button>
          </div>

          <button className="upload-btn upload-btn-primary" style={{ width: '100%' }} onClick={handleClose}>
            Fermer
          </button>
        </div>
      )}
    </Modal>
  );
};
