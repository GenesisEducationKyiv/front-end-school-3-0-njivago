import { useState, useEffect } from "react";
import { TrackCard } from "shared/ui/track-card";
import { Button } from "shared/ui/buttons/button/ui/Button";
import { useTranslation } from "react-i18next";
import { List } from "shared/ui/list";
import { useActionConfirmation } from "widgets/action-confirmation";
import type { SortOption, FilterGroup } from "shared/ui/list";
import type { TracksListProps } from "../lib/TracksList.types";
import type { Track } from "entities/track";
import type { SortDirection } from "shared/ui/list/lib/List.types";
import { useSearchParamsState } from "shared/lib/hooks";
import { useGenresQuery } from "shared/lib/api/genres";
import type { TGetTracksOptions } from "shared/lib/api/tracks";

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
  const { searchParams, updateSearchParams, removeSearchParams } =
    useSearchParamsState<TGetTracksOptions["input"]>({
      keys: ["page", "limit", "sort", "order", "search", "genre"],
      defaultValues: {
        page: "1",
        limit: "10",
      },
    });

  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);

  const [{ data: genresResponse }] = useGenresQuery();

  const uniqueGenres = genresResponse?.genres || [];

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
      if (searchParams.genre) {
        genre = searchParams.genre;
      }

      onQueryChange({
        page: String(searchParams.page),
        limit: String(searchParams.limit),
        ...(searchParams.search ? { search: searchParams.search } : {}),
        ...(genre ? { genre } : {}),
        ...(searchParams.sort ? { sort: searchParams.sort } : {}),
        ...(searchParams.order ? { order: searchParams.order } : {}),
      });
    }
  }, [searchParams, onQueryChange]);

  const handleSortChange = (field: keyof Track, direction: SortDirection) => {
    if (field === "title" || field === "artist" || field === "album") {
      updateSearchParams({
        sort: field,
        order: direction,
        page: "1",
      });
    } else if (field === "createdAt") {
      updateSearchParams({
        sort: "createdAt",
        order: direction,
        page: "1",
      });
    }
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    if (filters.genres?.length) {
      updateSearchParams({
        genre: filters.genres[0],
        page: "1",
      });
    } else {
      removeSearchParams(["genre"]);
      updateSearchParams({ page: "1" });
    }
  };

  const handleSearch = (query: string) => {
    if (query) {
      updateSearchParams({
        search: query,
        page: "1",
      });
    } else {
      removeSearchParams(["search"]);
      updateSearchParams({ page: "1" });
    }
  };

  const handlePageSizeChange = (newLimit: number) => {
    updateSearchParams({
      limit: String(newLimit),
      page: "1",
    });
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
      page={Number(searchParams.page)}
      pageSize={Number(searchParams.limit)}
      totalItems={totalItems}
      onPageChange={(newPage) => {
        updateSearchParams({ page: String(newPage) });
      }}
      onPageSizeChange={handlePageSizeChange}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      sortOptions={sortOptions}
      initialSort={searchParams.sort}
      initialSortDirection={searchParams.order}
      onSortChange={handleSortChange}
      filterGroups={filterGroups}
      initialFilters={
        searchParams.genre ? { genres: [searchParams.genre] } : { genres: [] }
      }
      onFilterChange={handleFilterChange}
      searchPlaceholder={t("tracks.search")}
      searchValue={searchParams.search}
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
