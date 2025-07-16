import type { trackSchema } from "shared/lib/api/tracks/tracks.schema";
import type { InferOutput } from "valibot";

export type Track = InferOutput<typeof trackSchema>;
