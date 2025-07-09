import type { OperationResult } from "urql";
import type { CreateTrackSchema } from "./createTrack.schema";

export type CreateTrackProps = {
  onSubmit: (data: CreateTrackSchema) => Promise<OperationResult>;
};
