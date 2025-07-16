import { expect } from "@playwright/test";
import { test } from "shared/lib/tests/fixtures/testcontainers";

const DEFAULT_TIMEOUT = 500;

test("complete e2e user journey: create, edit, and persist tracks", async ({
  page,
}) => {
  await page.waitForTimeout(DEFAULT_TIMEOUT);

  console.log(page.url());

  const initialTracks = await page.getByTestId("track-item").all();
  expect(initialTracks.length).toBe(0);

  const addTrackButton = page.getByTestId("create-track-button");
  await addTrackButton.click();

  const createTrackForm = page.getByTestId("track-form");
  await expect(createTrackForm).toBeVisible();

  const titleInput = createTrackForm.getByTestId("input-title");
  const artistInput = createTrackForm.getByTestId("input-artist");
  const albumInput = createTrackForm.getByTestId("input-album");
  const genresInput = createTrackForm.getByTestId("genre-input");

  await titleInput.fill("My First Test Track");
  await artistInput.fill("Test Artist");
  await albumInput.fill("Test Album");

  await genresInput.click();
  await genresInput.fill("Rock");
  await page.getByText("Rock").click();

  await createTrackForm.getByTestId("submit-button").click();
  await expect(createTrackForm).not.toBeVisible();

  await expect(page.getByText("My First Test Track")).toBeVisible();
  await expect(page.getByText("Test Artist - Test Album")).toBeVisible();

  await addTrackButton.click();
  await expect(createTrackForm).toBeVisible();

  await titleInput.fill("My Second Test Track");
  await artistInput.fill("Another Artist - Another Album");
  await albumInput.fill("Another Album");

  await genresInput.click();
  await genresInput.fill("Jazz");
  await page.getByText("Jazz").click();

  await createTrackForm.getByTestId("submit-button").click();
  await expect(createTrackForm).not.toBeVisible();

  const tracksAfterCreation = await page.getByTestId("track-item").all();
  expect(tracksAfterCreation.length).toBeGreaterThanOrEqual(2);
  await expect(page.getByText("My Second Test Track")).toBeVisible();
  await expect(page.getByText("Another Artist")).toBeVisible();

  const firstTrack = page
    .getByTestId("track-item")
    .filter({ hasText: "My First Test Track" })
    .first();
  await expect(firstTrack).toBeVisible();
  await firstTrack.getByTestId("edit-track").click();

  const editTrackForm = page.getByTestId("track-form");
  await expect(editTrackForm).toBeVisible();

  const editTitleInput = editTrackForm.getByTestId("input-title");
  await editTitleInput.clear();
  await editTitleInput.fill("My Updated First Track");

  await editTrackForm.getByTestId("submit-button").click();
  await expect(editTrackForm).not.toBeVisible();

  await expect(page.getByText("My Updated First Track")).toBeVisible();
  await expect(page.getByText("My First Test Track")).not.toBeVisible();

  await page.reload();

  await page.waitForTimeout(DEFAULT_TIMEOUT);

  const tracksAfterReload = await page.getByTestId("track-item").all();
  expect(tracksAfterReload.length).toBe(2);

  await expect(page.getByText("My Updated First Track")).toBeVisible();
  await expect(page.getByText("Test Artist - Test Album")).toBeVisible();

  await expect(page.getByText("My Second Test Track")).toBeVisible();
  await expect(page.getByText("Another Artist - Another Album")).toBeVisible();

  await expect(page.getByText("My First Test Track")).not.toBeVisible();
});
