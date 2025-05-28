import { useState, useEffect, type ReactNode } from "react";
import { cn } from "shared/lib/utils";
import { Pagination } from "./Pagination";
import { SortDropdown } from "./SortDropdown";
import { FilterDropdown } from "./FilterDropdown";
import { SearchInput } from "./SearchInput";
import { SelectionCheckbox } from "./SelectionCheckbox";
import { Select } from "shared/ui/fields/select";
import { useTranslation } from "react-i18next";
import { Loader } from "shared/ui/loader";
import type { ListProps, SortDirection } from "../lib/List.types";

export const List = <T extends Record<string, unknown>>({
  items,
  idField = "id" as keyof T,
  renderItem,
  emptyMessage,
  className,
  page = 1,
  pageSize = 10,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
  sortOptions,
  initialSort,
  initialSortDirection,
  onSortChange,
  filterGroups,
  initialFilters,
  onFilterChange,
  searchPlaceholder,
  onSearch,
  selectable = false,
  onSelectionChange,
  bulkActions,
  isLoading = false,
}: ListProps<T>) => {
  const { t } = useTranslation();
  const defaultEmptyMessage = t("list.emptyMessage");
  const [currentPage, setCurrentPage] = useState(page);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [selected, setSelected] = useState<Record<string | number, boolean>>(
    {}
  );
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    setSelected({});
    setIsAllSelected(false);
  }, [items]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    setCurrentPageSize(pageSize);
  }, [pageSize]);

  const totalPages = Math.ceil(
    totalItems !== undefined && currentPageSize > 0
      ? totalItems / currentPageSize
      : items.length / currentPageSize
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    const newPage =
      Math.floor(((currentPage - 1) * currentPageSize) / newPageSize) + 1;
    setCurrentPageSize(newPageSize);
    setCurrentPage(newPage);

    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);

      if (newPage !== currentPage && onPageChange) {
        onPageChange(newPage);
      }
    }
  };

  const handleSortChange = (field: keyof T, direction: SortDirection) => {
    if (onSortChange) {
      onSortChange(field, direction);
    }
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const handleSearch = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected({});
      setIsAllSelected(false);
      if (onSelectionChange) {
        onSelectionChange([]);
      }
    } else {
      const newSelected: Record<string | number, boolean> = {};
      const selectedIds: (string | number)[] = [];

      items.forEach((item) => {
        const itemId = item[idField] as string | number;
        newSelected[itemId] = true;
        selectedIds.push(itemId);
      });

      setSelected(newSelected);
      setIsAllSelected(true);

      if (onSelectionChange) {
        onSelectionChange(selectedIds);
      }
    }
  };

  const toggleSelectItem = (itemId: string | number) => {
    setSelected((prev) => {
      const newSelected = { ...prev };
      if (newSelected[itemId]) {
        delete newSelected[itemId];
      } else {
        newSelected[itemId] = true;
      }

      const allSelected = items.every(
        (item) => newSelected[item[idField] as string | number]
      );
      setIsAllSelected(allSelected);

      if (onSelectionChange) {
        onSelectionChange(Object.keys(newSelected));
      }

      return newSelected;
    });
  };

  const someSelected = Object.keys(selected).length > 0 && !isAllSelected;

  const selectedCount = Object.keys(selected).length;

  const renderToolbar = (): ReactNode => {
    const hasToolbarItems =
      sortOptions || filterGroups || onSearch || onPageSizeChange;
    if (!hasToolbarItems && !selectable) return null;

    return (
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {selectable && (
            <div className="flex items-center gap-4">
              <SelectionCheckbox
                checked={isAllSelected}
                indeterminate={someSelected}
                onChange={toggleSelectAll}
              />

              {selectedCount > 0 && (
                <span className="text-sm">
                  {t(
                    selectedCount === 1
                      ? "list.itemsSelected"
                      : "list.itemsSelectedPlural",
                    { count: selectedCount }
                  )}
                </span>
              )}

              {selectedCount > 0 && bulkActions && (
                <div className="ml-4">{bulkActions}</div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
          {onSearch && (
            <SearchInput
              onSearch={handleSearch}
              placeholder={searchPlaceholder}
              className="max-w-xs"
            />
          )}

          {filterGroups && (
            <FilterDropdown
              filterGroups={filterGroups}
              initialFilters={initialFilters}
              onFilterChange={handleFilterChange}
            />
          )}

          {sortOptions && (
            <SortDropdown
              options={sortOptions}
              initialSort={initialSort}
              initialDirection={initialSortDirection}
              onSortChange={handleSortChange}
            />
          )}
          {onPageSizeChange && currentPageSize !== undefined && (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm">{t("list.itemsPerPage")}</span>
              <Select
                options={(pageSizeOptions || [5, 10, 20, 50, 100]).map(
                  (size) => ({
                    value: size.toString(),
                    label: size.toString(),
                  })
                )}
                value={currentPageSize.toString()}
                onChange={(value) => handlePageSizeChange(Number(value))}
                className="w-20"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!isLoading && (!items || items.length === 0)) {
    return (
      <div className={cn("w-full", className)}>
        {renderToolbar()}
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <p className="mb-4 text-gray-500">
            {emptyMessage || defaultEmptyMessage}
          </p>
        </div>
        {onPageSizeChange && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {renderToolbar()}

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader size="lg" />
          <span className="ml-2">{t("list.loading")}</span>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {items.map((item) => {
              const itemId = item[idField] as string | number;

              if (selectable) {
                return (
                  <div key={itemId} className="flex items-start gap-3">
                    <SelectionCheckbox
                      checked={!!selected[itemId]}
                      onChange={() => toggleSelectItem(itemId)}
                      className="mt-4"
                    />
                    <div className="flex-1">{renderItem(item)}</div>
                  </div>
                );
              }

              return <div key={itemId}>{renderItem(item)}</div>;
            })}
          </div>

          {(totalPages > 1 || onPageSizeChange) && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
