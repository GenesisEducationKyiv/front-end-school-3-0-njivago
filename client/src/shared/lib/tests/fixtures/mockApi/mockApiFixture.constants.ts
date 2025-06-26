import type { MockTrack } from "./mockApiFixture.types";

export const mockedGenres: string[] = [
  "Rock",
  "Pop",
  "Jazz",
  "Classical",
  "Electronic",
  "Hip-Hop",
  "R&B",
  "Country",
  "Metal",
  "Folk",
  "Soul",
  "Reggae",
  "Blues",
  "Punk",
  "Disco",
  "Funk",
];

export const mockedTracks: MockTrack[] = [
  {
    id: "0",
    title: "Test Track 1",
    artist: "Test Artist",
    album: "Test Album",
    coverImage: "https://via.placeholder.com/300x300?text=Test+Track+1",
    genres: ["Rock"],
    audioFile: "",
    slug: "test-track-1",
    createdAt: "2024-01-01T00:00:00Z",
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Track ${i + 1}`,
    artist: `Artist ${i + 1}`,
    album: `Album ${i + 1}`,
    coverImage: `https://via.placeholder.com/300x300?text=Track+${i + 1}`,
    genres: ["Rock"],
    audioFile: "",
    slug: `track-${i + 1}`,
    createdAt: new Date(2024, 0, i + 1).toISOString(),
  })),
];
