import type { ReactNode } from "react";

export type DropdownProps = {
  label?: ReactNode;
  className?: string;
  align?: "left" | "right";
  trigger?: ReactNode;
  testId?: string;
};
