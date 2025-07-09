import { lazy } from "react";

export * from "./ui/UploadAudioModal";

export const UploadAudioButton = lazy(() =>
  import("./ui/UploadAudioModal").then((module) => ({
    default: module.UploadAudioButton,
  }))
);
