import { defineConfig, devices } from "@playwright/experimental-ct-react";
import react from "@vitejs/plugin-react";

export default defineConfig({
  testDir: "./src",
  testMatch: /.*\.(ct|integration)\.(spec|test)\.(js|ts|tsx)$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    ctPort: 3000,
    screenshot: "only-on-failure",
    ctViteConfig: {
      plugins: [
        react({
          babel: {
            plugins: [["babel-plugin-react-compiler", { target: "19" }]],
          },
        }),
      ],
      resolve: {
        alias: {
          shared: new URL("./src/shared", import.meta.url).pathname,
          widgets: new URL("./src/widgets", import.meta.url).pathname,
          features: new URL("./src/features", import.meta.url).pathname,
          pages: new URL("./src/pages", import.meta.url).pathname,
          utils: new URL("./src/utils", import.meta.url).pathname,
        },
      },
    },
  },

  /* Configure screenshot settings */
  expect: {
    /* Maximum time expect() should wait for screenshot comparison */
    toHaveScreenshot: {
      threshold: 0.3,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
});
