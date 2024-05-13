import { defineConfig } from "cypress";
export default defineConfig({
  screenshotsFolder: "cypress/screenshots",
  e2e: {
    setupNodeEvents(on, config) {},
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
