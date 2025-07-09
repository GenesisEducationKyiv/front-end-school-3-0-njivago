import type { InferOutput } from "valibot";
import type { activeTrackSchema } from "./activeTrack.schema";

export type TActiveTrackResponse = InferOutput<typeof activeTrackSchema>;
