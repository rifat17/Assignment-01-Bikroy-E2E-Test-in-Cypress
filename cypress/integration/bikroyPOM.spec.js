/// <reference types="cypress" />;

import Chance from "chance";
const chance = new Chance();
import HomePage from "./POM/pageObjects/HomePage";
import LoginPage from "./POM/pageObjects/Login";
import AdsPage from "./POM/pageObjects/AdsPage";
import AdDetails from "./POM/pageObjects/AdsDetails";
import MyAccount from "./POM/pageObjects/MyAccount";

describe("Testing Bikroy.com", () => {
  beforeEach(function () {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  afterEach(function () {
    cy.clearCookies();
  });

  it("TC-001: Open Bikroy Site in Browser", () => {
    const home = new HomePage();
    home.visit();
    home
      .getTitle()
      .should(
        "eq",
        "Bikroy.com - Electronics, Cars, Property and Jobs in Bangladesh"
      );
  });

  it("TC-003 Login", () => {
    const home = new HomePage();
    home.visit();
    home.getLoginFromNavBarHtmlElement().click();
    const loginPage = new LoginPage();
    loginPage.login("lowaci7232@threepp.com", "bikroy123456");
    loginPage.getCurrentUrl().should("not.contain", "login");
  });

  it("TC-004 Invalid Password", () => {
    const home = new HomePage();
    home.visit();
    home.getLoginFromNavBarHtmlElement().click();
    const loginPage = new LoginPage();
    loginPage.login("lowaci7232@threepp.com", "invalidPassword");
    loginPage.getCurrentUrl().should("contain", "login");
  });

  it("TC-005 Show all ads", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage.getAllAdsHTMLElementsLi().should("have.length.gt", 0);
  });

  it("TC-006 Show all urgent ads", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage.getUrgentAdsHTMLElementCheckBtn().click();
    adsPage.getAllAdsHTMLElementsLi().should("have.length.gt", 0);
  });

  it("TC-007 Display ads by Category 'Mobile'", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage.getCategoryMobileHtmlElement().should("be.visible").click();
    adsPage.getAllAdsHTMLElementsLi().should("have.length.gt", 0);
  });

  it("TC-008 Display ads by Location 'Dhaka'", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage.getCategoryLocationDhakaHtmlElement().should("be.visible").click();
    adsPage.getAllAdsHTMLElementsLi().should("have.length.gt", 0);
  });

  it("TC-009 Ads Search", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads/dhaka");
    adsPage
      .getSearchBoxHtmlElement()
      .clear()
      .type("Dell Laptop")
      .type("{enter}");
    adsPage.getAllAdsHTMLElementsLi().should("have.length.gt", 0);
  });

  it("TC-010 Search and count number of ads", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage
      .getSearchBoxHtmlElement()
      .clear()
      .type("Dell Laptop")
      .type("{enter}");
    adsPage.getAllAdsHTMLElementsLi().should("have.length.gt", 0);
  });

  it("TC-011 Get lowest price", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage.getLowestPriceAd();
    const adDetails = new AdDetails();
    adDetails.getPageTitle().should("have.length.gt", 0);
  });

  it("TC-013 Show to product details", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage.getRandomAd();
    const adDetails = new AdDetails();
    adDetails.getPageTitle().should("have.length.gt", 0);
  });

  it("TC-014 Show phone number", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage
      .getSearchBoxHtmlElement()
      .clear()
      .type("Dell Laptop{enter}", { force: true })
      .wait(2000);
    adsPage.getRandomAd();

    let adDetails = new AdDetails();
    adDetails.getHiddenContactNumberHtmlElement().click();
    adDetails
      .getContactNumberHtmlElement()
      .should("be.visible")
      .as("mobilenumber");

    cy.get("@mobilenumber").should(($e) => {
      $e.children().each((x, y, z) => {
        console.log(y.innerText);
        expect(y.innerText).to.be.length.greaterThan(0);
      });
    });
  });

  it("TC-015 Assert product description", () => {
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage
      .getSearchBoxHtmlElement()
      .clear()
      .type("Dell Laptop{enter}", { force: true })
      .wait(2000);
    adsPage.getRandomAd();

    let adDetails = new AdDetails();
    adDetails.scrollToCenter();
    adDetails.getAdDescriptionHtmlElements().should("have.length.gt", 0);
  });

  it("TC-018 Add product on Favorites", () => {
    cy.login("lowaci7232@threepp.com", "bikroy123456");
    const adsPage = new AdsPage();
    adsPage.visit("ads");
    adsPage
      .getSearchBoxHtmlElement()
      .clear()
      .type("Dell Laptop{enter}", { force: true })
      .wait(2000);
    adsPage.getRandomAd();

    let adDetails = new AdDetails();
    adDetails.getSaveAdBtnHtmlElement().click();
  });

  it("TC-019 Show to favorites product list", () => {
    cy.login("lowaci7232@threepp.com", "bikroy123456");
    let home = new HomePage();
    home.getNavBarMyAccountHtmlElement().click();
    let myAccount = new MyAccount();
    myAccount.getFavoritesHtmlElementLink().click();
    myAccount.getFavoritesHeaderHtmlElementH2().should("have.length.gt", 0);
  });

  it("TC-020 Assert Browse our top category", () => {
    const home = new HomePage();
    home.visit();
    home
      .getBrowseOurTopCategoryHtmlElement()
      .should("have.text", "Browse our top categories:");
  });

  it("TC-021 Open all Browse our top category link", () => {
    const home = new HomePage();
    home.visit();
    home.getBrowseOurTopCategoryLinksHTMLElement().each(($link) => {
      cy.visit($link.prop("href")).url().should("include", $link.prop("href"));
    });
  });
});
