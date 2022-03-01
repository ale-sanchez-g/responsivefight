/// <reference types="cypress" />

context("COVID19 Battles", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("10 digit username", () => {
    cy.get("#login").click();
    // Create Warrior
    cy.get("#worrior_username").type("1234567890");
    cy.wait(1000); // this wait is needed to synch the page
    cy.get("#warrior").click();
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains("1234567890");
  });

  it("11 digit username", () => {
    cy.get("#login").click();
    // Create Warrior
    cy.get("#worrior_username").type("12345678901");
    cy.wait(1000); // this wait is needed to synch the page
    cy.get("#warrior").click();
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains("1234567890");
  });

  it("6 digit username warning", () => {
    cy.get("#login").click();
    // Create Warrior    
    cy.get("#worrior_username").type("123456");
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains("Only use 10 characters");
  });

  it("%5c username", () => {
    cy.get("#login").click();
    // Create Warrior
    cy.get("#worrior_username").type("%5c");
    cy.wait(1000); // this wait is needed to synch the page
    cy.get("#warrior").click();
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains("%5c").click;
  });
});
