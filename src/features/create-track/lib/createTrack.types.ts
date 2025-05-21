import { CreateTrackSchema } from "./createTrack.schema";

export type CreateTrackProps = {
  onSubmit: (data: CreateTrackSchema) => void;
};
