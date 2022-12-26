class LoginPage {
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
    cy.get("input[type='email']").as("emailField");
    cy.get("input[type='password']").as("password");
    cy.get("button").as("signIn");

    cy.get("@emailField").type(email).should("have.value", email);
    cy.get("@password").type(password).should("have.value", password);
    cy.get("@signIn").click();
  }

  // Error Frame:
  errorFrame() {
    cy.get(".error").as("errorFrame");

    cy.get("@errorFrame").should("have.class", "error");
  }

  // Registration:
  register(email) {
    cy.get("#hel").as("registrationBtn");
    cy.get("@registrationBtn").click();

    cy.get("#email").as("email");
    cy.get("@email").type(email).should("have.value", email);

    cy.get("#button").as("registerBtn");
    cy.get("@registerBtn").click();
  }

  // Validate Restration:
  validateRegister(successMessage) {
    cy.get("h3").as("successfulMessage");

    cy.get("@successfulMessage").then((el) => {
      const msg = el.text();
      cy.log(" =====> " + msg + " <===== ");
      expect(msg).includes(successMessage);
    });
  }
}

export default LoginPage;
