
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Diego')
    cy.get('#lastName').type('Saltori')
    cy.get('#email').type('diego@exemplo.com')
    cy.get('#open-text-area').type('Teste de texto')
    cy.contains('button', 'Enviar').click()
})