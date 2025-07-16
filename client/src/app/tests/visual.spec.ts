import { expect } from "@playwright/test";
import { test } from "shared/lib/tests/fixtures/testcontainers";

test("should match the screenshot of the main track list page", async ({
  page,
}) => {
  await expect(page).toHaveScreenshot("track-list-page.png");
});

test("should match the screenshot of the track edit form", async ({ page }) => {
  const addTrackButton = page.getByTestId("create-track-button");
  await addTrackButton.click();

  const createTrackForm = page.getByTestId("track-form");
  await expect(createTrackForm).toBeVisible();

  await createTrackForm.getByTestId("input-title").fill("Visual Test Track");
  await createTrackForm.getByTestId("input-artist").fill("Test Artist");
  await createTrackForm.getByTestId("input-album").fill("Test Album");

  const genresInput = createTrackForm.getByTestId("genre-input");

  await genresInput.click();
  await genresInput.fill("Rock");
  await page.waitForTimeout(100);
  await createTrackForm.getByText("Rock").click();

  await createTrackForm.getByTestId("submit-button").click();
  await expect(createTrackForm).not.toBeVisible();

  const firstTrack = page.getByTestId("track-item").first();
  await firstTrack.getByTestId("edit-track").click();
  await expect(page.getByTestId("track-form")).toBeVisible();

  await expect(page.getByTestId("track-form")).toHaveScreenshot(
    "track-edit-form.png"
  );
});
