import type { ReactNode } from "react";

export type TrackCardProps = {
  title: string;
  artist: string;
  album: string | null;
  cover: string;
  tags: string[];
  id: string;
  className?: string;
  menuButton?: ReactNode;
  audioSrc?: string | null;
};
