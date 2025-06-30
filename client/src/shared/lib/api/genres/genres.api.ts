import { useValidatedQuery } from "../utils";
import { GET_GENRES } from "./genres.query";
import { getGenresSchema } from "./genres.schema";
import type { TGetGenresResponse } from "./genres.types";

export const useGenresQuery = (options?: never) => {
  return useValidatedQuery<TGetGenresResponse, void>(
    {
      query: GET_GENRES,
      variables: options,
    },
    getGenresSchema,
    "genres",
    "getGenres"
  );
};
