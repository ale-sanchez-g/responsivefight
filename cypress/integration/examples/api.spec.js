/// <reference types="cypress" />

describe('API Testing with Cypress', () => {

    beforeEach(() => {
        cy.request('http://localhost:8080/api/officeQuestions').as('office')
        cy.request('http://localhost:8080/api/busQuestions').as('bus')
        cy.request('http://localhost:8080/api/restaurantQuestions').as('restaurant')

        cy.request('http://localhost:8080/api/gqlbusQ').as('gqlbusQ')
        cy.request('http://localhost:8080/api/gqlresQ').as('gqlresQ')
        cy.request('http://localhost:8080/api/gqloffQ').as('gqloffQ')

        cy.request('http://localhost:8080/version.json').as('version')
      })

    it('Validate the version header', () => {
        cy.get('@version')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
    });
 
    it('Validate the version status code', () => {
        cy.get('@version')
            .its('status')
            .should('equal', 200);
    });
 
    it('Validate the version body', () => {
        cy.get('@version').its('body')
        .should('include',/^version/)
        .should('include',/^branch/)
        .should('include',/^commitId/);
    });

   it('Validate the Office header', () => {
       cy.get('@office')
           .its('headers')
           .its('content-type')
           .should('include', 'application/json');
   });

   it('Validate the Office status code', () => {
       cy.get('@office')
           .its('status')
           .should('equal', 200);
   });

   it('Validate the officeQuestions body', () => {
       cy.get('@office').its('body')
       .should('include',/^question/)
       .should('include',/^answer1/)
       .should('include',/^answer2/)
       .should('include',/^solution/)
       .should('include',/^correctAnswer/)
       .should('include',/^score/);
   });

   it('Validate the Bus header', () => {
    cy.get('@bus')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json');

    });

    it('Validate the Bus status code', () => {
        cy.get('@bus')
            .its('status')
            .should('equal', 200);
    });
 
    it('Validate the BusQuestions body', () => {
        cy.get('@bus').its('body')
        .should('include',/^question/)
        .should('include',/^answer1/)
        .should('include',/^answer2/)
        .should('include',/^solution/)
        .should('include',/^correctAnswer/)
        .should('include',/^score/);
    });

    it('Validate the restaurant header', () => {
        cy.get('@restaurant')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
    
        });
    
        it('Validate the restaurant status code', () => {
            cy.get('@restaurant')
                .its('status')
                .should('equal', 200);
        });
     
        it('Validate the restaurantQuestions body', () => {
            cy.get('@restaurant').its('body')
            .should('include',/^question/)
            .should('include',/^answer1/)
            .should('include',/^answer2/)
            .should('include',/^solution/)
            .should('include',/^correctAnswer/)
            .should('include',/^score/);
        });
        it('Validate the gqlbusQ call', () => {
            cy.get('@gqlbusQ')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json');
            cy.get('@gqlbusQ')   
                .its('status')
                .should('equal', 200);
            cy.get('@gqlbusQ').its('body')
                .its('body')
                .should('include',/^question/)
                .should('include',/^answer1/)
                .should('include',/^answer2/)
                .should('include',/^score/);
        });

        it('Validate the gqloffQ call', () => {
            cy.get('@gqloffQ')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json');
            cy.get('@gqloffQ')   
                .its('status')
                .should('equal', 200);
            cy.get('@gqloffQ').its('body')
                .its('body')
                .should('include',/^question/)
                .should('include',/^answer1/)
                .should('include',/^answer2/)
                .should('include',/^score/);
        });

        it('Validate the gqlresQ call', () => {
            cy.get('@gqlresQ')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json');
            cy.get('@gqlresQ')   
                .its('status')
                .should('equal', 200);
            cy.get('@gqlresQ').its('body')
                .its('body')
                .should('include',/^question/)
                .should('include',/^answer1/)
                .should('include',/^answer2/)
                .should('include',/^score/);
        });
    });
