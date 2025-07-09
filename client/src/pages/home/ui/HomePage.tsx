import { useTranslation } from "react-i18next";
import { useState, Suspense } from "react";
import { CreateTrackButton } from "features/create-track";
import { EditTrackButton } from "features/edit-track";
import { RemoveTrackButton } from "features/remove-track";
import { TracksList } from "widgets/tracks-list";
import type { Track } from "entities/track";
import { UploadAudioButton } from "features/upload-audio";
import type { CreateTrackSchema } from "features/create-track/lib/createTrack.schema";
import type { EditTrackSchema } from "features/edit-track";
import type { TGetTracksOptions } from "shared/lib/api/tracks";
import {
  useCreateTrackMutation,
  useDeleteTracksMutation,
  useTracksQuery,
  useUpdateTrackMutation,
} from "shared/lib/api/tracks";
import { useActiveTrackChanged } from "shared/lib/api/activeTrack";
import { Loader } from "shared/ui";

export const HomePage = () => {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useState<TGetTracksOptions["input"]>({
    page: "1",
    limit: "10",
  });

  const [{ data: tracksResponse, fetching }] = useTracksQuery({
    input: queryParams,
  });

  const [{ data: activeTrackResponse }] = useActiveTrackChanged();

  const [createTrack] = useCreateTrackMutation();
  const [updateTrack] = useUpdateTrackMutation();
  const [deleteTracks] = useDeleteTracksMutation();

  const handleCreateTrack = async (data: CreateTrackSchema) =>
    await createTrack({
      input: {
        title: data.title,
        artist: data.artist,
        album: data.album,
        genres: data.genres,
        coverImage: data.coverUrl || "",
      },
    });

  const handleUpdateTrack = async (trackId: string, data: EditTrackSchema) =>
    await updateTrack({
      id: trackId,
      input: {
        title: data.title,
        artist: data.artist,
        album: data.album,
        genres: data.genres,
        coverImage: data.coverUrl || "",
      },
    });

  const handleBulkDelete = async (trackIds: string[]) => {
    await deleteTracks({
      input: {
        ids: trackIds,
      },
    });
  };

  const handleQueryChange = (params: TGetTracksOptions["input"]) => {
    setQueryParams(params);
  };

  const renderTrackMenu = (track: Track) => {
    const hasAudio = !!track.audioFile;

    return (
      <div className="flex items-center gap-2">
        <EditTrackButton
          onSubmit={(data) => handleUpdateTrack(track.id, data)}
          initialData={{
            title: track.title,
            artist: track.artist,
            album: track.album || "",
            genres: track.genres,
            coverUrl: track.coverImage || "",
          }}
          trackId={Number(track.id)}
        />
        <Suspense fallback={<Loader />}>
          <UploadAudioButton
            key={`upload-btn-${track.id}-${
              hasAudio ? "has-audio" : "no-audio"
            }`}
            trackId={track.id}
            hasAudio={hasAudio}
            onSuccess={() => {
              setQueryParams({ ...queryParams });
            }}
          />
        </Suspense>
        <RemoveTrackButton trackId={track.id} trackTitle={track.title} />
      </div>
    );
  };

  const tracks = tracksResponse?.tracks?.data ?? [];
  const totalItems = tracksResponse?.tracks?.meta?.total ?? 0;

  return (
    <div className="container mx-auto py-8">
      <div
        className="flex items-center justify-between mb-8"
        data-testid="tracks-header"
      >
        <h1 className="text-2xl font-bold">{t("tracks.title")}</h1>
        <CreateTrackButton onSubmit={handleCreateTrack} />
      </div>
      <h3>Active track: {activeTrackResponse?.activeTrackChanged}</h3>

      <Suspense fallback={<Loader />}>
        <TracksList
          tracks={tracks}
          renderMenu={renderTrackMenu}
          className="mt-6"
          onDeleteTracks={handleBulkDelete}
          totalItems={totalItems}
          isLoading={fetching}
          onQueryChange={handleQueryChange}
        />
      </Suspense>
    </div>
  );
};
