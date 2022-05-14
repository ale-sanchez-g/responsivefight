/// <reference types="cypress" />

context("COVID19 Battles", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("Register new user", () => {
    cy.intercept("POST", "/api/registeruser", {
      statusCode: 200,
      body: "User created"
    });

    cy.get("#rego").click();
    cy.get("#uname").type("test_user");
    cy.get("#pwd").type("test_password");
    cy.get("#psw-repeat").type("test_password");
    cy.get("#signupbtn").click();
    cy.get("#login").should("be.visible");
  });

  it("10 digit username", () => {
    cy.get("#login").click();
    // Create Warrior
    cy.get("#worrior_username").type("1234567890");
    cy.get("#worrior_pwd").type("pwd");
    cy.wait(1000); // this wait is needed to synch the page
    cy.get("#warrior").click();
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains("1234567890");
  });

  it("11 digit username", () => {
    cy.get("#login").click();
    // Create Warrior
    cy.get("#worrior_username").type("12345678901");
    cy.get("#worrior_pwd").type("pwd");
    cy.wait(1000); // this wait is needed to synch the page
    cy.get("#warrior").click();
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains("1234567890");
  });

  it("%5c username", () => {
    cy.get("#login").click();
    // Create Warrior
    cy.get("#worrior_username").type("%5c");
    cy.get("#worrior_pwd").type("pwd");
    cy.wait(1000); // this wait is needed to synch the page
    cy.get("#warrior").click();
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains("%5c").click;
  });
});
