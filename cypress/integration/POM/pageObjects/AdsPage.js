/// <reference types="cypress" />;
const Page = require("./Page");
const Locator = require("../locators/AdsPage");

class AdsPage extends Page {
  visit(path) {
    return super.visit(path);
  }

  getAllAdsHTMLElementsLi() {
    return cy.get(Locator.AllAdsInHtmlElementsLi);
  }
  getUrgentAdsHTMLElementCheckBtn() {
    return cy.get(Locator.UrgentAdsCheckBtnHtmlElement);
  }

  getAllCategoriesHTMLElementsLi() {
    return cy.get(Locator.AllCategoriesHtmlElements);
  }

  getCategoryMobileHtmlElement() {
    return this.getAllCategoriesHTMLElementsLi().contains("Mobile");
  }
  getCategoryLocationDhakaHtmlElement() {
    return this.getAllCategoriesHTMLElementsLi().contains("Dhaka");
  }

  getSearchBoxHtmlElement() {
    return cy.get(Locator.SearchBoxInputField);
  }

  getRandomAd() {
    let numOfPromotionalAd = 2;
    this.getAllAdsHTMLElementsLi()
      .then(($elements) => {
        // let indx = Math.floor(Math.random() * $elements.length);
        let indx = 5; //intentionally select 5th ad, random index may select 'promotional ad' which leads to assertion error

        // if (indx <= numOfPromotionalAd) {
        //   indx += numOfPromotionalAd - indx + 1;
        // }
        // console.log(indx);
        return $elements.find("a")[indx];
      })
      .then(($e) => {
        cy.wrap($e).click("center", { force: true });
      });
  }

  getLowestPriceAd() {
    let ads = this.getAllAdsHTMLElementsLi();
    let min_price = Number.POSITIVE_INFINITY;
    let min_price_ad = null;
    let tk = null;
    let indx = null;

    return ads.then(($elements) => {
      $elements.each((i, e) => {
        let tkText = e.getElementsByClassName(Locator.AdsPriceHtmlElement)[0]
          .textContent;

        // console.log(tkText);
        tkText = tkText.split(",").join("");
        // console.log(tkText);
        try {
          tk = parseInt(tkText.match(/Tk ?(\d+)/i)[1]);
          //   console.log(tk);
        } catch (error) {}

        if (tk != null) {
          if (tk < min_price) {
            min_price = tk;
            min_price_ad = e;
            indx = i;
          }
        }
      });

      return cy.wrap($elements[indx]).find("a").click();
      //   console.log(min_price);
      //   console.log(min_price_ad);
    });
  }
}

export default AdsPage;
