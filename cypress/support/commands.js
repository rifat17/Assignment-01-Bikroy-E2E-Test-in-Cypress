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

import HomePage from "../integration/POM/pageObjects/HomePage";
import LoginPage from "../integration/POM/pageObjects/Login";

Cypress.Commands.add("login", (email, password) => {
  console.log("login");
  const home = new HomePage();
  home.visit();
  home.getLoginFromNavBarHtmlElement().click();
  const loginPage = new LoginPage();
  loginPage.login(email, password);
});

Cypress.Commands.add("logout", () => {
  cy.get(".ui-nav-item.nav-dashboard")
    .click()
    .get("li.no-sub:nth-child(5) > a:nth-child(1)")
    .click()
    .get(".ui-panel.is-logout.is-rounded")
    .click();
});
