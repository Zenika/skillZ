// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe("Home page", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("renders the home page", function () {
    cy.get(".content").should("contain", "home");
  });
});

describe("Profile page", function () {
  beforeEach(function () {
    cy.visit("/profile");
    cy.wait(500);
  });

  it("renders the profile page", function () {
    cy.get(".content").should("contain", "profile");
  });
});
