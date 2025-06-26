import type { TTracksApi } from "shared/lib/api/main/tracks";
import type { CreateTrackSchema } from "./createTrack.schema";

export type CreateTrackProps = {
  onSubmit: (
    data: CreateTrackSchema
  ) => Promise<TTracksApi.TCreateTrackResponse>;
};
