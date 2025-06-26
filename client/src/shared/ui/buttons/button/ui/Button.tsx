import type { PropsWithChildren } from "react";
import { cn } from "shared/lib/utils";
import { Icon } from "shared/ui/icons";
import type { ButtonProps } from "../lib/Button.types";

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  testId,
  icon,
  iconPosition = "left",
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const isIconVariant = variant === "icon";

  return (
    <button
      data-testid={testId}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors",
        {
          "bg-primary text-white hover:bg-primary/90": variant === "primary",
          "bg-muted text-text hover:bg-muted/90": variant === "secondary",
          "border border-subtext/20 text-text hover:bg-muted":
            variant === "outline",
          "p-2 text-text hover:bg-muted": isIconVariant,
          "px-3 py-1.5 text-sm": size === "sm" && !isIconVariant,
          "px-4 py-2": size === "md" && !isIconVariant,
          "px-6 py-3 text-lg": size === "lg" && !isIconVariant,
          "h-8 w-8": isIconVariant && size === "sm",
          "h-10 w-10": isIconVariant && size === "md",
          "h-12 w-12": isIconVariant && size === "lg",
        },
        className
      )}
      {...props}
    >
      {isIconVariant ? (
        icon && <Icon name={icon} className="h-5 w-5" />
      ) : (
        <>
          {icon && (
            <Icon
              name={icon}
              className={cn("h-4 w-4", {
                "order-first mr-2": iconPosition === "left",
                "order-last ml-2": iconPosition === "right",
              })}
            />
          )}
          {children}
        </>
      )}
    </button>
  );
};
