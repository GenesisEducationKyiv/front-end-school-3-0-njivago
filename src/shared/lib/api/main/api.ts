import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils";

export const api = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: () => ({}),
});
