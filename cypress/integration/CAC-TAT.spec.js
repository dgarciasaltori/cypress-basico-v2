/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim dolor sit amet gravida hendrerit. Nunc volutpat quam quis porttitor faucibus. Vestibulum dapibus magna mauris, sollicitudin varius ipsum dapibus non. Mauris quis urna non risus sagittis ullamcorper at ac velit. In maximus euismod aliquam. Vestibulum ac blandit magna. Nunc sit amet nulla cursus turpis consectetur fringilla. Nam ut ligula in lorem congue fringilla et a libero. Suspendisse vitae ante sit amet ex feugiat pellentesque at auctor ligula. Phasellus lobortis volutpat ornare. Proin vestibulum pellentesque lacus, id vehicula magna imperdiet sit amet.'
    cy.get('#firstName').type('Diego')
    cy.get('#lastName').type('Saltori')
    cy.get('#email').type('diego@exemplo.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function() {
    cy.get('#firstName').type('Diego')
    cy.get('#lastName').type('Saltori')
    cy.get('#email').type('diego@exemplo,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio quando preenchido com valor não-numerico', function(){
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Diego')
    cy.get('#lastName').type('Saltori')
    cy.get('#email').type('diego@exemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type('Diego')
      .should('have.value', 'Diego')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Saltori')
      .should('have.value', 'Saltori')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('diego@exemplo.com')
      .should('have.value', 'diego@exemplo.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('0123456')
      .should('have.value', '0123456')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  it.only('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
})

