import { forwardRef } from "react";
import { cn } from "shared/lib/utils";
import { FormField } from "../../base";
import type { CheckboxProps } from "../lib/Checkbox.types";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, required, id, children, ...props }, ref) => (
    <FormField label={label} error={error} required={required} htmlFor={id}>
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={cn(
            "h-5 w-5 rounded border-gray-300 bg-white cursor-pointer",
            "text-primary-600 focus:ring-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {children && (
          <span className="ml-2 text-sm text-gray-800">{children}</span>
        )}
      </div>
    </FormField>
  )
);
