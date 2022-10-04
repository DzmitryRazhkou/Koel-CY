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

  // Get Success Message:
  successCreatedGreenPopUp(message, playListName) {
    cy.get(".success").then((el) => {
      const txt = el.text();
      cy.log(txt);
      expect(txt).includes(message + " " + '"' + playListName + '."');
    });
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

  // Get Success Message:
  successUpdatedGreenPopUp(message, playListName) {
    cy.get(".success").then((el) => {
      const txt = el.text();
      cy.log(txt);
      expect(txt).includes(message + " " + '"' + playListName + '."');
    });
  }

  // Delete an Existing Playlist:
  deletePlayList(updatedPlayList) {
    cy.get("#playlists ul li a").each((ele, index) => {
      let playListNames = ele.text();
      cy.log(playListNames);
      if (updatedPlayList.includes(playListNames)) {
        cy.get("#playlists ul li").eq(index).rightclick({ metaKey: true });
        cy.wait(1000);
        cy.get(
          "nav[class='menu playlist-item-menu'] ul li:nth-of-type(2)"
        ).click();
      }
    });
    return updatedPlayList;
  }

  // Get Success Message:
  successDeletedGreenPopUp(message, playListName) {
    cy.get(".success").then((el) => {
      const txt = el.text();
      cy.log(txt);
      expect(txt).includes(message + " " + '"' + playListName + '."');
    });
  }

  // Proceed to All Songs:
  getAllSongs() {
    cy.get("ul[class='menu'] li:nth-of-type(3)").as("allSongs");

    cy.get("@allSongs").click();
  }

  // Get Particular Song:
  getCertainSong(songName, playList) {
    cy.get("td[class='title']").as("songs");
    cy.get("tr[class='song-item']").as("wholeRow");

    cy.get("@songs").each((ele, index) => {
      let songTitleText = ele.text();
      if (songTitleText.includes(songName)) {
        cy.get("@wholeRow").eq(index).rightclick({ metaKey: true });

        cy.get("li[class='has-sub']").as("addTo");
        cy.get("@addTo").trigger("mouseenter");

        cy.get("ul[class='menu submenu menu-add-to'] li").as("playLists");

        cy.get("@playLists").each((ele, index) => {
          let playListText = ele.text();
          if (playListText.includes(playList)) {
            cy.get("@playLists").eq(index).click();
          }
        });
      }
    });
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
}
export default MainPage;
