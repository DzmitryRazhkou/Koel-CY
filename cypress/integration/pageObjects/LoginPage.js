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
  };

  /*
  Login API Call:
  */

  loginThruAPICall() {
    cy.token().then(() => {
      cy.visit(Cypress.env("url"), {
        onBeforeLoad: (window) => {
          window.localStorage.setItem("api-token", Cypress.env("api-token"));
        },
      });
    });
  }

  // Get Title Page:
  validateTitlePage(titlePage) {
    cy.title().should("equal", titlePage);
    cy.log(" =====> " + titlePage + " <===== ");
    return this;
  }

  //   Login:
  login(email, password) {
    this.loginPageLocators.EMAIL_FIELD().as("emailField");
    this.loginPageLocators.PSW_FIELD().as("password");
    this.loginPageLocators.LOGIN_BTN().as("signIn");

    cy.get("@emailField").type(email).should("have.value", email);
    cy.get("@password").type(password).should("have.value", password);
    cy.get("@signIn").should("be.visible").click();
  }

  // Error Frame:
  errorFrame() {
    this.loginPageLocators.ERROR_FRAME().as("errorFrame");
    cy.get("@errorFrame").should("have.class", "error");
  }

  // Registration:
  register(email) {
    this.loginPageLocators.REGISTRATION_BTN().as("registrationBtn");
    cy.get("@registrationBtn").click();

    this.loginPageLocators.EMAIL_FIELD_REGISTRATION_PAGE().as("email");
    cy.get("@email").type(email).should("have.value", email);

    this.loginPageLocators.REGISTER_BTN().as("registerBtn");
    cy.get("@registerBtn").should("be.visible").click();
  }

  // Validate Restration:
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
}

export default LoginPage;
