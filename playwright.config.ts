/// <reference types="vite/client" />
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/app/tests/",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.VITE_BASE_URL || "http://localhost:3000/",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],

  webServer: {
    command: "pnpm start",
    url: process.env.VITE_BASE_URL || "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },

  expect: {
    toHaveScreenshot: {
      threshold: 1,
    },
    timeout: 10_000,
  },
});
