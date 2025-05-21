import { cn } from "shared/lib/utils";
import { AudioPlayer } from "shared/ui/audio-player";
import type { TrackCardProps } from "../lib/TrackCard.type";

export const TrackCard = ({
  title,
  artist,
  album,
  cover,
  tags,
  className,
  menuButton,
  audioSrc,
  id,
}: TrackCardProps) => (
  <div
    className={cn(
      "flex flex-col border rounded-xl p-4 hover:bg-muted",
      className
    )}
    data-testid={`track-item-${id}`}
  >
    <div className="flex items-center gap-4">
      <img
        src={cover}
        alt={title}
        className="h-16 w-16 rounded-xl object-cover"
      />

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3
            className="font-medium text-text"
            data-testid={`track-item-${id}-title`}
          >
            {title}
          </h3>
          {menuButton}
        </div>

        <p
          className="text-sm text-subtext"
          data-testid={`track-item-${id}-artist`}
        >
          {artist} - {album}
        </p>

        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-text"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>

    {audioSrc && (
      <div className="mt-4">
        <AudioPlayer
          src={`${import.meta.env.VITE_API_MEDIA_URL}${audioSrc}`}
          title={`${title} - ${artist}`}
        />
      </div>
    )}
  </div>
);
