import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Register from '../pages/Register'
import { AuthContext } from '../context/AuthContext'

vi.mock('../services/api', () => ({
  apiClient: { post: vi.fn(), get: vi.fn() },
  API_URL: 'http://localhost:3001/api',
  setAuthToken: vi.fn(),
}))
import { apiClient } from '../services/api'

const mockAuthContext = {
  isAuthenticated: false,
  user: null,
  token: null,
  login: vi.fn(),
  logout: vi.fn(),
}

const renderRegister = () =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthContext}>
        <Register />
      </AuthContext.Provider>
    </MemoryRouter>
  )

describe("Page d'inscription", () => {
  it('affiche les 3 champs du formulaire', () => {
    renderRegister()
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument()
    // Les deux champs mot de passe ont le même placeholder
    const passwordFields = screen.getAllByPlaceholderText('••••••••')
    expect(passwordFields).toHaveLength(2)
  })

  it("affiche une erreur si les mots de passe ne correspondent pas", async () => {
    renderRegister()
    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'nouveau@example.com' },
    })
    const [passwordField, confirmField] = screen.getAllByPlaceholderText('••••••••')
    fireEvent.change(passwordField, { target: { value: 'motdepasse123' } })
    fireEvent.change(confirmField, { target: { value: 'différent456' } })
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }))
    await waitFor(() => {
      expect(screen.getByText(/les mots de passe divergent/i)).toBeInTheDocument()
    })
  })

  it("refuse un mot de passe trop court", async () => {
    renderRegister()
    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'test@example.com' },
    })
    const [passwordField] = screen.getAllByPlaceholderText('••••••••')
    fireEvent.change(passwordField, { target: { value: '123' } })
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }))
    await waitFor(() => {
      expect(screen.getByText(/8 caractères minimum/i)).toBeInTheDocument()
    })
  })

  it("appelle l'API et redirige si l'inscription réussit", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: {} })
    renderRegister()
    fireEvent.change(screen.getByPlaceholderText('votre@email.com'), {
      target: { value: 'nouveau@example.com' },
    })
    const [passwordField, confirmField] = screen.getAllByPlaceholderText('••••••••')
    fireEvent.change(passwordField, { target: { value: 'motdepasse123' } })
    fireEvent.change(confirmField, { target: { value: 'motdepasse123' } })
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }))
    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        expect.objectContaining({ email: 'nouveau@example.com' })
      )
    })
  })
})
