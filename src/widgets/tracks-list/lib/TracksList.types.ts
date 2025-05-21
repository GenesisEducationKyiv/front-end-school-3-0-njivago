import { ReactNode } from "react";
import type { Track } from "entities/track";

type QueryParams = {
  page?: number;
  limit?: number;
  sort?: "title" | "artist" | "album" | "createdAt";
  order?: "asc" | "desc";
  search?: string;
  genre?: string;
  artist?: string;
};

export type TracksListProps = {
  tracks: Track[];
  renderMenu?: (track: Track) => ReactNode;
  className?: string;
  onDeleteTracks?: (trackIds: string[]) => void;
  onAudioUpdated?: (trackId: string) => void;
  totalItems?: number;
  isLoading?: boolean;
  onQueryChange?: (params: QueryParams) => void;
};
