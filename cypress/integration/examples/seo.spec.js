/// <reference types="cypress" />

describe('API Testing with Cypress', () => {

    beforeEach(() => {
        cy.request('http://localhost:8080/robots.txt').as('robots')
      })

    it('Validate the robots header', () => {
        cy.get('@robots')
            .its('headers')
            .its('content-type')
            .should('include', 'text/plain');
    });
 
    it('Validate the robots status code', () => {
        cy.get('@robots')
            .its('status')
            .should('equal', 200);
    });

});