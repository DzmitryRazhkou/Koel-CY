class MainPage {
  validateMainPage(txt) {
    cy.get(".home").as("home");

    cy.get("@home").should("have.text", txt);
    cy.log(" =====> " + txt + " <===== ");
  }

  /*
  Create PlayList Feature:
  */

  createNewPlayList(playListName) {
    cy.get("i[title='Create a new playlist']").as("plusButton");
    cy.get("@plusButton").click();

    cy.get("nav[class='menu playlist-menu'] ul li:nth-child(1)").as(
      "newPlaylist"
    );
    cy.get("@newPlaylist").click();

    cy.get("form[class='create'] input").as("playListField");
    cy.get("@playListField").type(playListName).type("{enter}");
    return playListName;
  }

  successCreatedGreenPopUp(message, playListName) {
    cy.get(".success").as("popUp");

    cy.get("@popUp").then((el) => {
      const txt = el.text();
      cy.log(txt);
      expect(txt).includes(message + " " + '"' + playListName + '."');
    });
  }

  createNewPlayListThruAPI(token, name) {
    cy.request({
      method: "POST",
      url: "https://bbb.testpro.io/api/playlist",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        name: name,
        songs: [],
        rules: null,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));

      expect(res).to.have.property("status", 200);
      expect(res.body).to.not.be.null;
      expect(res.body).to.has.property("name", name);
      let playlistID = res.body.id;
      cy.log(" =====> " + playlistID + " <===== ");

      let playlistName = res.body.name;
      cy.log(" =====> " + playlistName + " <===== ");
    });
  }

  validateCreatedPlayList(createdPlayList) {
    cy.get("#playlists ul li a").as("listOfPlaylists");

    cy.get("@listOfPlaylists").each((ele) => {
      let playListNames = ele.text();
      if (createdPlayList.includes(playListNames)) {
      }
    });
    return createdPlayList;
  }

  /*
  Rename PlayList Feature:
  */

  renamePlayList(playListName, receivedPlaylistName) {
    cy.get("#playlists ul li a").as("playLists");

    cy.get("@playLists").each((ele, index) => {
      let playListNames = ele.text();
      if (receivedPlaylistName.includes(playListNames)) {
        cy.get("#playlists ul li").as("list");

        cy.get("@list")
          .eq(index)
          .dblclick()
          .type("{selectall}{del}")
          .type(playListName)
          .type("{enter}");
      }
    });
    return playListName;
  }

  successUpdatedGreenPopUp(message, playListName) {
    cy.get(".success").as("popUp");

    cy.get("@popUp").then((el) => {
      const txt = el.text();
      cy.log(txt);
      expect(txt).includes(message + " " + '"' + playListName + '."');
    });
  }

  /*
  Add To Playlist Song Feature:
  */

  getAllSongs() {
    cy.get("ul[class='menu'] li:nth-of-type(3)").as("allSongs");

    cy.get("@allSongs").click();
  }

  getCertainSongAddToPlaylist(songName, playList) {
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

  reachOutPlaylist(updatedPlayList) {
    cy.get("#playlists ul li a").as("listOfPlaylists");

    cy.get("@listOfPlaylists").each((ele, index) => {
      let playListNames = ele.text();
      if (updatedPlayList.includes(playListNames)) {
        cy.get("@listOfPlaylists").eq(index).click();
      }
    });
  }

  successAddedToGreenPopUp(message, playListName) {
    cy.get("div[class='success show']").then((el) => {
      const txt = el.text();
      cy.log(txt);
      expect(txt).includes(message + " " + '"' + playListName + '."');
    });
  }

  validateAddedToSong(titleSong) {
    cy.get("tr[class='song-item selected'] td:nth-of-type(2)").as("titleSong");

    cy.get("@titleSong").then((el) => {
      let title = el.text();
      expect(titleSong.includes(title)).to.be.true;
      cy.log(" =====> " + title + " <===== ");
    });
  }

  /*
  Delete Playlist Feature:
  */

  deletePlayList(updatedPlayList) {
    cy.get("#playlists ul li a").as("listOfPlaylists");

    cy.get("@listOfPlaylists").each((ele, index) => {
      let playListNames = ele.text();
      if (updatedPlayList.includes(playListNames)) {
        cy.get("#playlists ul li").eq(index).rightclick({ metaKey: true });
        cy.wait(1000);

        cy.get("nav[class='menu playlist-item-menu'] ul li:last-of-type").as(
          "delete"
        );
        cy.get("@delete").click();

        cy.get("button[class='ok']").as("submitDelete");
        cy.get("@submitDelete").click();
      }
    });
    return updatedPlayList;
  }

  successDeletedGreenPopUp(message, playListName) {
    cy.get(".success").then((el) => {
      const txt = el.text();
      cy.log(txt);
      expect(txt).includes(message + " " + '"' + playListName + '."');
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

  /*
  Set Up Equalizer Feature:
  */

  showEqualizer() {
    cy.get("button[class='control equalizer'] i").as("equalizer");

    cy.get("@equalizer").scrollIntoView();
    cy.get("@equalizer").click();
  }

  selectGenres(genre) {
    cy.get("label[class='select-wrapper']").find("select").as("genres");

    cy.get("@genres").select(genre).should("have.value", genre);
    cy.wait(1000);
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /*
  Get Infobar Feature:
  */

  clickOnInfo() {
    cy.get("button[title='View song information']").as("info");
    cy.get("@info").scrollIntoView();
  }

  getInfoBar() {
    cy.get("div[role='tablist'] button:nth-child(1)").as("infoBar");
    cy.get("@infoBar").then((ele) => {
      const infoBarText = ele.text();
      cy.log(" =====> " + infoBarText + " <===== ");
    });
  }
}
export default MainPage;
