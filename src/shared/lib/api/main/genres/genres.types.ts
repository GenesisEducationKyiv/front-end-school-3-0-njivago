import type { PreparedResponse, QueryOptions } from "../../types";
import type { getGenresSchema } from "./genres.schema";

export type TGetGenresOptions = QueryOptions<void>;
export type TGetGenresResponse = PreparedResponse<typeof getGenresSchema>;
