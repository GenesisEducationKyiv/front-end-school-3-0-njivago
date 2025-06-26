import { test, expect } from "@playwright/experimental-ct-react";
import { Button } from "../ui/Button";

test("should render with the correct text", async ({ mount }) => {
  const component = await mount(<Button>Click Me</Button>);
  await expect(component).toContainText("Click Me");
});

test("should be enabled by default", async ({ mount }) => {
  const component = await mount(<Button>Enabled</Button>);
  await expect(component).toBeEnabled();
});

test("should be disabled when the disabled prop is true", async ({ mount }) => {
  const component = await mount(<Button disabled>Disabled</Button>);
  await expect(component).toBeDisabled();
});

test("should call onClick when clicked", async ({ mount }) => {
  let clicked = false;
  const component = await mount(
    <Button onClick={() => (clicked = true)}>Clickable</Button>
  );
  await component.click();
  expect(clicked).toBe(true);
});
