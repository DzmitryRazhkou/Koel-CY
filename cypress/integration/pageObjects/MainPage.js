class MainPage {
  // constructor() {}
  // Validate Navigation On The Main Page:
  validateMainPage(txt) {
    cy.get(".home").should("have.text", txt);
    cy.log(" =====> " + txt + " <===== ");
  }

  // Create a New PlayList:
  createNewPlayList(playListName) {
    cy.get("i[title='Create a new playlist']").click(); // click On The Plus
    cy.get("nav[class='menu playlist-menu'] ul li:nth-child(1)").click(); // click On The New PlayList
    cy.get("form[class='create']")
      .find("input")
      .type(playListName)
      .type("{enter}"); // Type A name into field
    return playListName;
  }

  // Rename an Existing Playlist:
  renamePlayList(playListName, receivedPlaylistName) {
    cy.get("#playlists ul li a").each((ele, index) => {
      let playListNames = ele.text();
      if (receivedPlaylistName.includes(playListNames)) {
        cy.get("#playlists ul li")
          .eq(index)
          .dblclick()
          .type("{selectall}{del}")
          .type(playListName)
          .type("{enter}");
      }
    });
    return playListName;
  }

  // Get URL:
  getURL() {
    cy.on("url:changed", (newUrl) => {
      const urlSplit = newUrl.split("/");
      const playListId = urlSplit[5];
      cy.log(playListId);
      return playListId;
    });
  }

  // Get Success Message:
  successGreenPopUp(message) {
    cy.get(".success").then((el) => {
      const txt = el.text();
      cy.log(txt);
      expect(txt).includes(message);
    });
  }
}
export default MainPage;
