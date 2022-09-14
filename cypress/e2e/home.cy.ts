describe("Home page", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("renders the home page", function () {
    cy.get("[data-cy=content]").should("contain", "Home");
  });
});
