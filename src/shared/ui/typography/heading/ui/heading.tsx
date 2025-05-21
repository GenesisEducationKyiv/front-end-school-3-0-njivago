import { forwardRef } from "react";
import { cn } from "shared/lib/utils";
import { HeadingProps } from "../lib/Heading.type";
import { variantStyles } from "../lib/Heading.constants";

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant = "h1", as: Component = variant, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  )
);
