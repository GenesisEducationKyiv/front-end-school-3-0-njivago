import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CreateTrackButton } from "features/create-track";
import { EditTrackButton } from "features/edit-track";
import { RemoveTrackButton } from "features/remove-track";
import { tracksApi } from "shared/lib/api/main";
import { TracksList } from "widgets/tracks-list";
import { UploadAudioButton } from "features/upload-audio";
import type { Track } from "entities/track";
import type { CreateTrackSchema } from "features/create-track/lib/createTrack.schema";

type QueryParams = {
  page?: number;
  limit?: number;
  sort?: "title" | "artist" | "album" | "createdAt";
  order?: "asc" | "desc";
  search?: string;
  genre?: string;
  artist?: string;
};

export const HomePage = () => {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 1,
    limit: 10,
  });

  const {
    data: tracksResponse,
    isLoading: isTracksLoading,
    isFetching,
  } = tracksApi.useGetTracksQuery({
    search: queryParams,
  });

  const [createTrack] = tracksApi.useCreateTrackMutation();
  const [updateTrack] = tracksApi.useUpdateTrackMutation();
  const [deleteTracks] = tracksApi.useDeleteTracksMutation();

  const handleCreateTrack = async (data: CreateTrackSchema) => {
    await createTrack({
      body: {
        title: data.title,
        artist: data.artist,
        album: data.album,
        genres: data.genres,
        coverImage: data.coverUrl || "",
      },
    });
  };

  const handleBulkDelete = async (trackIds: string[]) => {
    await deleteTracks({
      body: { ids: trackIds },
    });
  };

  const handleQueryChange = (params: QueryParams) => {
    setQueryParams(params);
  };

  const renderTrackMenu = (track: Track) => {
    // Check if track has audio file
    const hasAudio = !!track.audioFile;

    return (
      <div className="flex items-center gap-2">
        <EditTrackButton
          onSubmit={(data) =>
            updateTrack({
              params: { id: track.id },
              body: {
                title: data.title,
                artist: data.artist,
                album: data.album,
                genres: data.genres,
                coverImage: data.coverUrl || "",
              },
            })
          }
          initialData={{
            title: track.title,
            artist: track.artist,
            album: track.album,
            genres: track.genres,
            coverUrl: track.coverImage,
          }}
          trackId={Number(track.id)}
        />
        <UploadAudioButton
          key={`upload-btn-${track.id}-${hasAudio ? "has-audio" : "no-audio"}`}
          trackId={track.id}
          hasAudio={hasAudio}
          onSuccess={() => {
            setQueryParams({ ...queryParams });
          }}
        />
        <RemoveTrackButton trackId={track.id} trackTitle={track.title} />
      </div>
    );
  };

  const tracks = tracksResponse?.data ?? [];
  const totalItems = tracksResponse?.meta?.total ?? 0;

  return (
    <div className="container mx-auto py-8">
      <div
        className="flex items-center justify-between mb-8"
        data-testid="tracks-header"
      >
        <h1 className="text-2xl font-bold">{t("tracks.title")}</h1>
        <CreateTrackButton onSubmit={handleCreateTrack} />
      </div>

      <TracksList
        tracks={tracks}
        renderMenu={renderTrackMenu}
        className="mt-6"
        onDeleteTracks={handleBulkDelete}
        totalItems={totalItems}
        isLoading={isTracksLoading || isFetching}
        onQueryChange={handleQueryChange}
      />
    </div>
  );
};
