import type { TTracksApi } from "shared/lib/api/main";
import type { EditTrackSchema } from "./editTrack.schema";

export type EditTrackProps = {
  onSubmit: (data: EditTrackSchema) => Promise<TTracksApi.TUpdateTrackResponse>;
  initialData: EditTrackSchema;
  trackId: number;
};
