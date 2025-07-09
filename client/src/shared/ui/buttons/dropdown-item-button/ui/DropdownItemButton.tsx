import type { PropsWithChildren } from "react";
import { cn } from "shared/lib/utils";
import type { DropdownItemButtonProps } from "../lib/DropdownItemButton.type";

export const DropdownItemButton = ({
  children,
  className,
  active = false,
  ...props
}: PropsWithChildren<DropdownItemButtonProps>) => (
  <button
    className={cn(
      "rounded-lg px-3 py-2 text-left text-sm transition-colors w-full",
      {
        "hover:bg-muted": !active,
        "bg-primary text-white": active,
      },
      className
    )}
    {...props}
  >
    {children}
  </button>
);
