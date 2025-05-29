import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type GenreInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
};
