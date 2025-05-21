import { PreparedResponse, QueryOptions } from "../../types";
import { getGenresSchema } from "./genres.schema";

export type TGetGenresOptions = QueryOptions<void>;
export type TGetGenresResponse = PreparedResponse<typeof getGenresSchema>;
