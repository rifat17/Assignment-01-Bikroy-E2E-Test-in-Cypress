/// <reference types="cypress" />;
const Page = require("./Page");
const Locator = require("../locators/AdDetails");
class AdDetails extends Page {
  getHiddenContactNumberHtmlElement() {
    return cy.get(Locator.HiddenContactNumberHtmlElement);
  }
  getContactNumberHtmlElement() {
    return cy.get(Locator.ContactNumberHtmlElement);
  }

  getAdDescriptionHtmlElements() {
    return cy.get(Locator.AdDescriptionHtmlElement);
  }

  getSaveAdBtnHtmlElement() {
    return cy.get(Locator.SaveAdBtnHtmlElement);
  }
}

export default AdDetails;
