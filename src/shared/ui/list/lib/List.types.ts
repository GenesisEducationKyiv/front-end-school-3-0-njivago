import type { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export type SortOption<T = unknown> = {
  label: string;
  value: keyof T;
};

export type FilterOption = {
  id: string;
  label: string;
  value: string;
};

export type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
};

export type ListProps<T = unknown> = {
  items: T[];
  idField?: keyof T;
  renderItem: (item: T) => ReactNode;
  emptyMessage?: string;
  className?: string;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  sortOptions?: SortOption<T>[];
  initialSort?: keyof T;
  initialSortDirection?: SortDirection;
  onSortChange?: (field: keyof T, direction: SortDirection) => void;
  filterGroups?: FilterGroup[];
  initialFilters?: Record<string, string[]>;
  onFilterChange?: (filters: Record<string, string[]>) => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch?: (query: string) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  bulkActions?: ReactNode;
  isLoading?: boolean;
  onDataRequest?: (params: {
    page: number;
    pageSize: number;
    sort?: keyof T;
    sortDirection?: SortDirection;
    filters?: Record<string, string[]>;
    search?: string;
  }) => void;
};
