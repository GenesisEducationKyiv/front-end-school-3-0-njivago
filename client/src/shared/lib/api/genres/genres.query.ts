import { gql } from "@urql/core";
import type { TGetGenresResponse } from "./genres.types";

export const GET_GENRES = gql<TGetGenresResponse, void>`
  query GetGenres {
    genres
  }
`;
