const { LoginPage } = require("./LoginPage");
const { MainPage } = require("./MainPage");

class BasePage {
  constructor() {
    this.loginPage = new LoginPage();
    this.mainPage = new MainPage();
  }

  getLoginPage() {
    return this.loginPage;
  }
  getMainPage() {
    return this.mainPage;
  }
}

module.exports = { BasePage };
