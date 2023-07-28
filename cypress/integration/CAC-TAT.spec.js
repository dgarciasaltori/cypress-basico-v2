/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  const tresSeg_ms = 3000 
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim dolor sit amet gravida hendrerit. Nunc volutpat quam quis porttitor faucibus. Vestibulum dapibus magna mauris, sollicitudin varius ipsum dapibus non. Mauris quis urna non risus sagittis ullamcorper at ac velit. In maximus euismod aliquam. Vestibulum ac blandit magna. Nunc sit amet nulla cursus turpis consectetur fringilla. Nam ut ligula in lorem congue fringilla et a libero. Suspendisse vitae ante sit amet ex feugiat pellentesque at auctor ligula. Phasellus lobortis volutpat ornare. Proin vestibulum pellentesque lacus, id vehicula magna imperdiet sit amet.'
    cy.clock()
    cy.get('#firstName').type('Diego')
    cy.get('#lastName').type('Saltori')
    cy.get('#email').type('diego@exemplo.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    cy.tick(tresSeg_ms)
    cy.get('.success').should('not.be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').type('Diego')
    cy.get('#lastName').type('Saltori')
    cy.get('#email').type('diego@exemplo,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(tresSeg_ms)
    cy.get('.error').should('not.be.visible')
  })
  it('campo telefone continua vazio quando preenchido com valor não-numerico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Diego')
    cy.get('#lastName').type('Saltori')
    cy.get('#email').type('diego@exemplo.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(tresSeg_ms)
    cy.get('.error').should('not.be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
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
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(tresSeg_ms)
    cy.get('.error').should('not.be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })
  // it.only('selecionar texto aleatório', () => {
  //   cy.get('select option')
  //     .as('options')
  //     .its('length', { log: false }).then(n => {
  //       cy.get('@options', { log: false }).then($options => {
  //         const randomOptionIndex = Cypress._.random(n)
  //         const randomOptionText = $options[randomOptionIndex].innerText
  //         cy.get('select').select(randomOptionText)
  //       })
  //     })
  // })
  // it.only('selecionar texto aleatório', () => {
  //   cy.get('select option')
  //     .its('length', { log: false }).then(n => {
  //       cy.get('select').select(Cypress._.random(n))
  //     })
  // })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('have.value', 'ajuda')
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('have.value', 'elogio')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .check()
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"][value="email"')
      .check()
      .should('be.checked')
    cy.get('input[type="checkbox"][value="phone"')
      .check()
      .should('be.checked')
    cy.get('input[type="checkbox"][value="phone"]')
      .uncheck()
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/40bf5022f099e7030c11e17e50f4b3da.png')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('40bf5022f099e7030c11e17e50f4b3da.png')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/40bf5022f099e7030c11e17e50f4b3da.png', {action: 'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('40bf5022f099e7030c11e17e50f4b3da.png')
      })    
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      }) 
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.get('#title').should('be.visible')
  })
  it('exibe mensagem por 3 segundos', () => {
    cy.clock()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    const longTextInvoke = Cypress._.repeat('0123456789', 20)
  
    cy.get('#open-text-area')
      .invoke('val', longTextInvoke)
      .should('have.value', longTextInvoke)
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should((response) => {
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')

      })
    })
  it('encontrar o Gato na aplicação', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu ❤️ gatos!')
  })

})

