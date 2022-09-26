/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<Element>;
    logout(): Chainable<Element>;
    selectCustomSelect(id: string, index: number): Chainable<Element>;
    lengthCustomSelect(id: string, length: number): Chainable<Element>;
  }
}

/*
 * AUTHENTIFICATION
 */

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get('input[name="email"]').type(Cypress.env("test_username"));
  cy.get('input[name="password"]').type(Cypress.env("test_password"));
  cy.get(".auth0-lock-widget").submit({ timeout: 3000 }).wait(5000);
});

Cypress.Commands.add("logout", () => {
  cy.visit("/fr/logout");
});

/*
 * CUSTOM COMPONENTS
 */

Cypress.Commands.add("selectCustomSelect", (id: string, index: number) => {
  cy.get(`#${id}`).click();
  cy.get(`#${id} div div div span`).eq(index).click();
});

Cypress.Commands.add("lengthCustomSelect", (id: string, length: number) => {
  cy.get(`#${id}`).click();
  cy.get(`#${id} div div div span`).should("have.length", length);
  cy.get(`#${id}`).click();
});
