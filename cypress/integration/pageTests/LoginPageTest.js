import { faker } from "@faker-js/faker";
import LoginPage from "../pageObjects/LoginPage";
import MainPage from "../pageObjects/MainPage";

const loginPage = new LoginPage();
const mainPage = new MainPage();

let koelLoginPage;
let koelMainPage;

describe("KOEL Login Page Features", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.launch();

    cy.fixture("loginPage").then((data) => {
      koelLoginPage = data;
      return koelLoginPage;
    });
    cy.fixture("mainPage").then((data) => {
      koelMainPage = data;
      return koelMainPage;
    });
  });

  after(() => {
    // cy.tearDown();
  });

  it.only("Login With Correct Credentials Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const textmainPageValidation = koelMainPage.mainPage.validateMainPage;

    loginPage.validateTitlePage(titlePage);
    loginPage.login(email, password);
    mainPage.validateMainPage(textmainPageValidation);
    // cy.tearDown();
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

  it.only("Register A New Student Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const msg = koelLoginPage.loginPage.message;
    const email = faker.internet.email();

    loginPage.validateTitlePage(titlePage);
    loginPage.register(email);
    loginPage.validateRegisteration(msg);
  });
});
