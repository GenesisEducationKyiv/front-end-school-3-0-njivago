import { getGenres } from "../utils/db";
import type { Genre } from "../generated/graphql";

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
