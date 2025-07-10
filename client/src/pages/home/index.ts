import { lazy } from "react";

export const HomePage = lazy(() =>
  import("./ui/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);
