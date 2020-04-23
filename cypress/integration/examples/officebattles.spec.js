/// <reference types="cypress" />

context('COVID19 Battles', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/office')
    })
  
    it('Office battle', () => {      
      cy.get('#staticBackdrop')
      .should('be.visible')
      cy.get('#start').click()
      cy.get('#staticBackdrop')
      .should('be.hidden')      
      //check all elements are visible on Page
      cy.get('#img_office')
      .should('be.visible')
      cy.get('#myProgress')
      .should('be.visible')      
      cy.get('#office_question_1')
      .should('be.visible')
      .contains('?')
      cy.get('#office_answer_1')
      .should('be.visible')
      cy.get('#office_answer_2')
      .should('be.visible')
      //End - check all elements are visible on Page
      
      //Test: Select CORRECT answer button should present CORRECT modal to user
      cy.get('#office_answer_2').click()
      cy.get('#staticBackdrop3')
      .should('be.visible')
      cy.get('#close_modal_btn_2').click()
      cy.get('#staticBackdrop3')
      .should('not.be.visible')

      //Test: Select CORRECT answer button should present CORRECT modal to user
      cy.get('#office_answer_1').click()
      cy.get('#staticBackdrop2')
      .should('be.visible')
      cy.get('#close_modal_btn_1').click()
    
      // User is sent back to the home page
      cy.get('#world_img')
      .should('be.visible')
    })

  })