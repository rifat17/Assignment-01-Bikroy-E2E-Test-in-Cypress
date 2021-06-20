/// <reference types="cypress" />;

module.exports = class Page {
  baseUrl = "https://bikroy.com/en";

  visit(path = "") {
    return cy.visit(`${this.baseUrl}/${path}`);
  }

  getPageTitle() {
    return cy.title();
  }

  scrollToCenter() {
    cy.scrollTo("center", { easing: "linear" });
  }

  getCurrentUrl() {
    return cy.url();
  }
};
