import type { InferOutput } from "valibot";
import type { getGenresSchema } from "./genres.schema";

export type TGetGenresResponse = InferOutput<typeof getGenresSchema>;
