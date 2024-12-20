/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("profile", () => {
  before(() => {
    cy.session("profile", () => {
      cy.login();
    });
  });

  it("should successfully view profile onboarding", () => {
    cy.visit("/profile");
    cy.findAllByText(
      "To fully utilize Skillz, please fill out your agency."
    ).should("have.length", 1);
  });

  it("should successfully update agency", () => {
    cy.visit("/profile");
    cy.findByText("Select my agency").click();
    cy.findByText("Brest").click();
    cy.reload();
    cy.findByText("Brest").should("exist");
    cy.findByText("Zenika Brest").should("exist");
  });

  it("should successfully add preferred topics", () => {
    cy.visit("/profile");

    // Add topics
    cy.findByText("Infrastructure / Ops").click({ force: true });
    cy.findByText("Business").click({ force: true });
    cy.findByText("Quality assurance").click({ force: true });

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
    cy.visit("/profile");

    // Add topics
    cy.findByText("Infrastructure / Ops").click({ force: true });
    cy.findByText("Business").click({ force: true });
    cy.findByText("Quality assurance").click({ force: true });

    cy.findByText("Infrastructure / Ops")
      .parent()
      .should("not.have.class", "gradient-red");
    cy.findByText("Business").parent().should("not.have.class", "gradient-red");
    cy.findByText("Quality assurance")
      .parent()
      .should("not.have.class", "gradient-red");
  });

  it("should successfully add a certification", () => {
    cy.visit("/profile");

    // Select a certification
    cy.findByRole("button", { name: "Add a certification" }).click();
    cy.findByText("Add Cert").should("exist");

    cy.findByRole("button", { name: "Certifications I have it!" }).click();
    cy.findByText("Select a cert").click();
    cy.findByText("Google - Professional Cloud Developer").click();
    cy.findByPlaceholderText("Select a date").type("2022-09-22");

    cy.findByRole("button", { name: "Confirm" }).click();

    // Check successfully saved
    cy.findByText("Certifications were successfully updated").should("exist");
  });

  it("should successfully remove a certification", () => {
    cy.visit("/profile");

    // Check that certifications section exists
    cy.findByText("Certifications").should("exist");

    // Open certification
    cy.findByText("Google - Professional Cloud Developer").parent().click();

    // Delete it
    cy.findByRole("button", { name: "Delete" }).click();

    // Check successfully deleted
    cy.findByText("Certification was successfully deleted").should("exist");
  });

  after(() => {
    cy.logout();
    cy.wait(3000);
    Cypress.session.clearAllSavedSessions();
  });
});
