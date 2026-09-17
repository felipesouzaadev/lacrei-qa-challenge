require("dotenv").config();

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

const { obterLinkConfirmacao } = require("./cypress/tasks/email");

module.exports = defineConfig({
  env: {
    EMAIL_TESTE: process.env.CYPRESS_EMAIL_TESTE,
  },

  e2e: {
    baseUrl: "https://paciente-staging.lacreisaude.com.br",

    specPattern: "cypress/e2e/**/*.feature",

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      on("task", {
        obterLinkConfirmacao(destinatario) {
          return obterLinkConfirmacao(destinatario);
        },
      });

      return config;
    },
  },

  taskTimeout: 240000,
});
