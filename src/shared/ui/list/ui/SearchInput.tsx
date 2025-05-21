import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Search } from "shared/ui/search";
import { cn } from "shared/lib/utils";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export const SearchInput = ({
  onSearch,
  placeholder = "Search...",
  debounceMs = 300,
  className,
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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
