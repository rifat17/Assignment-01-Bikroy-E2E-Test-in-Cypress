/// <reference types="cypress" />;

// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("login", (email, password) => {
  console.log("login");
  cy.visit("https://bikroy.com/en");
  cy.contains("Log in").click();
  cy.contains("Continue with Email").click();
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(password);
  cy.get("button[type=submit]").contains("Login").as("loginBtn");
  cy.get("@loginBtn").click();
});

Cypress.Commands.add("logout", () => {
  cy.get(".ui-nav-item.nav-dashboard")
    .click()
    .get("li.no-sub:nth-child(5) > a:nth-child(1)")
    .click()
    .get(".ui-panel.is-logout.is-rounded")
    .click();
});
