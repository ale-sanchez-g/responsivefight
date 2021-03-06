/// <reference types="cypress" />

context("COVID19 Mobile Battles", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("http://localhost:8080");

    let uname = Math.random().toString(20).substr(2, 6);

    // Create Warrior
    cy.get("#worrior_username").type(uname);
    cy.wait(1000); // this wait is needed to synch the page
    cy.get("#warrior").click();
    cy.wait(1000); // this wait is needed to synch the page
    cy.contains(uname).click();
  });

  it("User can choose from different battlefields", () => {
    //check all elements are visible on Page
    cy.get("#office_img").should("be.visible");
    cy.get("#office").should("have.attr", "href", "office");
    cy.get("#bus_img").should("be.visible");
    cy.get("#bus").should("have.attr", "href", "bus");
    cy.get("#restaurant_img").should("be.visible");
    cy.get("#restaurant").should("have.attr", "href", "restaurant");
  });

  it("Office battle", () => {
    cy.get("#office").click();
    cy.get("#staticBackdrop").should("be.visible");
    cy.get("#start").click();
    cy.get("#staticBackdrop").should("be.hidden");
    //check all elements are visible on Page
    cy.get("#img_office").should("be.visible");
    cy.get("#myProgress").should("be.visible");
    cy.get("#office_question_1").should("be.visible").contains("?");
    cy.get("#office_answer_1").should("be.visible");
    cy.get("#office_answer_2").should("be.visible");
    //End - check all elements are visible on Page

    //E2E TEST: Selecting the correct answer will present the success modal
    cy.wait(500); //for some reason we need to wait for the cookie to load
    cy.window().then((window) => {
      let correctAnswer = localStorage.getItem("busca");
      cy.log(correctAnswer);
      console.log(correctAnswer);
      cy.contains(correctAnswer).click();
    });
    cy.get("#staticBackdrop2").should("be.visible");
    cy.get("#close_modal_btn_1").click();
  });

  /// Due to new logic, we no longer record the correct answer.
  /// TODO: Need to upgrade to New cypress to better 
  it.skip("Bus battle", () => {
    cy.get("#bus").click();
    cy.get("#bus_intro_modal").should("be.visible");
    cy.get("#bus_timer_start").click();
    cy.get("#bus_intro_modal").should("be.hidden");
    //check all elements are visible on Page
    cy.get("#img_bus").should("be.visible");
    cy.get("#bus_progress").should("be.visible");
    cy.get("#bus_question_1").should("be.visible").contains("?");
    cy.get("#bus_answer_1").should("be.visible");
    cy.get("#bus_answer_2").should("be.visible");
    //End - check all elements are visible on Page

    //TEST the incorrect Modal is not present
    cy.get("#bus_incorrect_modal").should("not.be.visible");
    //E2E TEST: Selecting the correct answer will present the success modal
    cy.window().then((window) => {
      let correctAnswer = localStorage.getItem("busca");
      cy.log(correctAnswer);
      console.log(correctAnswer);
      cy.contains(correctAnswer).click();
    });
    cy.get("#bus_correct_modal").should("be.visible");
    cy.get("#close_correct_modal_btn").click();
  });

  it("Restaurant battle", () => {
    cy.get("#restaurant").click();
    cy.get("#restaurant_intro_modal").should("be.visible");
    cy.get("#restaurant_timer_start").click();
    cy.get("#restaurant_intro_modal").should("be.hidden");
    //check all elements are visible on Page
    cy.get("#img_restaurant").should("be.visible");
    cy.get("#restaurant_progress").should("be.visible");
    cy.get("#restaurant_title").contains("At the Restaurant ");
    cy.get("#restaurant_question_1").should("be.visible");
    cy.get("#restaurant_answer_1").should("be.visible");
    cy.get("#restaurant_answer_2").should("be.visible");
    //End - check all elements are visible on Page

    //TODO:ENABLE ONCE RESTAURANT COOKIE IS SET
    //TEST the incorrect Modal is not present
    cy.get("#restaurant_incorrect_modal").should("not.be.visible");
    //E2E TEST: Selecting the correct answer will present the success modal
    cy.wait(500); //for some reason we need to wait for the cookie to load
    cy.window().then((window) => {
      let correctAnswer = localStorage.getItem("busca");
      cy.log(correctAnswer);
      console.log(correctAnswer);
      cy.contains(correctAnswer).click();
    });
    cy.get("#restaurant_correct_modal").should("be.visible");
    cy.get("#close_correct_modal_btn").click();
  });
});
