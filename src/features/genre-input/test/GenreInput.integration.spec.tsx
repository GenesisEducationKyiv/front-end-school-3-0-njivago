import { test as base, expect } from "@playwright/experimental-ct-react";
import { mockedGenres } from "shared/lib/tests/fixtures";
import { TestWrapper } from "./GenreInput.story";

const test = base.extend<{
  mockGenres: () => Promise<void>;
}>({
  // oxlint-disable-next-line rules-of-hooks -- due to conflict with playwright use
  mockGenres: async ({ page }, use) => {
    const mockGenresHandler = async () => {
      await page.route("**/api/genres", (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ data: mockedGenres }),
        });
      });

      await page.waitForTimeout(500);
    };
    await use(mockGenresHandler);
  },
});

test("should render with empty state", async ({ mount, mockGenres }) => {
  await mockGenres();

  const component = await mount(<TestWrapper />);

  await expect(component.getByTestId("genre-input")).toBeVisible();
  await expect(component.getByText("Test Genres")).toBeVisible();
  await expect(
    component.getByPlaceholder("Type to search genres")
  ).toBeVisible();
});

test("should display existing genres as tags", async ({
  mount,
  mockGenres,
}) => {
  await mockGenres();

  const initialGenres = ["Rock", "Jazz"];
  const component = await mount(<TestWrapper initialGenres={initialGenres} />);

  await expect(component.getByText("Rock")).toBeVisible();
  await expect(component.getByText("Jazz")).toBeVisible();
});

test("should show suggestions when typing", async ({ mount, mockGenres }) => {
  await mockGenres();

  const component = await mount(<TestWrapper />);

  const input = component.getByTestId("genre-input");
  await input.focus();
  await input.fill("roc");

  await expect(component.getByText("Rock")).toBeVisible();
  await expect(component.getByText("Punk Rock")).not.toBeVisible();
});

test("should remove genre tag when clicking remove button", async ({
  mount,
  mockGenres,
}) => {
  await mockGenres();

  const initialGenres = ["Rock", "Jazz"];
  const component = await mount(<TestWrapper initialGenres={initialGenres} />);

  const rockTag = component.getByText("Rock").locator("..");
  await rockTag.getByRole("button").click();

  await expect(component.getByText("Rock")).not.toBeVisible();

  await expect(component.getByText("Jazz")).toBeVisible();
});

test("should not add duplicate genres", async ({ mount, mockGenres }) => {
  await mockGenres();

  const component = await mount(<TestWrapper />);

  const input = component.getByTestId("genre-input");

  await input.focus();
  await input.fill("Rock");
  await input.press("Enter");
  await expect(component.getByText("Rock")).toBeVisible();

  await input.fill("Rock");
  await input.press("Enter");

  const rockTags = component.getByText("Rock").all();
  expect((await rockTags).length).toBe(1);
});

test("should show no results message for non-matching search", async ({
  mount,
  mockGenres,
}) => {
  await mockGenres();

  const component = await mount(<TestWrapper />);

  const input = component.getByTestId("genre-input");
  await input.focus();
  await input.fill("NonExistentGenre");

  await expect(component.getByText(/No matching genres found/)).toBeVisible();
});

test("should submit form with selected genres", async ({
  mount,
  mockGenres,
}) => {
  await mockGenres();

  let submittedData: { genres: string[] } | null = null;

  const component = await mount(
    <TestWrapper
      onSubmit={(data) => {
        submittedData = data;
      }}
    />
  );

  const input = component.getByTestId("genre-input");

  await input.focus();
  await input.fill("Rock");
  await component.getByText("Rock").click();

  await input.fill("Jazz");
  await component.getByText("Jazz").click();

  await component.getByTestId("submit-button").click();

  expect(submittedData).toEqual({ genres: ["Rock", "Jazz"] });
});

test("should handle case-insensitive search", async ({ mount, mockGenres }) => {
  await mockGenres();

  const component = await mount(<TestWrapper />);

  const input = component.getByTestId("genre-input");
  await input.focus();
  await input.fill("rock");

  await expect(component.getByText("Rock")).toBeVisible();
});

test("should clear suggestions when input is cleared", async ({
  mount,
  mockGenres,
}) => {
  await mockGenres();

  const component = await mount(<TestWrapper />);

  const input = component.getByTestId("genre-input");
  await input.focus();
  await input.fill("rock");

  await expect(component.getByText("Rock")).toBeVisible();

  await input.clear();

  await expect(component.getByText("Rock")).not.toBeVisible();
});

test("should show required indicator when required prop is true", async ({
  mount,
}) => {
  const component = await mount(<TestWrapper />);

  await expect(component.getByText("*")).toBeVisible();
});
