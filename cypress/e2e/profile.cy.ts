describe("profile", () => {
  before(() => {
    cy.session("profile", () => {
      cy.login();
    });
  });

  it("should successfully view profile", () => {
    cy.session("profile");
    cy.visit("http://localhost:3000/profile");
    cy.contains("Profile");
    cy.contains(Cypress.env("test_username"));
  });

  it("should successfully update agency", () => {
    cy.session("profile");
    cy.visit("http://localhost:3000/profile");
    cy.lengthCustomSelect("profile-select-agency", 15);
    cy.selectCustomSelect("profile-select-agency", 3);
    cy.reload();
    cy.contains("Brest");
  });

  it("should successfully update preferred topics", () => {
    cy.session("profile");
    cy.visit("http://localhost:3000/profile");

    // Check that all topics are displayed.
    cy.get("#prefered-topics button").should("have.length", 22);

    // Add a topic
    cy.get("#prefered-topics button").eq(2).click();

    // Check that topic is correctly registered
    cy.reload();
    cy.get("#prefered-topics .gradient-red span")
      .first()
      .contains("Infrastructure / Ops");
  });

  it("should successfully add a certification", () => {
    cy.session("profile");
    cy.visit("http://localhost:3000/profile");

    // Check that certifications section exists
    cy.contains("Certifications");
    cy.get("#certifications > div > button").should("have.length", 1);

    // Open modal
    cy.get("#certifications #add-certification").click();
    cy.get("#certification-modal").contains("Add Cert");

    // Select a certification
    cy.get("#certification-modal button").first().click();
    cy.selectCustomSelect("select-certification", 33);
    cy.get("#certification-modal input[type='date']")
      .first()
      .type("2022-09-22");
    cy.get("#certification-confirm-button").click();

    // Check successfully registered
    cy.contains("Certifications were successfully updated");
    cy.get("#certifications > div > button").should("have.length", 2);
  });

  it("should successfully delete a certification", () => {
    cy.session("profile");
    cy.visit("http://localhost:3000/profile");

    // Check that certifications section exists
    cy.contains("Certifications");
    cy.get("#certifications > div > button").should("have.length", 2);

    // Open certification
    cy.get("#certifications > div > button").first().click();

    // Delete it
    cy.get("#certification-delete-button").click();

    // Check successfully deleted
    cy.contains("Certification was successfully deleted");
    cy.get("#certifications > div > button").should("have.length", 1);
  });

  after(() => {
    cy.logout();
    cy.wait(3000);
    Cypress.session.clearAllSavedSessions();
  });
});
