import { EventEmitter } from "events";

export class ActiveTrackService extends EventEmitter {
  private activeTrack: string = "No track playing";
  private intervalId: NodeJS.Timeout | null = null;
  private tracks: string[] = [
    "Bohemian Rhapsody - Queen",
    "Hotel California - Eagles",
    "Stairway to Heaven - Led Zeppelin",
    "Imagine - John Lennon",
    "Hey Jude - The Beatles",
    "Smells Like Teen Spirit - Nirvana",
    "Wonderwall - Oasis",
    "Creep - Radiohead",
  ];

  constructor() {
    super();
    this.startRandomTrackUpdates();
  }

  private startRandomTrackUpdates() {
    this.intervalId = setInterval(() => {
      const randomTrack =
        this.tracks[Math.floor(Math.random() * this.tracks.length)];
      this.activeTrack = randomTrack;
      this.emit("trackChanged", this.activeTrack);
    }, Math.random() * 1000 + 1000);
  }

  getActiveTrack(): string {
    return this.activeTrack;
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const activeTrackService = new ActiveTrackService();
