import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { Search } from "shared/ui/search";
import { cn } from "shared/lib/utils";

type SearchInputProps = {
  onSearch: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  value?: string;
};

export const SearchInput = ({
  onSearch,
  placeholder = "Search...",
  debounceMs = 300,
  className,
  value: initialValue = "",
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState(initialValue);
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      onSearch(value);
    }, debounceMs);
  };

  return (
    <Search
      className={cn("w-full max-w-md", className)}
      placeholder={placeholder}
      value={searchValue}
      onChange={handleSearchChange}
    />
  );
};
