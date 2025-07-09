import { forwardRef } from "react";
import { cn } from "shared/lib/utils";
import { variantStyles } from "../lib/Text.constants";
import type { TextProps } from "../lib/Text.type";

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant = "default", as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  )
);
