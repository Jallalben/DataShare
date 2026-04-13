const email = `cypress_dl_${Date.now()}@test.com`
const password = 'Test1234!'

describe('Téléchargement via lien', () => {
  let downloadToken: string

  before(() => {
    cy.request('POST', 'http://localhost:3001/api/auth/register', { email, password })

    cy.request('POST', 'http://localhost:3001/api/auth/login', { email, password }).then((res) => {
      const jwt = res.body.access_token

      // Uploader via fetch natif pour supporter FormData
      cy.window().then((win) => {
        const formData = new win.FormData()
        const blob = new win.Blob(['contenu test cypress'], { type: 'text/plain' })
        formData.append('file', blob, 'cypress-download-test.txt')
        formData.append('expirationDays', '7')

        return win.fetch('http://localhost:3001/api/files/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${jwt}` },
          body: formData,
        })
          .then((r) => r.json())
          .then((data) => {
            downloadToken = data.downloadToken
          })
      })
    })
  })

  it('affiche les métadonnées du fichier sur la page de téléchargement', () => {
    cy.visit(`/download/${downloadToken}`)
    cy.contains('cypress-download-test.txt', { timeout: 8000 }).should('be.visible')
    cy.contains(/télécharger/i).should('be.visible')
  })

  it('retourne une erreur 404 pour un token inconnu', () => {
    cy.request({
      url: 'http://localhost:3001/api/files/info/token-inexistant',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })
})
