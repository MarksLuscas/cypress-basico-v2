/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
        beforeEach('antes de todos os casos de teste', function() {
            cy.visit("./src/index.html")
        })

        it('verifica o título da aplicação', function() {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
    })

        it('preenche os campos obrigatórios e envia os formulários - ex 1', function () {
            const textoLongo = "texto texto texto texto texto texto texto texto texto texto texto texto texto"
            cy.get('#firstName').type("Lucas")
            cy.get('#lastName').type("Marques")
            cy.get('#email').type("lucas@teste.com")
            cy.get('#open-text-area').type(textoLongo, {delay: 10 } )
            cy.get('.button').click()
            cy.get('.success > strong').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida - ex 2', function() {
            cy.get('#firstName').type("Lucas")
            cy.get('#lastName').type("Marques")
            cy.get('#email').type("lucas.teste.com")
            cy.get('#open-text-area').type('texto')
            cy.get('.button').click()
            cy.get('.error').should('be.visible') 
        })

        it('validando campo de telefone continua vazio apos passar valor não-numerico - ex 3', function() {
            cy.get('#phone').should('be.empty')

            cy.get('#phone').type('aaasd')

            cy.get('#phone').should('be.empty')
        })

        it("seleciona um produto (YouTube) por seu texto", function () {
            cy.get('#product').select("youtube")

            cy.get('#product').should('have.value', 'youtube')

        })

        it("marca o tipo de atendimento Feedback", function () {
            cy.get('input[type="radio"][value="feedback"]').check()
        })

        it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function() {
            cy.get('a').should("have.attr", 'target', '_blank')
        })
  })
