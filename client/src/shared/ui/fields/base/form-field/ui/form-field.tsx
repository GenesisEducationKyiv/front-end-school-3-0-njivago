import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "shared/lib/utils";

type FormFieldProps = {
  label?: string;
  error?: FieldError;
  required?: boolean;
  htmlFor?: string;
} & HTMLAttributes<HTMLDivElement>;

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, error, required, htmlFor, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-text">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error.message}
        </p>
      )}
    </div>
  )
);
