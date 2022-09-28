const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 30000,
  reporter: "mochawesome",
  failOnStatusCode: false,

  env: {
    url: "https://bbb.testpro.io",
  },
  retries: {
    runMode: 1,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    specPattern: "cypress/integration/pageTests/*.js",
  },
});
