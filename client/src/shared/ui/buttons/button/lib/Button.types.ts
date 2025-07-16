import type { ButtonHTMLAttributes } from "react";
import type { IconName } from "shared/ui/icons";

export type ButtonVariant = "primary" | "secondary" | "outline" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  testId?: string;
  icon?: IconName;
  iconPosition?: "left" | "right";
};
