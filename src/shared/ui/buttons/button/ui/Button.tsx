import type { PropsWithChildren } from "react";
import { cn } from "shared/lib/utils";
import type { ButtonProps } from "../lib/Button.type";

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  testId,
  ...props
}: PropsWithChildren<ButtonProps>) => (
  <button
    data-testid={testId}
    className={cn(
      "rounded-xl font-medium transition-colors",
      {
        "bg-primary text-white hover:bg-primary/90": variant === "primary",
        "bg-muted text-text hover:bg-muted/90": variant === "secondary",
        "border border-subtext/20 text-text hover:bg-muted":
          variant === "outline",
        "px-3 py-1.5 text-sm": size === "sm",
        "px-4 py-2": size === "md",
        "px-6 py-3 text-lg": size === "lg",
      },
      className
    )}
    {...props}
  >
    {children}
  </button>
);
