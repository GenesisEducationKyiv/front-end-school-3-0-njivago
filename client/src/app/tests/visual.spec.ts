import { expect } from "@playwright/test";
import { test } from "shared/lib/tests/fixtures";

test("should match the screenshot of the main track list page", async ({
  page,
  mockTracks,
}) => {
  await mockTracks();

  await expect(page).toHaveScreenshot("track-list-page.png");
});

test("should match the screenshot of the track edit form", async ({
  page,
  mockTracks,
}) => {
  await mockTracks();

  const firstTrack = page.getByTestId("track-item").first();
  await firstTrack.getByTestId("edit-track").click();
  await expect(page.getByTestId("track-form")).toBeVisible();

  await expect(page.getByTestId("track-form")).toHaveScreenshot(
    "track-edit-form.png"
  );
});
