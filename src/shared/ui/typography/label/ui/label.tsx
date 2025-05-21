import { forwardRef } from "react";
import { cn } from "shared/lib/utils";
import { LabelProps } from "../lib/Label.type";
import { variantStyles } from "../lib/Label.constants";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    { className, variant = "default", as: Component = "label", ...props },
    ref
  ) => (
    <Component
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  )
);
