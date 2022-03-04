/// <reference types="cypress" />

describe("API Testing with Cypress", () => {
  beforeEach(() => {
    cy.request("http://localhost:8080/version.json").as("version");
  });

  it("Validate the version header", () => {
    cy.get("@version")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
  });

  it("Validate the version status code", () => {
    cy.get("@version").its("status").should("equal", 200);
  });

  it("Validate the version body", () => {
    cy.get("@version")
      .its("body")
      .should("include", /^version/)
      .should("include", /^branch/)
      .should("include", /^commitId/);
  });

  it("Validate the gqloffice call, index 0", () => {
    cy.request({
      url: `http://localhost:8080/api/fetchquestion`,
      qs: {
        btlfld: "off_1",
      },
    }).as("gqloffQ");

    cy.get("@gqloffQ")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
    cy.get("@gqloffQ").its("status").should("equal", 200);
    cy.get("@gqloffQ").then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.body.id).to.contain("off"); // true
      expect(response.body.question).to.exist; // true
      expect(response.body.answer1).to.exist; // true
      expect(response.body.answer2).to.exist; // true
      expect(response.body.score).to.exist; // true
    });
  });

  it("Validate the gqlresQ call, index 0", () => {
    cy.request({
      url: `http://localhost:8080/api/fetchquestion`,
      qs: {
        btlfld: "res",
        index: 0,
      },
    }).as("gqlresQ");

    cy.get("@gqlresQ")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
    cy.get("@gqlresQ").its("status").should("equal", 200);
    cy.get("@gqlresQ").then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.body.id).to.contain("res"); // true
      expect(response.body.question).to.exist; // true
      expect(response.body.answer1).to.exist; // true
      expect(response.body.answer2).to.exist; // true
      expect(response.body.score).to.exist; // true
    });
  });

  it("Validate the checkanswer api", () => {
    let correctBody = { stage: "test", answer: "yes" };
    let incorrectBody = { stage: "test", answer: "no" };

    cy.request(
      "POST",
      "http://localhost:8080/api/checkanswer",
      correctBody
    ).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.body.data.questions[0]).to.have.property("score", 1); // true
    });

    cy.request(
      "POST",
      "http://localhost:8080/api/checkanswer",
      incorrectBody
    ).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.body.data.questions.length).to.eq(0); // true
    });
  });

  it("Register User", () => {
    let uname = Math.random().toString(20).substr(2, 6);
    let correctBody = { username: uname, password: "pwd" };
    let incorrectBody = '';

    cy.request(
      "POST",
      "http://localhost:8080/api/registeruser",
      correctBody
    ).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/registeruser",
      body: incorrectBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });

  });

  it("Login User", () => {
    let uname = Math.random().toString(20).substr(2, 6);
    let correctBody = { username: "test", password: "pwd" };
    let incorrectBody = '';

    cy.request(
      "POST",
      "http://localhost:8080/api/login",
      correctBody
    ).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/login",
      body: incorrectBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });

  });
});
