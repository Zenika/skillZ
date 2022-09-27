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

  after(() => {
    cy.logout();
    Cypress.session.clearAllSavedSessions();
  });
});
