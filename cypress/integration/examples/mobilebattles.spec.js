/// <reference types="cypress" />

context("COVID19 Mobile Battles", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("http://localhost:8080");

    // let uname = Math.random().toString(20).substr(2, 6);
    cy.get("#login").click();

    // Create Warrior
    cy.get("#worrior_username").type("test");
    cy.get("#worrior_pwd").type("pwd");
    cy.wait(1000); // this wait is needed to synch the page
    cy.get("#warrior").click();
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains("test").click();
  });

  it("Single page battle Correct Answer", () => {
    cy.intercept("GET", "/api/fetchquestion*", {
      fixture: "mockquestion.json",
    });
    cy.intercept("POST", "/api/checkanswer", { fixture: "mockcorrect.json" });

    cy.get("#news").click();
    cy.get("#introModal").should("be.visible");
    cy.contains("Start").click();
    cy.get("#introModal").should("be.hidden");
    //check all elements are visible on Page
    cy.get("#question").should("be.visible").contains("?");
    cy.get("#answer_1").should("be.visible");
    cy.get("#answer_2").should("be.visible");
    //End - check all elements are visible on Page

    //TEST the incorrect Modal is not present
    cy.get("#incorrectModal").should("not.be.visible");
    //E2E TEST: Selecting the correct answer will present the success modal
    cy.contains("yes").click();
    cy.get("#correctModal").should("be.visible");
    cy.contains("Continue").click();
    cy.get("#correctModal").should("not.be.visible");

  });
});
