const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
    },
  },
  component: {
    setupNodeEvents(on, config) {
      // component testing node events setup code
    },
  },
});
