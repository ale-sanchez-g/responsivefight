/// <reference types="cypress" />

context('COVID19 Mobile Battles', () => {
    beforeEach(() => {
      cy.viewport('iphone-6')
      cy.visit('http://localhost:8080')
    })
  
    it('Office battle', () => {      
      cy.get('#start').click()
      cy.get('#office').click()
      cy.get('#office_title').contains('At the Office') 
      cy.get('#office_question_1')
      .should('be.visible')
      cy.get('#office_answer_1')
      .should('be.visible')
      cy.get('#office_answer_2')
      .should('be.visible')
      cy.get('#img-office')
      .should('be.visible')
    })

    it('Bus battle', () => {
      cy.get('#start').click()
      cy.get('#bus').click()
      cy.get('#bus_title').contains('Inside the Bus') 
      cy.get('#bus_question_1')
      .should('be.visible')
      cy.get('#bus_answer_1')
      .should('be.visible')
      cy.get('#bus_answer_2')
      .should('be.visible')
      cy.get('#img-bus')
      .should('be.visible')
    })

    it('Restaurant battle', () => {
      cy.get('#start').click()
      cy.get('#restaurant').click() 
      cy.get('#restaurant_title').contains('At the Restaurant ')             
      cy.get('#restaurant_question_1')
      .should('be.visible')
      cy.get('#office_answer_1')
      .should('be.visible')
      cy.get('#office_answer_2')
      .should('be.visible')
      cy.get('#img-Restaurant')
      .should('be.visible')
      })
  })