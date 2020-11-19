// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe("Change translation", function () {
  beforeEach(function () {
    cy.visit("/");
  });
  it("renders the en translation", function () {
    cy.get(".cy-translation-en").click();
    cy.get(".App-header-item").should("contain", "Home");
  });

  it("renders the fr translation", function () {
    cy.get(".cy-translation-fr").click();
    cy.get(".App-header-item").should("contain", "Accueil");
  });
});
