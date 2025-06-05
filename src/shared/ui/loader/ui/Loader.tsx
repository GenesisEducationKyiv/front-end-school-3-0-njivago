import { cn } from "shared/lib/utils";
import type { LoaderProps } from "../lib/Loader.type";

export const Loader = ({
  size = "md",
  color = "primary",
  className,
}: LoaderProps) => (
  <div
    data-testid="loading-indicator"
    className={cn(
      "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
      {
        "h-4 w-4": size === "sm",
        "h-6 w-6": size === "md",
        "h-8 w-8": size === "lg",
        "text-primary": color === "primary",
        "text-white": color === "white",
      },
      className
    )}
  />
);
