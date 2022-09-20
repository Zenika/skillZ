describe("login", () => {
  before(() => {
    cy.login();
  });

  it("should successfully view profile", () => {
    cy.visit("/fr/profile");
    cy.contains("Profile");
    cy.contains("dsi-ext@zenika.com");
    cy.contains(
      "Welcome to SkillZ ! We recommend you set your agency and prefered topics so your profile is complete"
    );
  });

  after(() => {
    cy.logout();
  });
});
