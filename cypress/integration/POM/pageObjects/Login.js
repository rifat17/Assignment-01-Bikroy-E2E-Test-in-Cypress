/// <reference types="cypress" />;
const Page = require("./Page");
import Locator from "../locators/LoginPage";
class LoginPage extends Page {
  getContinueWithEmailBtn() {
    return cy.get(Locator.ContinueWithEmailElement);
  }

  getLoginBtn() {
    return cy.get(Locator.LoginButton);
  }
  getInputEmailField() {
    return cy.get(Locator.EmailInputField);
  }

  getInputPasswordField() {
    return cy.get(Locator.EmailPasswordField);
  }

  getHtmlElementLoginError() {
    return cy.get(Locator.LoginErrorMessage);
  }

  getCurrentUrl() {
    return cy.url();
  }

  login(email, password) {
    this.getContinueWithEmailBtn().click();
    this.getInputEmailField().clear().type(email);
    this.getInputPasswordField().clear().type(password);
    this.getLoginBtn().click();
  }
}

export default LoginPage;
