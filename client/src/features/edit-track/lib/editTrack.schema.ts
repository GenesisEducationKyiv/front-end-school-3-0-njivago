import type { TFunction } from "i18next";
import { object, string, array, optional, pipe, check } from "valibot";
import type { InferInput } from "valibot";

const isValidUrl = (value: string) => {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const editTrackSchema = (t: TFunction) =>
  object({
    title: pipe(
      string(),
      check((value) => value.trim().length > 0, t("validation.title.required"))
    ),
    artist: pipe(
      string(),
      check((value) => value.trim().length > 0, t("validation.artist.required"))
    ),
    album: pipe(
      string(),
      check((value) => value.trim().length > 0, t("validation.album.required"))
    ),
    genres: pipe(
      array(string()),
      check((value) => value.length > 0, t("validation.genres.required"))
    ),
    coverUrl: optional(
      pipe(string(), check(isValidUrl, t("validation.coverUrl.invalid")))
    ),
  });

export type EditTrackSchema = InferInput<ReturnType<typeof editTrackSchema>>;
