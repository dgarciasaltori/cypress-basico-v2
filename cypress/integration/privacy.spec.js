/// <reference types="Cypress" />

Cypress._.times(5, () => {
  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.get('#title').should('be.visible')
    cy.contains('Talking About Testing').should('be.visible')
  })
})
it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
  cy.visit('./src/index.html')
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

