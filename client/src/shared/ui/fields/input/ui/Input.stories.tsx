import type { Meta, StoryObj } from "@storybook/react";
import type { InputProps } from "../lib/Input.types";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Shared/TextField",
  component: Input,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    required: false,
    name: "name",
    id: "name",
  } satisfies InputProps,
};
