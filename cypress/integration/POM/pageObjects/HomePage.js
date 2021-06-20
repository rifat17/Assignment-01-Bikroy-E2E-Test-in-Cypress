/// <reference types="cypress" />;
const Page = require("./Page");
const Locator = require("../locators/HomePage");

class HomePage extends Page {
  visit() {
    return super.visit();
  }

  getTitle() {
    return super.getPageTitle();
  }
  getLoginFromNavBarHtmlElement() {
    return cy.get(Locator.NavBarLoginElement);
  }
  getNavBarAllAdsHtmlElement() {
    return cy.get(Locator.NavBarElementAllAds);
  }

  getBrowseOurTopCategoryHtmlElement() {
    return cy.get(Locator.BrowseOurTopCategoryHeading);
  }

  getBrowseOurTopCategoryLinksHTMLElement() {
    return cy.get(Locator.BrwoseOurTopCategoryLinks);
  }

  getNavBarMyAccountHtmlElement() {
    return cy.get(Locator.MyAccountHtmlElement);
  }
}

export default HomePage;
