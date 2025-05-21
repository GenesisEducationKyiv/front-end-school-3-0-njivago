import { useState, useEffect, ReactNode } from "react";
import { Dropdown } from "shared/ui/dropdown";
import { Button } from "shared/ui/buttons/button";
import { Text } from "shared/ui/typography/text";
import { cn } from "shared/lib/utils";
import { useTranslation } from "react-i18next";
import type { SortDirection, SortOption } from "../lib/List.types";

interface SortDropdownProps<T = any> {
  options: SortOption<T>[];
  initialSort?: keyof T;
  initialDirection?: SortDirection;
  onSortChange: (field: keyof T, direction: SortDirection) => void;
  className?: string;
}

export const SortDropdown = <T,>({
  options,
  initialSort,
  initialDirection = "asc",
  onSortChange,
  className,
}: SortDropdownProps<T>) => {
  const { t } = useTranslation();
  const [currentSort, setCurrentSort] = useState<keyof T | undefined>(
    initialSort
  );
  const [direction, setDirection] = useState<SortDirection>(initialDirection);

  useEffect(() => {
    if (initialSort) {
      setCurrentSort(initialSort);
    }
    if (initialDirection) {
      setDirection(initialDirection);
    }
  }, [initialSort, initialDirection]);

  const handleSortChange = (option: SortOption<T>) => {
    if (currentSort === option.value) {
      const newDirection = direction === "asc" ? "desc" : "asc";
      setDirection(newDirection);
      onSortChange(option.value, newDirection);
    } else {
      setCurrentSort(option.value);
      setDirection("asc");
      onSortChange(option.value, "asc");
    }
  };

  const currentSortLabel = currentSort
    ? options.find((option) => option.value === currentSort)?.label
    : t("sort.title");

  const labelContent: ReactNode = (
    <div className="flex items-center gap-2">
      <Text as="span">Sort: {currentSortLabel}</Text>
      {currentSort && (
        <svg
          className={cn(
            "h-4 w-4 transition-transform",
            direction === "desc" && "rotate-180"
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      )}
    </div>
  );

  return (
    <Dropdown
      testId="sort-select"
      label={labelContent}
      className={cn("text-sm", className)}
    >
      <div className="flex flex-col py-1">
        {options.map((option) => (
          <Button
            key={option.value.toString()}
            variant="outline"
            className={cn(
              "flex items-center justify-between px-4 py-2 text-left hover:bg-muted border-none rounded-none",
              currentSort === option.value && "font-medium text-primary"
            )}
            onClick={() => handleSortChange(option)}
          >
            <Text as="span">{option.label}</Text>
            {currentSort === option.value && (
              <svg
                className={cn("h-4 w-4", direction === "desc" && "rotate-180")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            )}
          </Button>
        ))}
      </div>
    </Dropdown>
  );
};
