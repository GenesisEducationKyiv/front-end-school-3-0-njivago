import { gql } from "@urql/core";
import type {
  TCreateTrackOptions,
  TCreateTrackResponse,
  TDeleteAudioFileOptions,
  TDeleteAudioFileResponse,
  TDeleteTrackOptions,
  TDeleteTrackResponse,
  TDeleteTracksOptions,
  TDeleteTracksResponse,
  TGetTrackByIdOptions,
  TGetTrackByIdResponse,
  TGetTrackBySlugOptions,
  TGetTrackBySlugResponse,
  TGetTracksOptions,
  TGetTracksResponse,
  TUpdateTrackOptions,
  TUpdateTrackResponse,
  TUploadAudioFileOptions,
  TUploadAudioFileResponse,
} from "./tracks.types";

export const GET_TRACKS = gql<TGetTracksResponse, TGetTracksOptions>`
  query GetTracks($input: TrackQueryInput) {
    tracks(input: $input) {
      data {
        id
        title
        artist
        album
        genres
        slug
        coverImage
        audioFile
        createdAt
        updatedAt
      }
      meta {
        total
        page
        limit
        totalPages
      }
    }
  }
`;

export const GET_TRACK_BY_SLUG = gql<
  TGetTrackBySlugResponse,
  TGetTrackBySlugOptions
>`
  query GetTrackBySlug($slug: String!) {
    track(slug: $slug) {
      id
      title
      artist
      album
      genres
      slug
      coverImage
      audioFile
      createdAt
      updatedAt
    }
  }
`;

export const GET_TRACK_BY_ID = gql<TGetTrackByIdResponse, TGetTrackByIdOptions>`
  query GetTrackById($id: ID!) {
    trackById(id: $id) {
      id
      title
      artist
      album
      genres
      slug
      coverImage
      audioFile
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TRACK = gql<TCreateTrackResponse, TCreateTrackOptions>`
  mutation CreateTrack($input: CreateTrackInput!) {
    createTrack(input: $input) {
      id
      title
      artist
      album
      genres
      slug
      coverImage
      audioFile
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TRACK = gql<TUpdateTrackResponse, TUpdateTrackOptions>`
  mutation UpdateTrack($id: ID!, $input: UpdateTrackInput!) {
    updateTrack(id: $id, input: $input) {
      id
      title
      artist
      album
      genres
      slug
      coverImage
      audioFile
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TRACK = gql<TDeleteTrackResponse, TDeleteTrackOptions>`
  mutation DeleteTrack($id: ID!) {
    deleteTrack(id: $id)
  }
`;

export const DELETE_TRACKS = gql<TDeleteTracksResponse, TDeleteTracksOptions>`
  mutation DeleteTracks($input: DeleteTracksInput!) {
    deleteTracks(input: $input)
  }
`;

export const UPLOAD_AUDIO_FILE = gql<
  TUploadAudioFileResponse,
  TUploadAudioFileOptions
>`
  mutation UploadAudioFile($trackId: ID!, $file: Upload!) {
    uploadAudioFile(trackId: $trackId, file: $file) {
      id
      title
      artist
      album
      genres
      slug
      coverImage
      audioFile
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_AUDIO_FILE = gql<
  TDeleteAudioFileResponse,
  TDeleteAudioFileOptions
>`
  mutation DeleteAudioFile($trackId: ID!) {
    deleteAudioFile(trackId: $trackId)
  }
`;
