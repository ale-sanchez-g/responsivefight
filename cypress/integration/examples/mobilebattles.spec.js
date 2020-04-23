/// <reference types="cypress" />

context('COVID19 Mobile Battles', () => {
    beforeEach(() => {
      cy.viewport('iphone-6')
      cy.visit('http://localhost:8080')
    })

    it('User can choose from different battlefields', () => {
      cy.get('#start').click()
      //check all elements are visible on Page
      cy.get('#world_img')
      .should('be.visible')
      cy.get('#office_img')
      .should('be.visible')
      cy.get("#office")
      .should('have.attr', 'href', 'office')      
      cy.get('#bus_img')
      .should('be.visible')
      cy.get("#bus")
      .should('have.attr', 'href', 'bus')  
      cy.get('#restaurant_img')
      .should('be.visible')
      cy.get("#restaurant")
      .should('have.attr', 'href', 'restaurant') 
    })
  
    it('Office battle', () => {      
      cy.get('#start').click()
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
      
      //Test: Select INCORRECT answer button should present INCORRECT modal to user
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

    it.skip('Bus battle', () => {      
      cy.get('#start').click()
      cy.get('#bus').click()
      cy.get('#bus_intro_modal')
      .should('be.visible')
      cy.get('#bus_timer_start').click()
      cy.get('#bus_intro_modal')
      .should('be.hidden')      
      //check all elements are visible on Page
      cy.get('#img_bus')
      .should('be.visible')
      cy.get('#bus_progress')
      .should('be.visible')      
      cy.get('#bus_question_1')
      .should('be.visible')
      .contains('?')
      cy.get('#bus_answer_1')
      .should('be.visible')
      cy.get('#bus_answer_2')
      .should('be.visible')
      //End - check all elements are visible on Page
      
      //Test: Select answer button should present modal A to user
      cy.get('#bus_answer_1').click()
      cy.get('#bus_correct_modal')
      .should('be.visible')
      cy.get('#close_correct_modal_btn').click()
      cy.get('#bus_correct_modal')
      .should('not.be.visible')

      //Test: Select answer button should present modal B to user
      cy.get('#bus_answer_2').click()
      cy.get('#bus_incorrect_modal')
      .should('be.visible')
      cy.get('#close_incorrect_modal_btn').click()
      cy.get('#bus_incorrect_modal')
      .should('not.be.visible')
    })

    it('Restaurant battle', () => {
      cy.get('#start').click()
      cy.get('#restaurant').click() 
      cy.get('#restaurant_intro_modal')
      .should('be.visible')
      cy.get('#restaurant_timer_start').click()
      cy.get('#restaurant_intro_modal')
      .should('be.hidden')      
      //check all elements are visible on Page      
      cy.get('#img_restaurant')
      .should('be.visible')
      cy.get('#restaurant_progress')
      .should('be.visible') 
      cy.get('#restaurant_title').contains('At the Restaurant ')             
      cy.get('#restaurant_question_1')
      .should('be.visible')
      cy.get('#restaurant_answer_1')
      .should('be.visible')
      cy.get('#restaurant_answer_2')
      .should('be.visible')
      //End - check all elements are visible on Page

      //Test: Select answer button should present modal A to user
      cy.get('#restaurant_answer_1').click()
      cy.get('#restaurant_correct_modal')
      .should('be.visible')
      cy.get('#close_correct_modal_btn').click()
      cy.get('#restaurant_correct_modal')
      .should('be.hidden')

      //Test: Select answer button should present modal B to user
      cy.get('#restaurant_answer_2').click()
      cy.get('#restaurant_incorrect_modal')
      .should('be.visible')
      cy.get('#close_incorrect_modal_btn').click()
      cy.get('#restaurant_incorrect_modal')
      .should('not.be.visible')
      })
  })