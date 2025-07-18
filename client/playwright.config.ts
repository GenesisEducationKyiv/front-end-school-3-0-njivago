/// <reference types="vite/client" />
/// <reference types="node" />
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/app/tests/",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",

  globalSetup: "./src/shared/lib/tests/utils/testcontainers/globalSetup.ts",
  globalTeardown:
    "./src/shared/lib/tests/utils/testcontainers/globalTeardown.ts",

  use: {
    baseURL: process.env.VITE_BASE_URL || "http://localhost:3000/",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
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
