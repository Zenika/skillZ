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
    cy.contains("Profile");
    cy.contains(Cypress.env("test_username"));
  });

  it("should successfully update agency", () => {
    cy.session("profile");
    cy.visit("/profile");
    cy.lengthCustomSelect("profile-select-agency", 15);
    cy.selectCustomSelect("profile-select-agency", 3);
    cy.reload();
    cy.contains("Brest");
  });

  it("should successfully update preferred topics", () => {
    cy.session("profile");
    cy.visit("/profile");

    // Check that all topics are displayed.
    cy.findByTestId("prefered-topics").within(() => {
      cy.findAllByRole("button").should("have.length", 22);
    });

    // Add a topic
    cy.findByTestId("prefered-topics").within(() => {
      cy.findAllByRole("button").eq(2).click();
    });

    // Check that topic is correctly registered
    cy.reload();
    cy.findByTestId("prefered-topics").within(() => {
      cy.get(".gradient-red span").first().contains("Infrastructure / Ops");
    });
  });

  it("should successfully add a certification", () => {
    cy.session("profile");
    cy.visit("/profile");

    // Check that certifications section exists
    cy.contains("Certifications");
    cy.findByTestId("certifications").within(() => {
      cy.findAllByRole("button").should("have.length", 1);
    });

    // Open modal
    cy.findByTestId("certifications").within(() => {
      cy.findByRole("button", { name: "+" }).click();
    });

    cy.findByTestId("certification-modal").contains("Add Cert");

    // Select a certification
    cy.findByTestId("certification-modal").within(() => {
      cy.findAllByRole("button").first().click();
      cy.selectCustomSelect("select-certification", 33);
      cy.get("input[type='date']").first().type("2022-09-22");
      cy.findByTestId("certification-confirm-button").click();
    });

    // Check successfully registered
    cy.contains("Certifications were successfully updated");
    cy.findByTestId("certifications").within(() => {
      cy.findAllByRole("button").should("have.length", 2);
    });
  });

  it("should successfully delete a certification", () => {
    cy.session("profile");
    cy.visit("/profile");

    // Check that certifications section exists
    cy.contains("Certifications");
    cy.findByTestId("certifications").within(() => {
      cy.findAllByRole("button").should("have.length", 2);
    });

    // Open certification
    cy.findByTestId("certifications").within(() => {
      cy.findAllByRole("button").first().click();
    });

    // Delete it
    cy.findByTestId("certification-delete-button").click();

    // Check successfully deleted
    cy.contains("Certification was successfully deleted");
    cy.findByTestId("certifications").within(() => {
      cy.findAllByRole("button").should("have.length", 1);
    });
  });

  after(() => {
    cy.logout();
    cy.wait(3000);
    Cypress.session.clearAllSavedSessions();
  });
});
