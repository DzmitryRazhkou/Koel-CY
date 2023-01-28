// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add("launch", () => {
  cy.viewport("macbook-16");
  cy.log(" =====> USER NAVIGATES ON THE KOEL PAGE <===== ");
  cy.visit(Cypress.env("url"));
});

//
//
//
//
//
//

Cypress.Commands.add("createPlayList", (playListName) => {
  return cy.wrap(createNewPlayList(playListName));
});

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("token", (email, psw, responseCode) => {
  cy.request("POST", "https://bbb.testpro.io/api/me", {
    email: email,
    password: psw,
    failOnStatus: false,
  }).then((response) => {
    expect(response.status).to.equal(responseCode);
    Cypress.env("api-token", response.body.token);
  });
});

//
//
Cypress.Commands.add("insertTokenIntoBrowser", () => {
  cy.visit(Cypress.env("url"), {
    onBeforeLoad: (window) => {
      window.localStorage.setItem("api-token", Cypress.env("api-token"));
    },
  });
  //
  // -- This is a dual command --
  // Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
  //
  //

  // -- This will overwrite an existing command --
  // Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

  //
  //
  //

  // Resolved:

  Cypress.Commands.add("launchPage", () => {
    cy.visit(Cypress.env("url"), {
      onBeforeLoad: (window) => {
        window.localStorage.setItem("api-token", Cypress.env("api-token"));
      },
    });
  });

  //

  Cypress.Commands.add("createPlaylistAPI", (playListName, token) => {
    cy.request({
      method: "POST",
      url: "https://bbb.testpro.io/api/playlist",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        name: playListName,
        songs: [],
        rules: null,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));

      expect(res).to.have.property("status", 200);
      expect(res.body).to.not.be.null;
      expect(res.body).to.has.property("name", playListName);
      let playlistID = res.body.id;
      cy.log(" =====> " + playlistID + " <===== ");

      let playlistName = res.body.name;
      cy.log(" =====> " + playlistName + " <===== ");
    });
  });

  //

  Cypress.Commands.add("getToken", () => {
    cy.request({
      method: "POST",
      url: "https://bbb.testpro.io/api/me",
      body: {
        email: "dimagadjilla@gmail.com",
        password: "te$t$tudent",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      Cypress.env("api-token", response.body.token);
    });
  });
});
