import { object, array, string } from "valibot";

export const trackSchema = object({
  id: string(),
  title: string(),
  artist: string(),
  album: string(),
  genres: array(string()),
  slug: string(),
  coverImage: string(),
  audioFile: string(),
  createdAt: string(),
  updatedAt: string(),
});

export const getTracksSchema = array(trackSchema);

export const deleteTracksSchema = object({
  success: array(string()),
  failed: array(string()),
});
