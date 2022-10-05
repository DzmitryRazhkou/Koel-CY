import LoginPage from "../pageObjects/LoginPage";
import MainPage from "../pageObjects/MainPage";
import { faker } from "@faker-js/faker";

describe("Main Page Features", () => {
  let koelData;
  let loginPage;
  let mainPage;
  let receivedPlaylistName;
  let updatedPlayList;
  let deletedPlayList;

  beforeEach(() => {
    cy.launch();
    cy.fixture("example").then((data) => {
      koelData = data;
      return koelData;
    });
  });

  afterEach(() => {
    cy.tearDown();
  });

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
    cy.wait(1000);

    mainPage.validateMainPage(textmainPageValidation);
    receivedPlaylistName = mainPage.createNewPlayList(playListName);
    mainPage.successCreatedGreenPopUp(greenCreatedPopUpMsg, playListName);
    cy.log(" =====> " + receivedPlaylistName + " <===== ");
  });

  it("Rename A PlayList Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const email = koelData.loginPage.email;
    const password = koelData.loginPage.password;
    const playListName = faker.company.name();
    const greenUpdatedPopUpMsg = koelData.mainPage.greenUpdatedPopUp;

    loginPage.login(email, password);
    cy.wait(1000);

    updatedPlayList = mainPage.renamePlayList(
      playListName,
      receivedPlaylistName
    );
    mainPage.successUpdatedGreenPopUp(greenUpdatedPopUpMsg, updatedPlayList);
    expect(updatedPlayList, playListName);
    cy.log(" =====> " + updatedPlayList + " <===== ");
  });

  it("Proceed Thru Songs And Add To Playlist Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const email = koelData.loginPage.email;
    const password = koelData.loginPage.password;
    const songName = koelData.mainPage.songName;
    const greenAddedToPopUpMsg = koelData.mainPage.greenAddedToPopUp;

    loginPage.login(email, password);
    cy.wait(1000);
    mainPage.getAllSongs();
    mainPage.getCertainSongAddToPlaylist(songName, updatedPlayList);
    mainPage.reachOutPlaylist(updatedPlayList);
    mainPage.successAddedToGreenPopUp(greenAddedToPopUpMsg, updatedPlayList);
    mainPage.validateAddedToSong(songName);
  });

  it("Delete A PlayList Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const email = koelData.loginPage.email;
    const password = koelData.loginPage.password;
    const greenUpdatedPopUpMsg = koelData.mainPage.greenDeletedPopUp;

    loginPage.login(email, password);
    cy.wait(1000);
    deletedPlayList = mainPage.deletePlayList(updatedPlayList);
    mainPage.successDeletedGreenPopUp(greenUpdatedPopUpMsg, updatedPlayList);
    expect(deletedPlayList, updatedPlayList);
    cy.log(" =====> " + deletedPlayList + " <===== ");
  });

  it("Set Up Equalizer Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const email = koelData.loginPage.email;
    const password = koelData.loginPage.password;
    const range = String(mainPage.randomIntFromInterval(1, 13));

    loginPage.login(email, password);
    cy.wait(1000);
    mainPage.showEqualizer();
    mainPage.selectGenres(range);
  });

  it("Open Info Bar Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const email = koelData.loginPage.email;
    const password = koelData.loginPage.password;

    loginPage.login(email, password);
    cy.wait(1000);
    mainPage.clickOnInfo();
    mainPage.getInfoBar();
  });
});
