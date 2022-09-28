import LoginPage from "../pageObjects/LoginPage";
import MainPage from "../pageObjects/MainPage";
import { faker } from "@faker-js/faker";

describe("LoginPage Features", () => {
  let koelData;
  let loginPage;
  let mainPage;

  before(() => {
    cy.launch();
    cy.fixture("example").then((data) => {
      koelData = data;
      return koelData;
    });
  });

  after(() => {
    // cy.tearDown();
  });

  it("Login With Correct Credentials Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const titlePage = koelData.loginPage.pageTitle;
    const email = koelData.loginPage.email;
    const password = koelData.loginPage.password;
    const textmainPageValidation = koelData.mainPage.validateMainPage;

    loginPage.validateTitlePage(titlePage);
    loginPage.login(email, password);
    mainPage.validateMainPage(textmainPageValidation);
    cy.tearDown();
  });

  it("Login With Incorrect Credentials Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const titlePage = koelData.loginPage.pageTitle;
    const email = koelData.loginPage.wrongEmail;
    const password = koelData.loginPage.wrongPassword;

    loginPage.validateTitlePage(titlePage);
    loginPage.login(email, password);
    loginPage.errorFrame();
  });

  it("Register A New Student Test", () => {
    loginPage = new LoginPage();

    const titlePage = koelData.loginPage.pageTitle;
    const msg = koelData.loginPage.message;
    const email = faker.internet.email();

    loginPage.validateTitlePage(titlePage);
    loginPage.register(email);
    loginPage.validateRegister(msg);
  });
});
