/// <reference types="cypress" />

describe("API Testing with Cypress", () => {
  beforeEach(() => {
    cy.request("http://localhost:8080/api/officeQuestions").as("office");
    cy.request("http://localhost:8080/api/restaurantQuestions").as(
      "restaurant"
    );

    cy.request("http://localhost:8080/api/gqlbusQ").as("gqlbusQ");
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

  it("Validate the Office header", () => {
    cy.get("@office")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
  });

  it("Validate the Office status code", () => {
    cy.get("@office").its("status").should("equal", 200);
  });

  it("Validate the officeQuestions body", () => {
    cy.get("@office")
      .its("body")
      .should("include", /^question/)
      .should("include", /^answer1/)
      .should("include", /^answer2/)
      .should("include", /^solution/)
      .should("include", /^correctAnswer/)
      .should("include", /^score/);
  });

  it("Validate the restaurant header", () => {
    cy.get("@restaurant")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
  });

  it("Validate the restaurant status code", () => {
    cy.get("@restaurant").its("status").should("equal", 200);
  });

  it("Validate the restaurantQuestions body", () => {
    cy.get("@restaurant")
      .its("body")
      .should("include", /^question/)
      .should("include", /^answer1/)
      .should("include", /^answer2/)
      .should("include", /^solution/)
      .should("include", /^correctAnswer/)
      .should("include", /^score/);
  });
  it("Validate the gqlbusQ call", () => {
    cy.get("@gqlbusQ")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
    cy.get("@gqlbusQ").its("status").should("equal", 200);
    cy.get("@gqlbusQ")
      .its("body")
      .its("body")
      .should("include", /^question/)
      .should("include", /^answer1/)
      .should("include", /^answer2/)
      .should("include", /^score/);
  });

  it("Validate the gqloffice call, index 0", () => {
    cy.request({
      url: `http://localhost:8080/api/fetchquestion`,
      qs: {
        btlfld: "off_1",
      }
  }).as("gqloffQ");

    cy.get("@gqloffQ")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
    cy.get("@gqloffQ").its("status").should("equal", 200);
    cy.get("@gqloffQ").then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body.id).to.contain("off") // true
        expect(response.body.question).to.exist // true
        expect(response.body.answer1).to.exist // true
        expect(response.body.answer2).to.exist // true
        expect(response.body.score).to.exist // true

      }); 
  });

  it("Validate the gqlresQ call, index 0", () => {
    cy.request({
      url: `http://localhost:8080/api/fetchquestion`,
      qs: {
        btlfld: "res",
        index: 0,
      }
  }).as("gqlresQ");
    
    cy.get("@gqlresQ")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
    cy.get("@gqlresQ").its("status").should("equal", 200);
    cy.get("@gqlresQ").then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body.id).to.contain("res") // true
        expect(response.body.question).to.exist // true
        expect(response.body.answer1).to.exist // true
        expect(response.body.answer2).to.exist // true
        expect(response.body.score).to.exist // true

      }); 
  });

  it("Validate the checkanswer api", () => {
    
    let correctBody = { "stage": "test", "answer": "yes"};
    let incorrectBody = { "stage": "test", "answer": "no"};

    cy.request('POST', 'http://localhost:8080/api/checkanswer', correctBody).then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body.data.questions[0]).to.have.property('score', 1) // true
      }
    );

    cy.request('POST', 'http://localhost:8080/api/checkanswer', incorrectBody).then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body.data.questions.length).to.eq(0) // true
      }
    );

  });
});
