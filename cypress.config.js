const { defineConfig } = require("cypress");
const sqlServer = require("cypress-sql-server");

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
    runMode: 2,
  },

  DB: {
    userName: "dbuser02",
    password: "pa$$02",
    server: "104.237.13.60",
    options: {
      database: "dbkoel",
      encrypt: true,
      rowCollectionOnRequestCompletion: true,
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      module.exports = (on, config) => {
        tasks = sqlServer.loadDBPlugin(config.DB);
        on("task", tasks);
      };
    },

    specPattern: "cypress/integration/pageTests/*.js",
  },
});
