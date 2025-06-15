import type { FieldError } from "react-hook-form";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError;
  required?: boolean;
};
