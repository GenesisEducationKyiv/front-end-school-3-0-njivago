import { lazy } from "react";

export const TrackForm = lazy(() =>
  import("./ui/TrackForm").then((module) => ({ default: module.TrackForm }))
);

export type { TrackFormData } from "./ui/TrackForm";
