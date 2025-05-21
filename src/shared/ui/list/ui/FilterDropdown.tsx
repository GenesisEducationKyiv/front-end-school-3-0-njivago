import { useState, useEffect, ReactNode } from "react";
import { Dropdown } from "shared/ui/dropdown";
import { Button } from "shared/ui/buttons/button";
import { Text } from "shared/ui/typography/text";
import { Heading } from "shared/ui/typography/heading";
import { cn } from "shared/lib/utils";
import { useTranslation } from "react-i18next";
import type { FilterGroup } from "../lib/List.types";

interface FilterDropdownProps {
  filterGroups: FilterGroup[];
  initialFilters?: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string[]>) => void;
  className?: string;
}

export const FilterDropdown = ({
  filterGroups,
  initialFilters = {},
  onFilterChange,
  className,
}: FilterDropdownProps) => {
  const { t } = useTranslation();
  const [selectedFilters, setSelectedFilters] =
    useState<Record<string, string[]>>(initialFilters);

  useEffect(() => {
    setSelectedFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterToggle = (groupId: string, optionValue: string) => {
    setSelectedFilters((prevFilters) => {
      const currentGroupFilters = prevFilters[groupId] || [];
      let newGroupFilters: string[];

      if (currentGroupFilters.includes(optionValue)) {
        newGroupFilters = [];
      } else {
        newGroupFilters = [optionValue];
      }

      const newFilters = {
        ...prevFilters,
        [groupId]: newGroupFilters,
      };

      if (newGroupFilters.length === 0) {
        delete newFilters[groupId];
      }

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const totalFiltersSelected = Object.values(selectedFilters).reduce(
    (count, values) => count + values.length,
    0
  );

  const labelContent: ReactNode = (
    <Text variant="default">
      {t("filters.title")}{" "}
      {totalFiltersSelected > 0 && `(${totalFiltersSelected})`}
    </Text>
  );

  return (
    <Dropdown
      testId="filter-dropdown"
      label={labelContent}
      className={cn("text-sm", className)}
    >
      <div className="flex flex-col divide-y">
        {filterGroups.map((group) => (
          <div key={group.id} className="py-2">
            <Heading variant="h3" as="h3" className="mb-2 px-4 font-medium">
              {group.label}
            </Heading>
            <div className="flex flex-col">
              {group?.options?.map((option) => {
                const isSelected = (selectedFilters[group.id] || []).includes(
                  option.value
                );
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={cn(
                      "flex items-center justify-between px-4 py-1.5 text-left hover:bg-muted",
                      isSelected && "text-primary"
                    )}
                    onClick={() => handleFilterToggle(group.id, option.value)}
                  >
                    <Text as="span">{option.label}</Text>
                    {isSelected && (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {totalFiltersSelected > 0 && (
          <div className="py-2">
            <Button
              variant="outline"
              className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-muted"
              onClick={() => {
                setSelectedFilters({});
                onFilterChange({});
              }}
            >
              {t("filters.clearAll")}
            </Button>
          </div>
        )}
      </div>
    </Dropdown>
  );
};
