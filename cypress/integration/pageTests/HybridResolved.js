import LoginPage from "../pageObjects/LoginPage";
import MainPage from "../pageObjects/MainPage";
import { faker } from "@faker-js/faker";

describe("Main Page Features", () => {
  let koelData;
  let loginPage;
  let mainPage;

  let playlistID;
  let playlistName;
  let createdPlayList;
  let updatedPlayList;
  let token;

  beforeEach(() => {
    cy.fixture("example").then((data) => {
      koelData = data;
      return koelData;
    });
  });

  afterEach(() => {
    cy.tearDown();
  });

  it("Create A New PlayList Thru API Call Test", () => {
    loginPage = new LoginPage();
    mainPage = new MainPage();

    const playListName = faker.company.name();

    cy.getToken()
      .then((res) => {
        token = res.body.token;
        cy.log("Generated API Token is: =====> " + token + " <===== ");
        cy.createPlaylistAPI(playListName, token);
      })
      .then(() => {
        cy.launchPage();
      });

    createdPlayList = mainPage.validateCreatedPlayList(playListName);
    cy.log(" =====> " + createdPlayList + " <===== ");
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

    updatedPlayList = mainPage.renamePlayList(playListName, createdPlayList);
    mainPage.successUpdatedGreenPopUp(greenUpdatedPopUpMsg, updatedPlayList);
    expect(updatedPlayList, playListName);
    cy.log(" =====> " + updatedPlayList + " <===== ");
  });
});
