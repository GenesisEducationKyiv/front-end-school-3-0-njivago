import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError;
  required?: boolean;
};
