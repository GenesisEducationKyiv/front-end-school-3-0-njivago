import type { Meta, StoryObj } from "@storybook/react";
import type { LoaderProps } from "../lib/Loader.type";
import { Loader } from "./Loader";

const meta: Meta<typeof Loader> = {
  title: "Shared/Loader",
  component: Loader,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    size: "md",
    color: "primary",
  } satisfies LoaderProps,
};

export const LargeWhite: Story = {
  args: {
    size: "lg",
    color: "white",
  } satisfies LoaderProps,
};
