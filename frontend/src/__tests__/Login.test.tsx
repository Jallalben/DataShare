import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/Login'
import { AuthContext } from '../context/AuthContext'

// On remplace axios pour ne pas faire de vraies requêtes
vi.mock('axios')
import axios from 'axios'

// Un faux contexte d'authentification pour les tests
const mockAuthContext = {
  isAuthenticated: false,
  user: null,
  token: null,
  login: vi.fn(),
  logout: vi.fn(),
}

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthContext}>
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>
  )

describe('Page de connexion', () => {
  it('affiche le formulaire avec les deux champs requis', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument()
  })

  it('affiche une erreur si on soumet le formulaire vide', async () => {
    renderLogin()
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))
    await waitFor(() => {
      expect(screen.getByText(/l'email est requis/i)).toBeInTheDocument()
    })
  })

  it('affiche un message d\'erreur si le serveur rejette la connexion', async () => {
    vi.mocked(axios.post).mockRejectedValueOnce({
      response: { data: { message: 'Identifiants incorrects' } },
    })
    renderLogin()
    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'mauvais_mdp' },
    })
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))
    await waitFor(() => {
      expect(screen.getByText(/identifiants incorrects/i)).toBeInTheDocument()
    })
  })
})
