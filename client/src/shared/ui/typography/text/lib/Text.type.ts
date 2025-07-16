import type { HTMLAttributes } from "react";

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  variant?: "default" | "muted" | "small";
  as?: "p" | "span" | "div";
};
