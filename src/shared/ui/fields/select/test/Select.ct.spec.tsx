import { test, expect } from "@playwright/experimental-ct-react";
import { Select } from "../ui/Select";

const options = [
  { value: "rock", label: "Rock" },
  { value: "pop", label: "Pop" },
  { value: "jazz", label: "Jazz" },
];

test("should call onChange with the correct value when an option is selected", async ({
  mount,
}) => {
  let selectedValue = "";
  const handleChange = (value: string) => {
    selectedValue = value;
  };

  const component = await mount(
    <Select options={options} onChange={handleChange} />
  );

  await component.click();
  await component.getByRole("option", { name: "Pop" }).click();

  expect(selectedValue).toBe("pop");
});

test("should display the label", async ({ mount }) => {
  const component = await mount(
    <Select options={options} label="Select a genre" />
  );
  await expect(component.getByText("Select a genre")).toBeVisible();
});

test("should show an error message", async ({ mount }) => {
  const component = await mount(
    <Select
      options={options}
      error={{ type: "required", message: "This field is required" }}
    />
  );
  await expect(component.getByText("This field is required")).toBeVisible();
});
