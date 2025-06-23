import type { Route } from "@playwright/test";
import { mockedTracks } from "./mockApiFixture.constants";
import type { MockTrack } from "./mockApiFixture.types";

export const handleTracksRequest = (route: Route) => {
  const request = route.request();
  const url = new URL(request.url());
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const searchQuery = url.searchParams.get("search");

  let tracksToReturn = [...mockedTracks];

  if (searchQuery) {
    tracksToReturn = tracksToReturn.filter(
      (track) =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const totalItems = tracksToReturn.length;
  const totalPages = Math.ceil(totalItems / limit);
  const paginatedTracks = tracksToReturn.slice(
    (page - 1) * limit,
    page * limit
  );

  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      data: paginatedTracks,
      meta: {
        total: totalItems,
        page,
        limit,
        totalPages,
      },
    }),
  });
};

export function createMockTrack(overrides: Partial<MockTrack> = {}): MockTrack {
  return {
    id: Math.random().toString(36).slice(2),
    title: "Mock Track",
    artist: "Mock Artist",
    album: "Mock Album",
    coverImage: "https://via.placeholder.com/300x300?text=Mock+Track",
    genres: ["Rock"],
    audioFile: "",
    slug: "mock-track",
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}
