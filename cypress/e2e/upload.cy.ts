const email = `cypress_upload_${Date.now()}@test.com`
const password = 'Test1234!'

describe('Upload de fichier', () => {
  before(() => {
    // Créer le compte et se connecter
    cy.request('POST', 'http://localhost:3001/api/auth/register', { email, password })
    cy.visit('/login')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })

  it('permet d\'uploader un fichier et d\'obtenir un lien de partage', () => {
    cy.visit('/')

    // Ouvrir la modale d'upload
    cy.contains(/envoyer|partager|déposer/i).click()

    // Uploader le fichier via l'input
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-file.txt', { force: true })

    // Vérifier que le fichier est sélectionné
    cy.contains('test-file.txt').should('be.visible')

    // Lancer l'envoi
    cy.contains('button', /envoyer/i).click()

    // Vérifier le succès et la présence du lien
    cy.contains(/envoyé|succès/i, { timeout: 10000 }).should('be.visible')
    cy.contains('/download/').should('be.visible')
  })

  it('affiche le fichier dans Mon espace après upload', () => {
    cy.visit('/myspace')
    cy.contains('test-file.txt').should('be.visible')
    cy.contains(/expire dans/i).should('be.visible')
  })
})
