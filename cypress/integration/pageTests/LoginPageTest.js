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

  it("AT_001 - Login With Correct Credentials Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const textmainPageValidation = koelMainPage.mainPage.validateMainPage;

    loginPage.validateTitlePage(titlePage);
    loginPage.doLogin(email, password);
    mainPage.validateMainPage(textmainPageValidation);
  });

  it("AT_002 - Login With Correct Credentials Thru API POST Call Test", () => {
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const responseCodeOk = koelLoginPage.loginPage.ok;
    const textmainPageValidation = koelMainPage.mainPage.validateMainPage;

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    mainPage.validateMainPage(textmainPageValidation);
  });

  it("AT_003 - Mock API GET Call After Successfull Login Test", () => {
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;

    const method = koelLoginPage.loginPage.method;
    const endPoint = koelLoginPage.loginPage.endPoint;
    const fixture = koelLoginPage.loginPage.fixture;

    loginPage.doLogin(email, password);
    loginPage.intercept(method, endPoint, fixture);
  });

  it("AT_004 - Login With Email Without '@' and Right Password Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const length = koelLoginPage.loginPage.length;
    const email = loginPage.generateString(length);
    const password = koelLoginPage.loginPage.wrongPassword;

    loginPage.validateTitlePage(titlePage);
    loginPage.doLogin(email, password);
  });

  it("AT_005 - Login With Correct Email and Wrong Password Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const length = koelLoginPage.loginPage.length;
    const email = loginPage.generateString(length);
    const password = loginPage.generateString(length);

    loginPage.validateTitlePage(titlePage);
    loginPage.doLogin(email, password);
  });

  it("AT_006 - Login With Correct Email and Right Password Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const email = faker.internet.email();
    const password = koelLoginPage.loginPage.wrongPassword;

    loginPage.validateTitlePage(titlePage);
    loginPage.doLogin(email, password);
    loginPage.errorFrame();
  });

  it("AT_007 - Login With Correct Email and Wrong Password Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const length = koelLoginPage.loginPage.length;
    const email = koelLoginPage.loginPage.email;
    const password = loginPage.generateString(length);

    loginPage.validateTitlePage(titlePage);
    loginPage.doLogin(email, password);
    loginPage.errorFrame();
  });

  it("AT_008 - Login With Incorrect Credentials Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const email = koelLoginPage.loginPage.wrongEmail;
    const password = koelLoginPage.loginPage.wrongPassword;

    loginPage.validateTitlePage(titlePage);
    loginPage.doLogin(email, password);
    loginPage.errorFrame();
  });

  it("AT_009 - Register A New Student Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const msg = koelLoginPage.loginPage.message;
    const email = faker.internet.email();

    loginPage.validateTitlePage(titlePage);
    loginPage.register(email);
    loginPage.validateRegisteration(msg);
  });

  it("AT_010 - Login and Log Out Using GUI Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;

    loginPage.doLogin(email, password);
    loginPage.doLogOut();
    loginPage.validateTitlePage(titlePage);
  });

  it("AT_011 - Login and Log Out Using API Test", () => {
    const titlePage = koelLoginPage.loginPage.pageTitle;
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const responseCodeOk = koelLoginPage.loginPage.ok;
    const textmainPageValidation = koelMainPage.mainPage.validateMainPage;

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    mainPage.validateMainPage(textmainPageValidation);
    loginPage.doLogOutThruAPI();
    loginPage.validateTitlePage(titlePage);
  });
});
