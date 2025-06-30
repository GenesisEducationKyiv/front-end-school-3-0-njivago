import type { OperationResult } from "urql";
import type { EditTrackSchema } from "./editTrack.schema";

export type EditTrackProps = {
  onSubmit: (data: EditTrackSchema) => Promise<OperationResult>;
  initialData: EditTrackSchema;
  trackId: number;
};
