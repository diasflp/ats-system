import { defineConfig } from 'cypress';

export default defineConfig({
  videoCompression: false,
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },
});
