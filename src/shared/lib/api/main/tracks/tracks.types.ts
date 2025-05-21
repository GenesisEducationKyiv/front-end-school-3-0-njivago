import { PreparedResponse, QueryOptions } from "../../types";
import {
  deleteTracksSchema,
  getTracksSchema,
  trackSchema,
} from "./tracks.schema";

export type TGetTracksOptions = QueryOptions<
  void,
  {
    page?: number;
    limit?: number;
    sort?: "title" | "artist" | "album" | "createdAt";
    order?: "asc" | "desc";
    search?: string;
    genre?: string;
    artist?: string;
  }
>;
export type TGetTracksResponse = PreparedResponse<typeof getTracksSchema>;

export type TGetTrackBySlugOptions = QueryOptions<{
  slug: string;
}>;
export type TGetTrackBySlugResponse = PreparedResponse<typeof trackSchema>;

export type TCreateTrackBody = {
  title: string;
  artist: string;
  album: string;
  genres: string[];
  coverImage: string;
};

export type TCreateTrackOptions = QueryOptions<void, void, TCreateTrackBody>;
export type TCreateTrackResponse = PreparedResponse<typeof trackSchema>;

export type TUpdateTrackBody = {
  title?: string;
  artist?: string;
  album?: string;
  genres?: string[];
  coverImage?: string;
};

export type TUpdateTrackOptions = QueryOptions<
  {
    id: string;
  },
  void,
  TUpdateTrackBody
>;
export type TUpdateTrackResponse = PreparedResponse<typeof trackSchema>;

export type TDeleteTrackOptions = QueryOptions<
  {
    id: string;
  },
  void,
  {}
>;
export type TDeleteTrackResponse = { success: string[] };

export type TDeleteTracksBody = {
  ids: string[];
};

export type TDeleteTracksOptions = QueryOptions<void, void, TDeleteTracksBody>;
export type TDeleteTracksResponse = PreparedResponse<typeof deleteTracksSchema>;

export type TUploadTrackAudioBody = {
  file: File;
};

export type TUploadTrackAudioOptions = {
  params: {
    id: string;
  };
  body: TUploadTrackAudioBody;
};
export type TUploadTrackAudioResponse = PreparedResponse<typeof trackSchema>;

export type TDeleteTrackFileOptions = QueryOptions<
  {
    id: string;
  },
  void,
  {}
>;
export type TDeleteTrackFileResponse = PreparedResponse<typeof trackSchema>;
