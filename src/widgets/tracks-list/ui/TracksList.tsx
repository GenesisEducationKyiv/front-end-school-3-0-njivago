import { useState, useEffect } from "react";
import { TrackCard } from "shared/ui/track-card";
import { Button } from "shared/ui/buttons/button/ui/Button";
import { useTranslation } from "react-i18next";
import { List, type SortOption, type FilterGroup } from "shared/ui/list";
import { useActionConfirmation } from "widgets/action-confirmation";
import type { TracksListProps } from "../lib/TracksList.types";
import type { Track } from "entities/track";
import type { SortDirection } from "shared/ui/list/lib/List.types";
import { genresApi } from "shared/lib/api/main/genres/genres.api";
import type { TGenresApi } from "shared/lib/api/main";

const DEFAULT_COVER = "https://placehold.co/400x400?text=No+Cover";

// ToDo: optimize and improve the list, it was developed in a rush

export const TracksList = ({
  tracks,
  renderMenu,
  className,
  onDeleteTracks,
  totalItems = 0,
  isLoading = false,
  onQueryChange,
}: TracksListProps) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState<
    "title" | "artist" | "album" | "createdAt"
  >();
  const [sortDirection, setSortDirection] = useState<SortDirection>();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);

  const { data: genresResponse } = genresApi.useGetGenresQuery();

  const uniqueGenres: TGenresApi.TGetGenresResponse["data"] =
    genresResponse?.data || [];

  const sortOptions: SortOption<Track>[] = [
    { label: t("tracks.sort.title"), value: "title" },
    { label: t("tracks.sort.artist"), value: "artist" },
    { label: t("tracks.sort.album"), value: "album" },
    { label: t("tracks.sort.date"), value: "createdAt" },
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: "genres",
      label: t("tracks.filters.genres"),
      options: uniqueGenres?.map((genre: string) => ({
        id: genre.toLowerCase().replace(/\s+/g, "-"),
        label: genre,
        value: genre,
      })),
    },
  ];

  useEffect(() => {
    if (onQueryChange) {
      let genre: string | undefined;
      if (activeFilters.genres?.length) {
        genre = activeFilters.genres[0];
      }

      onQueryChange({
        page,
        limit,
        ...(searchQuery ? { search: searchQuery } : {}),
        ...(genre ? { genre } : {}),
        ...(sortField ? { sort: sortField } : {}),
        ...(sortDirection ? { order: sortDirection } : {}),
      });
    }
  }, [
    page,
    limit,
    sortField,
    sortDirection,
    activeFilters,
    searchQuery,
    onQueryChange,
    activeFilters.length,
  ]);

  const handleSortChange = (field: keyof Track, direction: SortDirection) => {
    if (field === "title" || field === "artist" || field === "album") {
      setSortField(field);
    } else if (field === "createdAt") {
      setSortField("createdAt");
    }
    setSortDirection(direction);
    setPage(1);
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    setPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageSizeChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleSelectionChange = (selectedIds: (string | number)[]) => {
    setSelectedTrackIds(selectedIds.map((id) => id.toString()));
  };

  const { openConfirmation } = useActionConfirmation();

  const handleDeleteTracks = () => {
    if (onDeleteTracks && selectedTrackIds.length > 0) {
      openConfirmation({
        title: t("tracks.delete.confirmTitle"),
        description: t("tracks.delete.confirmDescription", {
          count: selectedTrackIds.length,
        }),
        confirmAction: () => {
          onDeleteTracks(selectedTrackIds);
          setSelectedTrackIds([]);
        },
        renderConfirmButton: (onClick) => (
          <Button
            variant="primary"
            className="flex-1 bg-red-500 hover:bg-red-600"
            onClick={onClick}
          >
            {t("tracks.delete.confirm")}
          </Button>
        ),
      });
    }
  };

  const renderTrack = (track: Track) => (
    <TrackCard
      id={track.id}
      title={track.title || ""}
      artist={track.artist}
      album={track.album}
      cover={track.coverImage || DEFAULT_COVER}
      tags={track.genres}
      audioSrc={track.audioFile}
      menuButton={renderMenu?.(track)}
    />
  );

  return (
    <List
      items={tracks}
      renderItem={renderTrack}
      emptyMessage={t("tracks.empty")}
      className={className}
      page={page}
      pageSize={limit}
      totalItems={totalItems}
      onPageChange={setPage}
      onPageSizeChange={handlePageSizeChange}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      sortOptions={sortOptions}
      initialSort={sortField}
      initialSortDirection={sortDirection}
      onSortChange={handleSortChange}
      filterGroups={filterGroups}
      initialFilters={activeFilters}
      onFilterChange={handleFilterChange}
      searchPlaceholder={t("tracks.search")}
      onSearch={handleSearch}
      selectable={!!onDeleteTracks}
      onSelectionChange={handleSelectionChange}
      isLoading={isLoading}
      bulkActions={
        onDeleteTracks ? (
          <Button
            variant="outline"
            size="sm"
            className="text-red-500"
            onClick={handleDeleteTracks}
            disabled={selectedTrackIds.length === 0}
          >
            {t("tracks.delete.selected")}
          </Button>
        ) : undefined
      }
    />
  );
};
