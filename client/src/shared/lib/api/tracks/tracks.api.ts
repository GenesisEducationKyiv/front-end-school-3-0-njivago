import { useValidatedQuery, useValidatedMutation } from "../utils";
import {
  CREATE_TRACK,
  DELETE_AUDIO_FILE,
  DELETE_TRACK,
  DELETE_TRACKS,
  GET_TRACK_BY_SLUG,
  GET_TRACKS,
  UPDATE_TRACK,
  UPLOAD_AUDIO_FILE,
} from "./tracks.query";
import {
  deleteTracksSchema,
  getTracksSchema,
  trackSchema,
} from "./tracks.schema";
import type {
  TCreateTrackOptions,
  TCreateTrackResponse,
  TDeleteAudioFileOptions,
  TDeleteAudioFileResponse,
  TDeleteTrackOptions,
  TDeleteTrackResponse,
  TDeleteTracksOptions,
  TDeleteTracksResponse,
  TGetTrackBySlugOptions,
  TGetTrackBySlugResponse,
  TGetTracksOptions,
  TGetTracksResponse,
  TUpdateTrackOptions,
  TUpdateTrackResponse,
  TUploadAudioFileOptions,
  TUploadAudioFileResponse,
} from "./tracks.types";

export const useTracksQuery = (options: TGetTracksOptions) => {
  return useValidatedQuery<TGetTracksResponse, TGetTracksOptions>(
    {
      query: GET_TRACKS,
      variables: options,
    },
    getTracksSchema,
    "tracks",
    "getTracks"
  );
};

export const useTrackBySlugQuery = (options: TGetTrackBySlugOptions) => {
  return useValidatedQuery<TGetTrackBySlugResponse, TGetTrackBySlugOptions>(
    {
      query: GET_TRACK_BY_SLUG,
      variables: options,
    },
    trackSchema,
    "tracks",
    "getTrackBySlug"
  );
};

export const useCreateTrackMutation = () => {
  return useValidatedMutation<TCreateTrackResponse, TCreateTrackOptions>(
    CREATE_TRACK,
    trackSchema,
    "tracks",
    "createTrack"
  );
};

export const useUpdateTrackMutation = () => {
  return useValidatedMutation<TUpdateTrackResponse, TUpdateTrackOptions>(
    UPDATE_TRACK,
    trackSchema,
    "tracks",
    "updateTrack"
  );
};

export const useDeleteTrackMutation = () => {
  return useValidatedMutation<TDeleteTrackResponse, TDeleteTrackOptions>(
    DELETE_TRACK,
    trackSchema,
    "tracks",
    "deleteTrack"
  );
};

export const useDeleteTracksMutation = () => {
  return useValidatedMutation<TDeleteTracksResponse, TDeleteTracksOptions>(
    DELETE_TRACKS,
    deleteTracksSchema,
    "tracks",
    "deleteTracks"
  );
};

export const useUploadAudioFileMutation = () => {
  return useValidatedMutation<
    TUploadAudioFileResponse,
    TUploadAudioFileOptions
  >(UPLOAD_AUDIO_FILE, trackSchema, "tracks", "uploadAudioFile");
};

export const useDeleteAudioFileMutation = () => {
  return useValidatedMutation<
    TDeleteAudioFileResponse,
    TDeleteAudioFileOptions
  >(DELETE_AUDIO_FILE, trackSchema, "tracks", "deleteAudioFile");
};
