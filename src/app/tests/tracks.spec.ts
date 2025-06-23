import { expect } from "@playwright/test";
import { test, mockedTracks } from "shared/lib/tests/fixtures";

test("should display mocked tracks", async ({ page, mockTracks }) => {
  await mockTracks();

  await page.waitForTimeout(500);
  const tracks = await page.getByTestId("track-item").all();
  expect(tracks.length).toBe(
    mockedTracks.length < 10 ? mockedTracks.length : 10
  );
  await expect(page.getByText("Test Track 1")).toBeVisible();
});

test("should edit a track and update the list", async ({
  page,
  mockTracks,
}) => {
  await mockTracks();
  await page.waitForTimeout(500);

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

test("complete user journey: view, search, and manage tracks", async ({
  page,
  mockTracks,
}) => {
  await mockTracks();

  await page.waitForTimeout(500);
  const initialTracks = await page.getByTestId("track-item").all();
  expect(initialTracks.length).toBeGreaterThan(0);

  const searchInput = page.getByTestId("search-input");
  await searchInput.fill("test track");
  await page.waitForTimeout(500);
  const searchResults = await page.getByTestId("track-item").all();
  expect(searchResults.length).toBeLessThanOrEqual(initialTracks.length);

  await searchInput.clear();
  await page.waitForTimeout(500);
  const restoredTracks = await page.getByTestId("track-item").all();
  expect(restoredTracks.length).toBe(initialTracks.length);

  const nextPageButton = page.getByTestId("pagination-next");
  if (await nextPageButton.isVisible()) {
    await nextPageButton.click();
    await page.waitForTimeout(500);
    const nextPageTracks = await page.getByTestId("track-item").all();
    expect(nextPageTracks.length).toBeGreaterThan(0);
  }
});
