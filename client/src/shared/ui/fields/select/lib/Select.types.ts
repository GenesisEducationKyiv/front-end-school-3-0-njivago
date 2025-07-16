import type { HTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  label?: string;
  error?: FieldError;
  required?: boolean;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
};
