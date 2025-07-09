import { GenreService } from "../../../services";

const genresService = new GenreService();

export const genresQueryResolvers = {
  genres: () => genresService.getAll(),
};
