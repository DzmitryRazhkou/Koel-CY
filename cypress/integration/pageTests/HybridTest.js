import LoginPage from "../pageObjects/LoginPage";
import MainPage from "../pageObjects/MainPage";
import { faker } from "@faker-js/faker";

describe("Main Page Features", () => {
  let koelData;
  let loginPage;
  let playlistID;
  let playlistName;
  let mainPage;
  let receivedPlaylistName;
  let updatedPlayList;
  let deletedPlayList;

  beforeEach(() => {
    cy.fixture("example").then((data) => {
      koelData = data;
      return koelData;
    });
  });

  afterEach(() => {
    // cy.tearDown();
  });

  it("Create A New PlayList Thru API Call Test", () => {
    let token;

    loginPage = new LoginPage();
    mainPage = new MainPage();

    const textMainPageValidation = koelData.mainPage.validateMainPage;
    const playListName = faker.company.name();

    cy.request("POST", "https://bbb.testpro.io/api/me", {
      email: "dimagadjilla@gmail.com",
      password: "te$t$tudent",
    }).then((response) => {
      expect(response.status).to.equal(200);
      token = response.body.token;
      cy.log(token);
    });

    mainPage.createNewPlayListThruAPI(
      "61708|i0WpBztmIKwuFsTxAB2FQ2MddAaQC3CIoUBRZfLn",
      playListName
    );
    loginPage.loginThruAPICall();

    mainPage.validateMainPage(textMainPageValidation);

    // receivedPlaylistName = mainPage.createNewPlayList(playListName);
    // cy.log(" =====> " + receivedPlaylistName + " <===== ");
  });
});
