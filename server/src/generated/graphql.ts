export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Genre: { input: string; output: string; }
  Upload: { input: File; output: File; }
};

export type BatchDeleteResponse = {
  __typename?: 'BatchDeleteResponse';
  failed: Array<Scalars['ID']['output']>;
  success: Array<Scalars['ID']['output']>;
};

export type CreateTrackInput = {
  album?: InputMaybe<Scalars['String']['input']>;
  artist: Scalars['String']['input'];
  coverImage?: InputMaybe<Scalars['String']['input']>;
  genres: Array<Scalars['Genre']['input']>;
  title: Scalars['String']['input'];
};

export type DeleteTracksInput = {
  ids: Array<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTrack: Track;
  deleteAudioFile: Track;
  deleteTrack: Scalars['Boolean']['output'];
  deleteTracks: Scalars['Boolean']['output'];
  updateTrack: Track;
  uploadAudioFile: Track;
};


export type MutationCreateTrackArgs = {
  input: CreateTrackInput;
};


export type MutationDeleteAudioFileArgs = {
  trackId: Scalars['ID']['input'];
};


export type MutationDeleteTrackArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTracksArgs = {
  input: DeleteTracksInput;
};


export type MutationUpdateTrackArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTrackInput;
};


export type MutationUploadAudioFileArgs = {
  file: Scalars['Upload']['input'];
  trackId: Scalars['ID']['input'];
};

export type PaginatedTracks = {
  __typename?: 'PaginatedTracks';
  data: Array<Track>;
  meta: PaginationMeta;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  activeTrack: Scalars['String']['output'];
  genres: Array<Scalars['Genre']['output']>;
  track?: Maybe<Track>;
  trackById?: Maybe<Track>;
  tracks: PaginatedTracks;
};


export type QueryTrackArgs = {
  slug: Scalars['String']['input'];
};


export type QueryTrackByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTracksArgs = {
  input?: InputMaybe<TrackQueryInput>;
};

export type SortOrder =
  | 'asc'
  | 'desc';

export type Subscription = {
  __typename?: 'Subscription';
  activeTrackChanged: Scalars['String']['output'];
};

export type Track = {
  __typename?: 'Track';
  album?: Maybe<Scalars['String']['output']>;
  artist: Scalars['String']['output'];
  audioFile?: Maybe<Scalars['String']['output']>;
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  genres: Array<Scalars['Genre']['output']>;
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type TrackQueryInput = {
  artist?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['Genre']['input']>;
  limit?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<SortOrder>;
  page?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<TrackSortField>;
};

export type TrackSortField =
  | 'album'
  | 'artist'
  | 'createdAt'
  | 'title';

export type UpdateTrackInput = {
  album?: InputMaybe<Scalars['String']['input']>;
  artist?: InputMaybe<Scalars['String']['input']>;
  audioFile?: InputMaybe<Scalars['String']['input']>;
  coverImage?: InputMaybe<Scalars['String']['input']>;
  genres?: InputMaybe<Array<Scalars['Genre']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};
