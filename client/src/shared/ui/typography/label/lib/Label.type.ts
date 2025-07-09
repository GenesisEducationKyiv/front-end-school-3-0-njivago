import type { LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: "default" | "required" | "optional";
  as?: "label" | "span";
};
