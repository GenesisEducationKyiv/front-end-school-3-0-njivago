import { object, array, string, number, nullable } from "valibot";

export const paginationMetaSchema = object({
  total: number(),
  page: number(),
  limit: number(),
  totalPages: number(),
});

export const trackSchema = object({
  id: string(),
  title: string(),
  artist: string(),
  album: nullable(string()),
  genres: array(string()),
  slug: string(),
  coverImage: nullable(string()),
  audioFile: nullable(string()),
  createdAt: string(),
  updatedAt: string(),
});

export const getTracksSchema = object({
  tracks: object({
    data: array(trackSchema),
    meta: paginationMetaSchema,
  }),
});

export const deleteTracksSchema = object({
  success: array(string()),
  failed: array(string()),
});
