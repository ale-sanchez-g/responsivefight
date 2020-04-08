/// <reference types="cypress" />

context('COVID19 Battles', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    })
  
    it('Office battle', () => {
      cy.get('#start').click()
      cy.get('#office').click()
      cy.get('#img-office')
      .should('be.visible')
    })

    // it('Bus battle', () => {
    //     cy.get('#start').click()
    //     cy.get('#bus').click()
    //     cy.get('#img-bus')
    //     .should('be.visible')
    //   })

    //   it('Restaurant battle', () => {
    //     cy.get('#start').click()
    //     cy.get('#Restaurant').click()
    //     cy.get('#img-Restaurant')
    //     .should('be.visible')
    //   })
  })