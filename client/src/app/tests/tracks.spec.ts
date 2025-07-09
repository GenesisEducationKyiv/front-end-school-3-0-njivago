import { expect } from "@playwright/test";
import { test, mockedTracks } from "shared/lib/tests/fixtures";

const DEFAULT_TIMEOUT = 500;

test("complete e2e user journey: view, search, paginate, and edit tracks", async ({
  page,
  mockTracks,
}) => {
  await mockTracks();
  await page.waitForTimeout(DEFAULT_TIMEOUT);

  const initialTracks = await page.getByTestId("track-item").all();
  expect(initialTracks.length).toBe(
    mockedTracks.length < 10 ? mockedTracks.length : 10
  );
  await expect(page.getByText("Test Track 1")).toBeVisible();

  const searchInput = page.getByTestId("search-input");
  await searchInput.fill("test track");
  await page.waitForTimeout(DEFAULT_TIMEOUT);
  const searchResults = await page.getByTestId("track-item").all();
  expect(searchResults.length).toBeLessThanOrEqual(initialTracks.length);

  await searchInput.clear();
  await page.waitForTimeout(DEFAULT_TIMEOUT);
  const restoredTracks = await page.getByTestId("track-item").all();
  expect(restoredTracks.length).toBe(initialTracks.length);

  const nextPageButton = page.getByTestId("pagination-next");
  await nextPageButton.click();
  await page.waitForTimeout(DEFAULT_TIMEOUT);
  const nextPageTracks = await page.getByTestId("track-item").all();
  expect(nextPageTracks.length).toBeGreaterThan(0);

  const trackToEdit = mockedTracks[0];
  const newTitle = "Updated Test Track";

  await page.route(`**/api/tracks/${trackToEdit.id}`, async (route) => {
    const request = route.request();
    if (request.method() === "PUT") {
      const postData = await request.postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: { ...trackToEdit, ...postData },
        }),
      });
    }
  });

  const firstPageButton = page.getByTestId("pagination-prev");
  if (await firstPageButton.isVisible()) {
    await firstPageButton.click();
    await page.waitForTimeout(DEFAULT_TIMEOUT);
  }

  const firstTrack = page.getByTestId("track-item").first();
  await firstTrack.getByTestId("edit-track").click();

  const trackForm = await page.getByTestId("track-form");
  await expect(trackForm).toBeVisible();

  const titleInput = trackForm.getByTestId("input-title");
  await titleInput.clear();
  await titleInput.fill(newTitle);

  await trackForm.getByTestId("submit-button").click();

  await expect(page.getByTestId("track-form")).not.toBeVisible();
  await expect(page.getByText(newTitle)).toBeVisible();
  await expect(page.getByText(trackToEdit.title)).not.toBeVisible();
});
