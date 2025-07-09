import { object, string } from "valibot";

export const activeTrackSchema = object({ activeTrackChanged: string() });
