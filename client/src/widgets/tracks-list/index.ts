import { lazy } from "react";

export const TracksList = lazy(() =>
  import("./ui/TracksList").then((module) => ({ default: module.TracksList }))
);

export type { TracksListProps } from "./lib/TracksList.types";
