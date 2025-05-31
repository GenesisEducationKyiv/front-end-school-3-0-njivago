import type { FieldError } from "react-hook-form";

export type FileDropzoneProps = {
  label?: string;
  error?: FieldError;
  required?: boolean;
  id?: string;
  onFilesAccepted: (files: File[]) => void;
  accept?: string[];
  maxSize?: number;
  multiple?: boolean;
  className?: string;
};
