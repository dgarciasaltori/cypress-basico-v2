/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
      cy.visit('./src/privacy.html')
    })
    it('testa a página da política de privacidade de forma independente', () => {
        cy.get('#title').should('be.visible')
        cy.contains('Talking About Testing').should('be.visible')
      })
})
