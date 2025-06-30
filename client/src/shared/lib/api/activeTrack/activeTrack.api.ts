import { useValidatedSubscription } from "../utils";
import { ACTIVE_TRACK } from "./activeTrack.query";
import { activeTrackSchema } from "./activeTrack.schema";
import type { TActiveTrackResponse } from "./activeTrack.types";

export const useActiveTrackChanged = () => {
  return useValidatedSubscription<TActiveTrackResponse, void>(
    {
      query: ACTIVE_TRACK,
    },
    activeTrackSchema,
    "activeTrack",
    "activeTrack"
  );
};
