import { createQuery, prepareResponse } from "../../utils";
import { api } from "../api";
import type { TGetGenresOptions, TGetGenresResponse } from "./genres.types";
import { getGenresSchema } from "./genres.schema";

export const genresApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<TGetGenresResponse, TGetGenresOptions>({
      query: createQuery("GET", "/genres"),
      transformResponse: prepareResponse(
        getGenresSchema,
        "genres",
        "getGenres"
      ),
    }),
  }),
});
