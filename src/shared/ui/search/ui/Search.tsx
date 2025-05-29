import { cn } from "shared/lib/utils";
import type { SearchProps } from "../lib/Search.type";
import { SearchIcon } from "./SearchIcon";

export const Search = ({ className, ...props }: SearchProps) => (
  <div className="relative">
    <input
      type="search"
      data-testid="search-input"
      className={cn(
        "w-full rounded-xl bg-muted px-4 py-2 pl-10 text-text placeholder:text-subtext focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      {...props}
    />
    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtext" />
  </div>
);
