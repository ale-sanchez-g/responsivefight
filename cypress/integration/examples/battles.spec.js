/// <reference types="cypress" />

context('COVID19 Battles', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    })
  
    it('Office battle', () => {
      cy.get('#start').click()
      cy.get('#staticBackdrop')
      .should('be.visible')
      cy.get('#start').click()
      cy.get('#staticBackdrop')
      .should('be.hidden')      
      //check all elements are visible on Page
      cy.get('#img-office')
      .should('be.visible')
      cy.get('#myProgress')
      .should('be.visible')      
      cy.get('#office_question_1')
      .should('be.visible')
      cy.get('#office_answer_1')
      .should('be.visible')
      cy.get('#office_answer_2')
      .should('be.visible')
      //End - check all elements are visible on Page
      
      //Test: Select CORRECT answer button should present CORRECT modal to user
      cy.get('#office_answer_1').click()
      cy.get('#staticBackdrop2')
      .should('be.visible')
      cy.get('#close_modal_btn_1').click()
      cy.get('#staticBackdrop2')
      .should('be.hidden')

      //Test: Select CORRECT answer button should present CORRECT modal to user
      cy.get('#office_answer_2').click()
      cy.get('#staticBackdrop3')
      .should('be.visible')
      cy.get('#close_modal_btn_2').click()
      cy.get('#staticBackdrop3')
      .should('be.hidden')
      
      
      cy.get('#office').click()
      cy.get('#img-office')
      .should('be.visible')
    })

    //TEST: timeout modal is visible on Page after interval
    it('Office battle', () => {
      cy.get('#start').click()
      cy.get('#staticBackdrop')
      .should('be.visible')
      cy.wait(2400)
      cy.get('#staticBackdrop4')
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