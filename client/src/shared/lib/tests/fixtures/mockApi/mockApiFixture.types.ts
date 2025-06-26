export type MockTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverImage: string;
  genres: string[];
  audioFile?: string;
  slug: string;
  createdAt?: string;
};

export type TracksApiMockFixture = {
  mockTracks: () => Promise<void>;
  mockGenres: () => Promise<void>;
};
