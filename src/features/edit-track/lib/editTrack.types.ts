import type { EditTrackSchema } from "./editTrack.schema";

export type EditTrackProps = {
  onSubmit: (data: EditTrackSchema) => void;
  initialData: EditTrackSchema;
  trackId: number;
};
