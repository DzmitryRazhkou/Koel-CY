class LoginPage {
  loginPageLocators = {
    EMAIL_FIELD: () => cy.get("input[type='email']"),
    PSW_FIELD: () => cy.get("input[type='password']"),
    LOGIN_BTN: () => cy.get("button"),
    ERROR_FRAME: () => cy.get(".error"),
    REGISTRATION_BTN: () => cy.get("#hel"),
    EMAIL_FIELD_REGISTRATION_PAGE: () => cy.get("#email"),
    REGISTER_BTN: () => cy.get("#button"),
    REGISTRATION_SUCCESSFULL_MSG: () => cy.get("h3"),
    LOGOUT_BTN: () => cy.get("i[class='fa fa-sign-out']"),
  };

  doLoginThruAPICall(email, psw, code) {
    cy.token(email, psw, code).then(() => {
      cy.insertTokenIntoBrowser();
    });
  }

  validateTitlePage(titlePage) {
    cy.title().should("equal", titlePage);
    cy.log(" =====> " + titlePage.toUpperCase() + " <===== ");
    return this;
  }

  doLogin(email, password) {
    this.loginPageLocators.EMAIL_FIELD().as("emailField");
    this.loginPageLocators.PSW_FIELD().as("password");
    this.loginPageLocators.LOGIN_BTN().as("signIn");

    cy.get("@emailField").type(email).should("have.value", email);
    cy.get("@password").type(password).should("have.value", password);
    cy.get("@signIn").should("be.visible").click();
  }

  intercept(method, endpoint, fixture) {
    cy.intercept(method, endpoint, { fixture: fixture }).as("loginGETCall");
  }

  generateString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomStr = "";
    for (let i = 0; i < length; i++) {
      let randomInt = Math.floor(Math.random() * characters.length);
      randomStr += characters[randomInt];
    }
    return randomStr;
  }

  errorFrame() {
    this.loginPageLocators.ERROR_FRAME().as("errorFrame");
    cy.get("@errorFrame").should("have.class", "error");
  }

  register(email) {
    this.loginPageLocators.REGISTRATION_BTN().as("registrationBtn");
    cy.get("@registrationBtn").click();

    this.loginPageLocators.EMAIL_FIELD_REGISTRATION_PAGE().as("email");
    cy.get("@email").type(email).should("have.value", email);

    this.loginPageLocators.REGISTER_BTN().as("registerBtn");
    cy.get("@registerBtn").should("be.visible").click();
  }

  validateRegisteration(successMessage) {
    this.loginPageLocators
      .REGISTRATION_SUCCESSFULL_MSG()
      .as("successfulMessage");

    cy.get("@successfulMessage").then((el) => {
      const msg = el.text();
      cy.log(" =====> " + msg + " <===== ");
      expect(msg).to.be.include(successMessage);
    });
  }

  doLogOut() {
    this.loginPageLocators.LOGOUT_BTN().should("be.visible").click();
    cy.log(" =====> LOG OUT FROM KOEL <===== ");
  }

  doLogOutThruAPI() {
    cy.wait(100);
    cy.clearLocalStorage("api-token");
    cy.reload();
    cy.log(" =====> TOKEN HAS BEEN REMOVED FROM LOCAL STORAGE <===== ");
  }
}

export default LoginPage;
