import LoginPage from "../pageObjects/LoginPage";
import MainPage from "../pageObjects/MainPage";
import { faker } from "@faker-js/faker";

describe("Main Page Features", () => {
  let koelData;
  let loginPage;
  let mainPage;
  let receivedPlaylistName;
  let updatedPlayList;

  before(() => {
    cy.launch();
    cy.fixture("example").then((data) => {
      koelData = data;
      return koelData;
    });
  });

  after(() => {});

  it("Create A New PlayList Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const titlePage = koelData.loginPage.pageTitle;
    const email = koelData.loginPage.email;
    const password = koelData.loginPage.password;
    const textmainPageValidation = koelData.mainPage.validateMainPage;
    const playListName = faker.company.name();
    const greenPopUpMsg = koelData.mainPage.greenPopUp;

    loginPage.validateTitlePage(titlePage);
    loginPage.login(email, password);
    mainPage.validateMainPage(textmainPageValidation);
    receivedPlaylistName = mainPage.createNewPlayList(playListName);
    mainPage.successGreenPopUp(greenPopUpMsg);
    cy.log(" =====> " + receivedPlaylistName + " <===== ");
    cy.tearDown();
  });

  it("Rename A PlayList Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const email = koelData.loginPage.email;
    const password = koelData.loginPage.password;
    const playListName = faker.company.name();

    loginPage.login(email, password);
    cy.wait(1000);
    updatedPlayList = mainPage.renamePlayList(
      playListName,
      receivedPlaylistName
    );
    expect(updatedPlayList, playListName);
    cy.log(" =====> " + updatedPlayList + " <===== ");
  });
});
