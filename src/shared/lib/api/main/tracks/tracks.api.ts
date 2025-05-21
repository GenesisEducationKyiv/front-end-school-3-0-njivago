import { createQuery, prepareResponse } from "../../utils";
import { api } from "../api";
import {
  TGetTracksOptions,
  TGetTracksResponse,
  TCreateTrackOptions,
  TCreateTrackResponse,
  TGetTrackBySlugOptions,
  TGetTrackBySlugResponse,
  TUpdateTrackOptions,
  TUpdateTrackResponse,
  TDeleteTrackOptions,
  TDeleteTrackResponse,
  TDeleteTracksOptions,
  TDeleteTracksResponse,
  TUploadTrackAudioOptions,
  TUploadTrackAudioResponse,
  TDeleteTrackFileOptions,
  TDeleteTrackFileResponse,
} from "./tracks.types";
import {
  deleteTracksSchema,
  getTracksSchema,
  trackSchema,
} from "./tracks.schema";

// Helper function to get all active getTracks query parameters
const getCachedTrackQueries = (state: any) => {
  try {
    const currentQueries = Object.entries(state.mainApi.queries || {})
      .filter(([key]) => key.startsWith("getTracks"))
      .map(([_, value]: [string, any]) => value?.originalArgs)
      .filter(Boolean);

    return currentQueries.length > 0 ? currentQueries : [{}];
  } catch (error) {
    console.error("Error getting cached track queries:", error);
    return [{}];
  }
};

export const tracksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTracks: build.query<TGetTracksResponse, TGetTracksOptions>({
      query: createQuery("GET", "/tracks"),
      transformResponse: prepareResponse(
        getTracksSchema,
        "tracks",
        "getTracks"
      ),
    }),
    getTrackBySlug: build.query<
      TGetTrackBySlugResponse,
      TGetTrackBySlugOptions
    >({
      query: createQuery("GET", "/tracks/:slug/"),
      transformResponse: prepareResponse(
        trackSchema,
        "tracks",
        "getTrackBySlug"
      ),
    }),
    createTrack: build.mutation<TCreateTrackResponse, TCreateTrackOptions>({
      query: createQuery("POST", "/tracks"),
      transformResponse: prepareResponse(trackSchema, "tracks", "createTrack"),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        const { data: result } = await queryFulfilled;

        const cachedQueries = getCachedTrackQueries(getState());

        cachedQueries.forEach((queryArg) => {
          dispatch(
            tracksApi.util.updateQueryData("getTracks", queryArg, (draft) => {
              if (draft?.data) {
                draft.data = [result.data, ...draft.data];
              }
            })
          );
        });
      },
    }),
    updateTrack: build.mutation<TUpdateTrackResponse, TUpdateTrackOptions>({
      query: createQuery("PUT", "/tracks/:id"),
      transformResponse: prepareResponse(trackSchema, "tracks", "updateTrack"),
      async onQueryStarted({ params }, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: result } = await queryFulfilled;

          if (result.data) {
            const cachedQueries = getCachedTrackQueries(getState());

            cachedQueries.forEach((queryArg) => {
              dispatch(
                tracksApi.util.updateQueryData(
                  "getTracks",
                  queryArg,
                  (draft) => {
                    if (draft?.data) {
                      const index = draft.data.findIndex(
                        (track) => track.id === params.id
                      );
                      if (index !== -1) {
                        draft.data[index] = result.data;
                      }
                    }
                  }
                )
              );
            });
          }
        } catch (error) {
          console.error("Failed to update track:", error);
        }
      },
    }),
    deleteTrack: build.mutation<TDeleteTrackResponse, TDeleteTrackOptions>({
      query: createQuery("DELETE", "/tracks/:id"),
      async onQueryStarted({ params }, { dispatch, queryFulfilled, getState }) {
        const cachedQueries = getCachedTrackQueries(getState());

        const patchResults = cachedQueries.map((queryArg) => {
          return dispatch(
            tracksApi.util.updateQueryData("getTracks", queryArg, (draft) => {
              if (draft?.data) {
                draft.data = draft.data.filter(
                  (track) => track.id !== params.id
                );
              }
            })
          );
        });

        try {
          await queryFulfilled;
        } catch (error) {
          patchResults.forEach((patchResult) => patchResult.undo());
        }
      },
    }),
    deleteTracks: build.mutation<TDeleteTracksResponse, TDeleteTracksOptions>({
      query: createQuery("POST", "/tracks/delete"),
      transformResponse: prepareResponse(
        deleteTracksSchema,
        "tracks",
        "deleteTracks"
      ),
      async onQueryStarted({ body }, { dispatch, queryFulfilled, getState }) {
        const cachedQueries = getCachedTrackQueries(getState());

        const patchResults = cachedQueries.map((queryArg) => {
          return dispatch(
            tracksApi.util.updateQueryData("getTracks", queryArg, (draft) => {
              if (draft?.data) {
                draft.data = draft.data.filter(
                  (track) => !body.ids.includes(track.id)
                );
              }
            })
          );
        });

        try {
          await queryFulfilled;
        } catch (error) {
          patchResults.forEach((patchResult) => patchResult.undo());
        }
      },
    }),
    uploadTrackAudio: build.mutation<
      TUploadTrackAudioResponse,
      TUploadTrackAudioOptions
    >({
      query: ({ params, body }) => {
        const formData = new FormData();
        formData.append("file", body.file);

        return {
          url: `/tracks/${params.id}/upload`,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: prepareResponse(
        trackSchema,
        "tracks",
        "uploadTrackAudio"
      ),
      async onQueryStarted({ params }, { dispatch, queryFulfilled, getState }) {
        const { data: updatedTrack } = await queryFulfilled;

        const cachedQueries = getCachedTrackQueries(getState());

        cachedQueries.forEach((queryArg) => {
          dispatch(
            tracksApi.util.updateQueryData("getTracks", queryArg, (draft) => {
              if (draft?.data) {
                const index = draft.data.findIndex(
                  (track) => track.id === params.id
                );
                if (index !== -1) {
                  draft.data[index] = updatedTrack.data;
                }
              }
            })
          );
        });

        if (updatedTrack.data.slug) {
          dispatch(
            tracksApi.util.updateQueryData(
              "getTrackBySlug",
              { params: { slug: updatedTrack.data.slug } },
              (draft) => {
                if (draft) {
                  draft.data = updatedTrack.data;
                }
              }
            )
          );
        }
      },
    }),
    deleteTrackFile: build.mutation<
      TDeleteTrackFileResponse,
      TDeleteTrackFileOptions
    >({
      query: createQuery("DELETE", "/tracks/:id/file"),
      async onQueryStarted({ params }, { dispatch, queryFulfilled, getState }) {
        const { data: updatedTrack } = await queryFulfilled;

        const cachedQueries = getCachedTrackQueries(getState());

        cachedQueries.forEach((queryArg) => {
          dispatch(
            tracksApi.util.updateQueryData("getTracks", queryArg, (draft) => {
              console.log(draft);
              if (draft?.data) {
                const index = draft.data.findIndex(
                  (track) => track.id === params.id
                );
                if (index !== -1) {
                  draft.data[index] = updatedTrack as any;
                }
              }
            })
          );
        });
      },
    }),
  }),
});
