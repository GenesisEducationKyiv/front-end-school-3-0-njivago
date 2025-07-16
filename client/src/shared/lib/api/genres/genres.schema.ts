import { array, object, string } from "valibot";

export const getGenresSchema = object({
  genres: array(string()),
});
