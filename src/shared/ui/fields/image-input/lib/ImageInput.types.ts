import type { FieldError } from "react-hook-form";

export type ImageInputProps = {
  label?: string;
  error?: FieldError;
  required?: boolean;
  id?: string;
  value?: string;
  onChange: (file: File) => void;
  className?: string;
};
