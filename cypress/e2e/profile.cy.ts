/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("profile", () => {
  before(() => {
    cy.session("profile", () => {
      cy.login();
    });
  });

  it("should successfully view profile", () => {
    cy.session("profile");
    cy.visit("/profile");
    cy.findAllByText(Cypress.env("test_username")).should("have.length", 2);
  });

  it("should successfully update agency", () => {
    cy.session("profile");
    cy.visit("/profile");
    cy.findByText("Select my agency").click();
    cy.findByText("Brest").click();
    cy.reload();
    cy.findByText("Brest").should("exist");
    cy.findByText("Zenika Brest").should("exist");
  });

  it("should successfully add preferred topics", () => {
    cy.session("profile");
    cy.visit("/profile");

    // Add topics
    cy.findByText("Infrastructure / Ops").click();
    cy.findByText("Business").click();
    cy.findByText("Quality assurance").click();

    // Check that topic is correctly registered
    cy.reload();

    cy.findByText("Infrastructure / Ops")
      .parent()
      .should("have.class", "gradient-red");
    cy.findByText("Business").parent().should("have.class", "gradient-red");
    cy.findByText("Quality assurance")
      .parent()
      .should("have.class", "gradient-red");
  });

  it("should successfully remove preferred topics", () => {
    cy.session("profile");
    cy.visit("/profile");

    // Add topics
    cy.findByText("Infrastructure / Ops").click();
    cy.findByText("Business").click();
    cy.findByText("Quality assurance").click();

    cy.findByText("Infrastructure / Ops")
      .parent()
      .should("not.have.class", "gradient-red");
    cy.findByText("Business").parent().should("not.have.class", "gradient-red");
    cy.findByText("Quality assurance")
      .parent()
      .should("not.have.class", "gradient-red");
  });

  it("should successfully add a certification", () => {
    cy.session("profile");
    cy.visit("/profile");

    // Select a certification
    cy.findByRole("button", { name: "Add a certification" }).click();
    cy.findByText("Add Cert").should("exist");

    cy.findByRole("button", { name: "I have it!" }).click();
    cy.findByText("Select a cert").click();
    cy.findByText("Google - Professional Cloud Developer").click();
    cy.findByPlaceholderText("Select a date").type("2022-09-22");

    cy.findByRole("button", { name: "Confirm" }).click();

    // Check successfully saved
    cy.findByText("Certifications were successfully updated").should("exist");
  });

  it("should successfully remove a certification", () => {
    cy.session("profile");
    cy.visit("/profile");

    // Check that certifications section exists
    cy.findByText("Certifications").should("exist");

    // Open certification
    cy.findByText("Google - Professional Cloud Developer").parent().click();

    // Delete it
    cy.findByRole("button", { name: "Remove this certification" }).click();

    // Check successfully deleted
    cy.findByText("Certification was successfully deleted").should("exist");
  });

  after(() => {
    cy.logout();
    cy.wait(3000);
    Cypress.session.clearAllSavedSessions();
  });
});
