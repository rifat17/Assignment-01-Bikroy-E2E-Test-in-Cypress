/// <reference types="cypress" />;

import Chance from "chance";
const chance = new Chance();

describe("Testing Bikroy.com", () => {
  beforeEach(function () {
    cy.clearCookies();
    // cy.visit("https://bikroy.com/en");
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it.skip("TC-001: Open Bikroy Site in Browser", () => {
    cy.title().should(
      "eq",
      "Bikroy.com - Electronics, Cars, Property and Jobs in Bangladesh"
    );
  });

  it.skip("TC-003 Login", () => {
    cy.contains("Log in").click();
    cy.contains("Continue with Email").click();
    cy.get("button").contains("Login").should("be.disabled");
    cy.get("input[name=email]").type("lowaci7232@threepp.com");
    cy.get("input[name=password]").type("bikroy123456");
    cy.get("button[type=submit]")
      .contains("Login")
      .should("be.enabled")
      .as("loginBtn");
    cy.get("@loginBtn").click();
    cy.clearCookies();
  });

  it.skip("TC-004 Invalid Password", () => {
    cy.contains("Log in").click();
    cy.contains("Continue with Email").click();
    cy.get("button").contains("Login").should("be.disabled");
    cy.get("input[name=email]").type("lowaci7232@threepp.com");
    cy.get("input[name=password]").type("bikroy12345");
    cy.get("button[type=submit]")
      .contains("Login")
      .should("be.enabled")
      .as("loginBtn");
    cy.get("@loginBtn").click();

    cy.get(".error-msg--2buvb").should("not.exist");
    // cy.wait(20000);

    cy.url().should("include", "login");

    // cy.get(".error-msg--2buvb > span").should(
    //   "contain.text",
    //   "The email or password you entered did not match our records. Please double-check and try again."
    // );
  });

  it.skip("TC-005 Show all ads", { defaultCommandTimeout: 10000 }, () => {
    cy.visit("https://bikroy.com/en");
    cy.get(
      ".ui-nav-item.force-show-label.browse-ads.gtm-hamburger-ads"
    ).click();

    cy.get("ul[data-testid=list]>li").should("have.length.gt", 0);
  });

  it.skip("TC-006 Show all urgent ads", () => {
    cy.visit("https://bikroy.com/en/ads");

    cy.get(
      "div:nth-child(2) > div:nth-child(2) > div > label > span:nth-child(2)"
    ).click();

    cy.get("ul[data-testid=list]>li").should("have.length.gt", 0);
  });

  it.skip("TC-007 Display ads by Category", () => {
    cy.visit("https://bikroy.com/en/ads");
    cy.get(".list-item--2dM7Z").contains("Mobile").should("be.visible").click();
    cy.get("ul[data-testid=list]>li").should("have.length.gt", 0);
  });

  it.skip("TC-008 Show ads by location", () => {
    cy.visit("https://bikroy.com/en/ads");
    cy.get(".list-item--2dM7Z").contains("Dhaka").should("be.visible").click();
    cy.get("ul[data-testid=list]>li").should("have.length.gt", 0);
  });

  it.skip("TC-009 Ads Search", () => {
    cy.visit("https://bikroy.com/en/ads/dhaka");
    cy.get("input[type=search]").clear().type("Dell Laptop").type("{enter}");
    cy.get("ul[data-testid=list]>li").should("have.length.gt", 0);
  });

  it.skip("TC-010 Search and count number of ads", () => {
    cy.visit("https://bikroy.com/en/ads/");
    cy.get("input[type=search]").clear().type("Dell Laptop{enter}");
    cy.get("ul[data-testid=list]>li").should("have.length.gt", 0);
  });

  it.skip("TC-011 Get lowest price", () => {
    cy.visit("https://bikroy.com/en/ads/");
    cy.get("input[type=search]").clear().type("Dell Laptop{enter}");
    cy.get("ul[data-testid=list]>li").should(($elements) => {
      $elements.each((i, e) => {
        let text = e.getElementsByClassName("price--3SnqI color--t0tGX")[0]
          .innerText;
        expect(text).not.to.be.undefined;
      });
    });
  });

  it.skip("TC-013 Show to product details", () => {
    cy.visit("https://bikroy.com/en/ads/");
    cy.get("input[type=search]").clear().type("Dell Laptop{enter}");
    cy.wait(1000);
    cy.get("ul[data-testid=list]", { defaultCommandTimeout: 10000 })
      .find("li:nth-child(5)")
      .find("a")
      .click();

    cy.get(".title--3s1R8").should("be.visible").should("have.length.gt", 0);
  });

  it.skip("TC-014 Show phone number", () => {
    cy.visit("https://bikroy.com/en/ads/");
    cy.get("input[type=search]").clear().type("Dell Laptop{enter}");
    cy.wait(1000);
    cy.get("ul[data-testid=list]", { defaultCommandTimeout: 10000 })
      .find("li:nth-child(5)")
      .find("a")
      .click();
    // .trigger("mouseup")

    cy.get(".contact-number--jkttb").click();
    cy.get(".call-button--3uvWj").should("be.visible").as("mobilenumber");
    cy.get("@mobilenumber").should(($e) => {
      $e.children().each((x, y, z) => {
        console.log(y.innerText);
        expect(y.innerText).to.be.length.greaterThan(0);
      });
    });
  });

  it.skip("TC-015 Assert product description", () => {
    cy.visit("https://bikroy.com/en/ads/");
    cy.get("input[type=search]").clear().type("Dell Laptop{enter}");
    cy.wait(1000);
    cy.get("ul[data-testid=list]", { defaultCommandTimeout: 10000 })
      .find("li:nth-child(5)")
      .find("a")
      .click();

    cy.scrollTo("center");

    cy.get(".description--1nRbz p")
      .should("be.visible")
      .should("have.length.gt", 0);
  });

  it.skip("TC-018 Add product on Favorites", () => {
    cy.login("lowaci7232@threepp.com", "bikroy123456");
    cy.visit("https://bikroy.com/en/ads/");
    cy.get("input[type=search]").clear().type("Dell Laptop{enter}");
    cy.wait(1000);
    cy.get("ul[data-testid=list]", { defaultCommandTimeout: 10000 })
      .find("li:nth-child(5)")
      .find("a")
      .click();

    cy.get(".cta--3cXbe > :nth-child(2) > .btn--1gFez").click();
  });

  it.skip("TC-019 Show to favorites product list", () => {
    cy.login("lowaci7232@threepp.com", "bikroy123456");
    cy.get(".ui-nav-item.nav-dashboard").click();
    cy.get(".ui-nav-stack > ul > :nth-child(3) > a").click();
    cy.title().should("eq", "My Favorites - Bikroy.com");
  });

  it.skip("TC-020 Assert Browse our top category", () => {
    cy.visit("https://bikroy.com/en");
    cy.get(".home-focus > .title").should(($e) => {
      console.log($e[0].innerText);
      expect($e[0].innerText).to.be.eq("Browse our top categories:");
    });
  });
  // cy.request(link.prop("href")).its(status).should("eq", 200);
  it("TC-021 Open all Browse our top category link", () => {
    cy.visit("https://bikroy.com/en");
    cy.get(".home-focus > .home-categories")
      .find("a")
      .each(($link) => {
        console.log($link);
        cy.request($link.prop("href")).its("status").should("eq", 200);
      });
  });
});
