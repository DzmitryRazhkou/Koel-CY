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
  cy.log(" =====> User navigates on the Koel page <===== ");
  cy.visit(Cypress.env("url"));
});

//
//
//

Cypress.Commands.add("tearDown", () => {
  cy.get("a[title='Log student out']").click();
});

//
//
//

Cypress.Commands.add("createPlayList", (playListName) => {
  return cy.wrap(createNewPlayList(playListName));
});

function createNewPlayList(playListName) {
  cy.get("i[title='Create a new playlist']").click(); // click On The Plus
  cy.get("nav[class='menu playlist-menu'] ul li:nth-child(1)").click(); // click On The New PlayList
  cy.get("form[class='create']")
    .find("input")
    .type(playListName)
    .type("{enter}"); // Type A neme into field
  return playListName;
}

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
