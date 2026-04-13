const email = `cypress_dl_${Date.now()}@test.com`
const password = 'Test1234!'

describe('Téléchargement via lien', () => {
  let downloadToken: string

  before(() => {
    // Créer un compte
    cy.request('POST', 'http://localhost:3001/api/auth/register', { email, password })

    // Se connecter et récupérer le token JWT
    cy.request('POST', 'http://localhost:3001/api/auth/login', { email, password }).then((res) => {
      const jwt = res.body.access_token

      // Uploader un fichier via l'API
      const formData = new FormData()
      const blob = new Blob(['contenu test cypress'], { type: 'text/plain' })
      formData.append('file', blob, 'cypress-download-test.txt')
      formData.append('expirationDays', '7')

      cy.request({
        method: 'POST',
        url: 'http://localhost:3001/api/files/upload',
        headers: { Authorization: `Bearer ${jwt}` },
        body: formData,
      }).then((uploadRes) => {
        downloadToken = uploadRes.body.downloadToken
      })
    })
  })

  it('affiche les métadonnées du fichier sur la page de téléchargement', () => {
    cy.visit(`/download/${downloadToken}`)
    cy.contains('cypress-download-test.txt').should('be.visible')
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
