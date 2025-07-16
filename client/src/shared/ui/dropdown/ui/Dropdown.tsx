import { useState, useRef, useEffect } from "react";
import type { PropsWithChildren } from "react";
import { cn } from "shared/lib/utils";
import { Button } from "shared/ui/buttons/button/ui/Button";
import type { DropdownProps } from "../lib/Dropdown.type";
import { ChevronIcon } from "./ChevronIcon";

export const Dropdown = ({
  label,
  children,
  className,
  trigger,
  align = "right",
  testId,
}: PropsWithChildren<DropdownProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (
        dropdownRef.current &&
        target instanceof Node &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const defaultTrigger = (
    <Button
      variant="secondary"
      onClick={() => setIsOpen(!isOpen)}
      className={cn("flex items-center", className)}
    >
      {label}
      <ChevronIcon
        className={cn(
          "h-4 w-4 transition-transform ml-2",
          isOpen && "rotate-180"
        )}
      />
    </Button>
  );

  return (
    <div className="relative" ref={dropdownRef} data-testid={testId}>
      {trigger ? (
        <div role="button" tabIndex={1} onClick={() => setIsOpen(!isOpen)}>
          {trigger}
        </div>
      ) : (
        defaultTrigger
      )}

      {isOpen && (
        <div
          className={cn(
            "absolute top-full z-10 mt-1 min-w-[200px] rounded-xl bg-white p-2 shadow-modal",
            {
              "left-0": align === "left",
              "right-0": align === "right",
            }
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
