import type { InferOutput } from "valibot";
import type {
  deleteTracksSchema,
  getTracksSchema,
  trackSchema,
} from "./tracks.schema";

export type TGetTracksOptions = {
  input: {
    page?: string;
    limit?: string;
    sort?: "title" | "artist" | "album" | "createdAt";
    order?: "asc" | "desc";
    search?: string;
    genre?: string;
    artist?: string;
  };
};
export type TGetTracksResponse = InferOutput<typeof getTracksSchema>;

export type TGetTrackBySlugOptions = {
  slug: string;
};
export type TGetTrackBySlugResponse = InferOutput<typeof trackSchema>;

export type TGetTrackByIdOptions = {
  id: string;
};
export type TGetTrackByIdResponse = InferOutput<typeof trackSchema>;

export type TCreateTrackOptions = {
  input: {
    title: string;
    artist: string;
    album: string;
    genres: string[];
    coverImage: string;
  };
};
export type TCreateTrackResponse = InferOutput<typeof trackSchema>;

export type TUpdateTrackOptions = {
  id: string;
  input: {
    title?: string;
    artist?: string;
    album?: string;
    genres?: string[];
    coverImage?: string;
  };
};
export type TUpdateTrackResponse = InferOutput<typeof trackSchema>;

export type TDeleteTrackOptions = {
  id: string;
};
export type TDeleteTrackResponse = { success: string[] };

export type TDeleteTracksOptions = {
  input: {
    ids: string[];
  };
};
export type TDeleteTracksResponse = InferOutput<typeof deleteTracksSchema>;

export type TUploadAudioFileOptions = {
  trackId: string;
  file: File;
};
export type TUploadAudioFileResponse = InferOutput<typeof trackSchema>;

export type TDeleteAudioFileOptions = {
  trackId: string;
};
export type TDeleteAudioFileResponse = InferOutput<typeof trackSchema>;
