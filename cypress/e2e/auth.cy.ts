const email = `cypress_${Date.now()}@test.com`
const password = 'Test1234!'

describe('Authentification', () => {
  it('permet de créer un compte puis de se connecter', () => {
    // Inscription
    cy.visit('/register')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').first().type(password)
    cy.get('input[type="password"]').last().type(password)
    cy.get('button[type="submit"]').click()

    // Redirigé vers login ou accueil après inscription
    cy.url().should('not.include', '/register')

    // Connexion
    cy.visit('/login')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()

    // Redirigé vers l'accueil après connexion
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })

  it('affiche une erreur avec des identifiants incorrects', () => {
    cy.visit('/login')
    cy.get('input[type="email"]').type('inexistant@test.com')
    cy.get('input[type="password"]').type('mauvaismdp')
    cy.get('button[type="submit"]').click()

    cy.contains(/identifiants|invalide|incorrect|erreur/i).should('be.visible')
  })
})
