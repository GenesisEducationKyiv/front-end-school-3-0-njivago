import { useMemo } from "react";
import { Button } from "shared/ui/buttons/button/ui/Button";
import { Text } from "shared/ui/typography/text";
import { cn } from "shared/lib/utils";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const { t } = useTranslation();

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);

      if (leftBound > 2) {
        pages.push("ellipsis-start");
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }
      if (rightBound < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      data-testid="pagination"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <Button
        data-testid="pagination-prev"
        variant="outline"
        disabled={currentPage === 1 || totalPages === 0}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label={t("pagination.previous")}
      >
        <span className="sr-only">{t("pagination.previous")}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          return (
            <Text key={`${page}-${index}`} as="span" className="px-2">
              ...
            </Text>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "primary" : "outline"}
            size="sm"
            onClick={() => onPageChange(page as number)}
            className="min-w-[36px]"
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        data-testid="pagination-next"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label={t("pagination.next")}
      >
        <span className="sr-only">{t("pagination.next")}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Button>
    </div>
  );
};
