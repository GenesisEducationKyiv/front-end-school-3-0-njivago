import { getGenres } from "../utils/db";
import type { Scalars } from "../generated/graphql";

type Genre = Scalars["Genre"]["output"];

export class GenreService {
  async getAll(): Promise<Genre[]> {
    try {
      const genres = await getGenres();

      return genres;
    } catch (_error) {
      throw new Error("Failed to fetch genres");
    }
  }
}
