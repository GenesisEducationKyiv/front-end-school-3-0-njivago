import {
  createTrack,
  deleteTrack,
  deleteMultipleTracks,
  getTrackById,
  getTrackBySlug,
  getTracks,
  updateTrack,
} from "../utils/db";
import { createSlug } from "../utils/slug";
import type {
  CreateTrackInput,
  UpdateTrackInput,
  TrackQueryInput,
  Track,
} from "../generated/graphql";

export class TrackService {
  async getAll(query: TrackQueryInput) {
    const { tracks, total } = await getTracks(query);
    const page = query.page || 1;
    const limit = query.limit || 10;

    return {
      data: tracks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    return getTrackById(id);
  }

  async getBySlug(slug: string) {
    return getTrackBySlug(slug);
  }

  async create(data: CreateTrackInput) {
    const slug = createSlug(data.title);

    const exists = await getTrackBySlug(slug);
    if (exists) throw new Error("Track with this title already exists");

    return createTrack({ ...data, slug });
  }

  async update(id: string, data: UpdateTrackInput) {
    const existing = await getTrackById(id);
    if (!existing) throw new Error("Track not found");

    if (data.title && data.title !== existing.title) {
      const newSlug = createSlug(data.title);
      const conflict = await getTrackBySlug(newSlug);
      if (conflict && conflict.id !== id) throw new Error("Slug conflict");
      data.slug = newSlug;
    }

    return updateTrack(id, data as Partial<Track>);
  }

  async remove(id: string) {
    const success = await deleteTrack(id);

    if (!success) throw new Error("Track not found");

    return success;
  }

  async removeMany(ids: string[]): Promise<boolean> {
    return !!deleteMultipleTracks(ids);
  }
}
