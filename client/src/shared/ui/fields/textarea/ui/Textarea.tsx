import { forwardRef } from "react";
import { cn } from "shared/lib/utils";
import { FormField } from "../../base";
import type { TextareaProps } from "../lib/Textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, required, id, ...props }, ref) => (
    <FormField label={label} error={error} required={required} htmlFor={id}>
      <textarea
        ref={ref}
        id={id}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
          "placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FormField>
  )
);
