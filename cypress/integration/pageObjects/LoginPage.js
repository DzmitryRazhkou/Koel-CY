import MainPage from "./mainPage";

class LoginPage {
  // Get Title Page:
  validateTitlePage(titlePage) {
    cy.title().should("equal", titlePage);
    cy.log(" =====> " + titlePage + " <===== ");
    return this;
  }

  //   Login:
  login(email, password) {
    cy.get("input[type='email']").type(email).should("have.value", email);
    cy.get("input[type='password']")
      .type(password)
      .should("have.value", password);
    cy.get("button").click();
  }

  // Error Frame:
  errorFrame() {
    cy.get(".error").should("have.class", "error");
  }

  // Registration:
  register(email) {
    cy.get("#hel").click();
    cy.get("#email").type(email).should("have.value", email);
    cy.get("#button").click();
  }

  // Validate Restration:
  validateRegister(successMessage) {
    cy.get("h3").then((el) => {
      const msg = el.text();
      cy.log(" =====> " + msg + " <===== ");
      expect(msg).includes(successMessage);
    });
  }
}

export default LoginPage;
