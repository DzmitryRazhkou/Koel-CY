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
    const user_id = koelMainPage.mainPage.user_id;

    const greenCreatedPopUpMsg = koelMainPage.mainPage.greenCreatedPopUp;

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    receivedPlaylistName = mainPage.createNewPlayList(playListName);
    mainPage.successCreatedGreenPopUp(greenCreatedPopUpMsg, playListName);
    mainPage.doQueryDBCall(user_id, playListName);
  });

  it("AT_017 - Rename A PlayList Test", () => {
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const responseCodeOk = koelLoginPage.loginPage.ok;

    const playListName = faker.company.name();
    const user_id = koelMainPage.mainPage.user_id;
    const greenUpdatedPopUpMsg = koelMainPage.mainPage.greenUpdatedPopUp;

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    cy.wait(1000);

    updatedPlayList = mainPage.renamePlayList(
      playListName,
      receivedPlaylistName
    );
    mainPage.successUpdatedGreenPopUp(greenUpdatedPopUpMsg, updatedPlayList);
    expect(updatedPlayList, playListName);
    mainPage.doQueryDBCall(user_id, updatedPlayList);
    cy.log(" =====> " + updatedPlayList + " <===== ");
  });

  it("AT_018 - Proceed Thru Songs And Add To Playlist Test", () => {
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const responseCodeOk = koelLoginPage.loginPage.ok;

    const songName = koelMainPage.mainPage.songName;
    const greenAddedToPopUpMsg = koelMainPage.mainPage.greenAddedToPopUp;

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    mainPage.getAllSongs();
    mainPage.getCertainSongAddToPlaylist(songName, updatedPlayList);
    mainPage.reachOutPlaylist(updatedPlayList);
    mainPage.successAddedToGreenPopUp(greenAddedToPopUpMsg, updatedPlayList);
    mainPage.validateAddedToSong(songName);
  });

  it("AT_019 - Delete A PlayList Test", () => {
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const responseCodeOk = koelLoginPage.loginPage.ok;

    const user_id = koelMainPage.mainPage.user_id;
    const greenUpdatedPopUpMsg = koelMainPage.mainPage.greenDeletedPopUp;

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    cy.wait(500);
    deletedPlayList = mainPage.deletePlayList(updatedPlayList);
    mainPage.successDeletedGreenPopUp(greenUpdatedPopUpMsg, updatedPlayList);
    expect(deletedPlayList, updatedPlayList);
  });

  it("AT_020 - Set Up Equalizer Test", () => {
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const responseCodeOk = koelLoginPage.loginPage.ok;
    const range = String(mainPage.randomIntFromInterval(1, 13));

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    cy.wait(500);

    mainPage.showEqualizer();
    mainPage.selectGenres(range);
  });

  it("AT_021 - Open Info Bar Test", () => {
    const email = koelLoginPage.loginPage.email;
    const password = koelLoginPage.loginPage.password;
    const responseCodeOk = koelLoginPage.loginPage.ok;

    loginPage.doLoginThruAPICall(email, password, responseCodeOk);
    cy.wait(500);
    mainPage.clickOnInfo();
    mainPage.getInfoBar();
  });
});
