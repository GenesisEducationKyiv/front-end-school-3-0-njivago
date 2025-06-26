import type { HTMLAttributes } from "react";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  variant?: "h1" | "h2" | "h3";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
