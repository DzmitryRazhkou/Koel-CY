import LoginPage from "../pageObjects/LoginPage";
import MainPage from "../pageObjects/MainPage";
import { faker } from "@faker-js/faker";

const loginPage = new LoginPage();
const mainPage = new MainPage();

let koelMainPage;
let koelLoginPage;

let receivedPlaylistName;
let updatedPlayList;
let deletedPlayList;

describe("KOEL Main Page Features", () => {
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

  it("AT_015 - Validate KOEL Main Page Test", () => {
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const responseCodeOk = koelLoginPage.loginPage.ok;
    const textMainPageValidation = koelMainPage.mainPage.validateMainPage;

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    mainPage.validateMainPage(textMainPageValidation);
  });

  it("AT_016 - Create A New PlayList Test", () => {
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const responseCodeOk = koelLoginPage.loginPage.ok;
    const playListName = faker.company.name();
    const greenCreatedPopUpMsg = koelMainPage.mainPage.greenCreatedPopUp;

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    receivedPlaylistName = mainPage.createNewPlayList(playListName);
    mainPage.successCreatedGreenPopUp(greenCreatedPopUpMsg, playListName);
  });

  it.only("DB", () => {});

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
