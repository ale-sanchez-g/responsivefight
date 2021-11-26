/// <reference types="cypress" />

context("COVID19 Battles", () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/listusers", {
            fixture: "mockleaderboard.json",
          });
        cy.visit("http://localhost:8080/leaderboard");
    });
    
    it("User can see the leaderboard - mobile", () => {
        cy.viewport("iphone-6");
        cy.get("#showData").should("be.visible");
        // show list of mock users
        cy.contains("string");
        cy.contains("this is a very long text");
        cy.contains("12345");
        cy.contains("!@#$%^");
    });

    it("User can see the leaderboard - desktop", () => {
        cy.get("#showData").should("be.visible");
        // show list of mock users
        cy.contains("string");
        cy.contains("this is a very long text");
        cy.contains("12345");
        cy.contains("!@#$%^");
    });
});
