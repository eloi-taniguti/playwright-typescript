import { defineConfig, devices } from '@playwright/test';
import path from 'path'
const authFile = path.join(__dirname, './user.json');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 120000,
  testDir: './tests/',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    testIdAttribute: 'data-cy',
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: '',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke',
      use: { ...devices['Desktop Chrome'] },
      grep: /@smoke/,
    },
    {
      name: 'api',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/api.spec.ts',
    },
  ],
});
