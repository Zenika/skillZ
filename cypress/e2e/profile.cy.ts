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

  after(() => {
    cy.logout();
    Cypress.session.clearAllSavedSessions();
  });
});
