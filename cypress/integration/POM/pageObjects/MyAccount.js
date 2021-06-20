/// <reference types="cypress" />

const Page = require("./Page");
const Locator = require("../locators/MyAccount");

export default class MyAccount extends Page {
  getFavoritesHtmlElementLink() {
    return cy.get(Locator.FavoriteHtmlElementLink);
  }
  getFavoritesHeaderHtmlElementH2() {
    return cy.get(Locator.FavoriteHeading);
  }
}
