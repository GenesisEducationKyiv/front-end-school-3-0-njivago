// oxlint-disable
import { test as base } from "@playwright/test";
import type { Page } from "@playwright/test";
import { TracksApiMockFixture } from "./mockApiFixture.types";
import { handleTracksRequest } from "./mockApiFixture.helpers";
import { mockedGenres } from "./mockApiFixture.constants";

export const testWithInitialPage = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.goto("/");
    await use(page);
  },
});

export const test = testWithInitialPage.extend<TracksApiMockFixture>({
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
