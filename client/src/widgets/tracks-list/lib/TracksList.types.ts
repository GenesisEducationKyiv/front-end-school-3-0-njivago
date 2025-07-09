import type { ReactNode } from "react";
import type { Track } from "entities/track";
import type { TGetTracksOptions } from "shared/lib/api/tracks";

export type TracksListProps = {
  tracks: Track[];
  renderMenu?: (track: Track) => ReactNode;
  className?: string;
  onDeleteTracks?: (trackIds: string[]) => void;
  onAudioUpdated?: (trackId: string) => void;
  totalItems?: number;
  isLoading?: boolean;
  onQueryChange?: (params: TGetTracksOptions["input"]) => void;
};
