import type { TextareaHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: FieldError;
  required?: boolean;
};
