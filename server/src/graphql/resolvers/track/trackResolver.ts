import type { MultipartFile } from "@fastify/multipart";
import type {
  CreateTrackInput,
  UpdateTrackInput,
  DeleteTracksInput,
  TrackQueryInput,
} from "../../../generated/graphql";
import { FileService, TrackService } from "../../../services";

const trackService = new TrackService();
const fileService = new FileService();

export const trackQueryResolvers = {
  tracks: (_: unknown, args: { input?: TrackQueryInput }) =>
    trackService.getAll(args.input || {}),
  trackById: (_: unknown, { id }: { id: string }) => trackService.getById(id),
  track: (_: unknown, { slug }: { slug: string }) =>
    trackService.getBySlug(slug),
};

export const trackMutationResolvers = {
  createTrack: (_: unknown, { input }: { input: CreateTrackInput }) =>
    trackService.create(input),
  updateTrack: (
    _: unknown,
    { id, input }: { id: string; input: UpdateTrackInput }
  ) => trackService.update(id, input),
  deleteTrack: (_: unknown, { id }: { id: string }) => trackService.remove(id),
  deleteTracks: (_: unknown, { input }: { input: DeleteTracksInput }) =>
    trackService.removeMany(input.ids),
  uploadAudioFile: (
    _: unknown,
    { trackId, file }: { trackId: string; file: MultipartFile }
  ) => fileService.uploadAudio(trackId, file),
  deleteAudioFile: (_: unknown, { trackId }: { trackId: string }) =>
    fileService.deleteAudio(trackId),
};
