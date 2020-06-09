/// <reference types="cypress" />

context('COVID19 Battles', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/office')

      let uname =  Math.random().toString(20).substr(2, 6);
      
      // Create Warrior
      cy.get('#worrior_username').type(uname)
      cy.wait(1000) // this wait is needed to synch the page
      cy.get('#warrior').click()
      cy.wait(1000) // this wait is needed to synch the page
      cy.contains(uname).click()

    })
  
    it('Office battle', () => {      
      
      cy.get('#office').click()
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
      
      //E2E TEST: Selecting the correct answer will present the success modal
      cy.wait(500) //for some reason we need to wait for the cookie to load
      cy.window()
      .then((window) => {
        let correctAnswer = localStorage.getItem('busca')           
        cy.log(correctAnswer)
        console.log(correctAnswer); 
        cy.contains(correctAnswer).click();
      })         
      cy.get('#staticBackdrop2')
      .should('be.visible')
      cy.get('#close_modal_btn_1').click()
    })

  })