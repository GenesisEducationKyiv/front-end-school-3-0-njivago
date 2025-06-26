import { test as base } from "@playwright/test";
import type { Page } from "@playwright/test";
import type { TracksApiMockFixture } from "./mockApiFixture.types";
import { handleTracksRequest } from "./mockApiFixture.helpers";
import { mockedGenres } from "./mockApiFixture.constants";

export const testWithInitialPage = base.extend<{ page: Page }>({
  // oxlint-disable-next-line rules-of-hooks -- due to conflict with playwright use
  page: async ({ page }, use) => {
    await page.goto("/");
    await use(page);
  },
});

export const test = testWithInitialPage.extend<TracksApiMockFixture>({
  // oxlint-disable-next-line rules-of-hooks -- due to conflict with playwright use
  mockTracks: async ({ page }, use) => {
    const mockTracksHandler = async () => {
      await page.route("**/api/tracks**", (route) => {
        if (route.request().method() === "GET") {
          handleTracksRequest(route);
        } else {
          route.continue();
        }
      });
    };
    await use(mockTracksHandler);
  },
  // oxlint-disable-next-line rules-of-hooks -- due to conflict with playwright use
  mockGenres: async ({ page }, use) => {
    const mockGenresHandler = async () => {
      await page.route("**/api/genres**", (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ data: mockedGenres }),
        });
      });
    };
    await use(mockGenresHandler);
  },
});
