import type { FieldError } from "react-hook-form";
import { cn } from "shared/lib/utils";

type FormErrorProps = {
  error?: FieldError;
  className?: string;
}

export const FormError = ({ error, className }: FormErrorProps) => {
  if (!error) return null;

  return (
    <p
      className={cn("text-sm text-red-500", "dark:text-red-400", className)}
      role="alert"
    >
      {error.message}
    </p>
  );
};
