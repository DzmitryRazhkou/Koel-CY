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
    const greenCreatedPopUpMsg = koelData.mainPage.greenCreatedPopUp;

    loginPage.validateTitlePage(titlePage);
    loginPage.login(email, password);
    mainPage.validateMainPage(textmainPageValidation);
    receivedPlaylistName = mainPage.createNewPlayList(playListName);
    mainPage.successCreatedGreenPopUp(greenCreatedPopUpMsg, playListName);
    cy.log(" =====> " + receivedPlaylistName + " <===== ");
    cy.tearDown();
  });

  it("Rename A PlayList Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const email = koelData.loginPage.email;
    const password = koelData.loginPage.password;
    const playListName = faker.company.name();
    const greenUpdatedPopUpMsg = koelData.mainPage.greenUpdatedPopUp;

    loginPage.login(email, password);
    cy.wait(500);
    updatedPlayList = mainPage.renamePlayList(
      playListName,
      receivedPlaylistName
    );
    mainPage.successUpdatedGreenPopUp(greenUpdatedPopUpMsg, updatedPlayList);
    expect(updatedPlayList, playListName);
    cy.log(" =====> " + updatedPlayList + " <===== ");
    cy.tearDown();
  });
});
