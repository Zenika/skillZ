/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

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

Cypress.Commands.add('login', () => {
    cy.visit('/');
    cy.get('input[name="email"]').type(Cypress.env('test_username'));
    cy.get('input[name="password"]').type(Cypress.env('test_password'));
    cy.get('.auth0-lock-widget').submit({ timeout: 3000 }).wait(5000);
});

Cypress.Commands.add('logout', () => {
    cy.visit('/fr/logout');
});

/*
 * CUSTOM COMPONENTS
 */

Cypress.Commands.add('selectCustomSelect', (id: string, index: number) => {
    cy.get(`#${id}`).click();
    cy.get(`#${id} div div div span`).eq(index).click();
});

Cypress.Commands.add('lengthCustomSelect', (id: string, length: number) => {
    cy.get(`#${id}`).click();
    cy.get(`#${id} div div div span`).should('have.length', length);
    cy.get(`#${id}`).click();
});
