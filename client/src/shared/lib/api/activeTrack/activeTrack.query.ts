import { gql } from "@urql/core";
import type { TActiveTrackResponse } from "./activeTrack.types";

export const ACTIVE_TRACK = gql<TActiveTrackResponse, {}>`
  subscription ActiveTrackChanged {
    activeTrackChanged
  }
`;
