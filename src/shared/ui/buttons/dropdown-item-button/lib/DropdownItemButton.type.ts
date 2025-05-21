import { type ButtonHTMLAttributes } from "react";

export type DropdownItemButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    active?: boolean;
  };
