import type { Meta, StoryObj } from "@storybook/react";
import type { TrackCardProps } from "../lib/TrackCard.type";
import { TrackCard } from "./TrackCard";

const meta: Meta<typeof TrackCard> = {
  title: "Shared/TrackCard",
  component: TrackCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TrackCard>;

export const Default: Story = {
  args: {
    title: "Song Title",
    artist: "Artist Name",
    album: "Album Name",
    cover: "https://i1.sndcdn.com/artworks-000516916086-0kb173-t500x500.jpg",
    tags: ["pop", "2024"],
    id: "1",
    audioSrc: "",
  } satisfies TrackCardProps,
};
