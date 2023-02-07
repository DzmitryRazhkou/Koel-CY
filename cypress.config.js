const { defineConfig } = require("cypress");
const mysql = require("mysql");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 30000,
  reporter: "mochawesome",
  failOnStatusCode: false,

  env: {
    url: "https://bbb.testpro.io",
    db: {
      host: "104.237.13.60",
      user: "dbuser01",
      password: "pa$$01",
      database: "dbkoel",
    },
  },
  retries: {
    runMode: 2,
  },

  e2e: {
    setupNodeEvents(on, config) {
      module.exports = (on, config) => {};

      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
    },

    specPattern: "cypress/integration/pageTests/*.js",
  },
});

function queryTestDb(query, config) {
  // create a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);

  // start connection to db
  connection.connect();

  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}
