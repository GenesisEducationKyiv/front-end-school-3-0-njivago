import {
  saveAudioFile,
  deleteAudioFile,
  getTrackById,
  updateTrack,
} from "../utils/db";
import type { MultipartFile } from "@fastify/multipart";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/x-wav"];

export class FileService {
  async uploadAudio(id: string, file: MultipartFile) {
    const track = await getTrackById(id);
    if (!track) throw new Error("Track not found");

    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      throw new Error("Invalid file type. Only MP3 and WAV files are allowed.");
    }

    const buffer = await file.toBuffer();
    if (buffer.length > MAX_SIZE) {
      throw new Error("File is too large. Maximum size is 10MB.");
    }

    const fileName = await saveAudioFile(id, file.filename, buffer);
    return updateTrack(id, { audioFile: fileName });
  }

  async deleteAudio(id: string) {
    const track = await getTrackById(id);
    if (!track) throw new Error("Track not found");

    if (!track.audioFile) throw new Error("No audio file to delete");

    const success = await deleteAudioFile(id);
    if (!success) throw new Error("Failed to delete audio file");

    return getTrackById(id);
  }
}
