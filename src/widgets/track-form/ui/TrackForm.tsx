import { useForm } from "react-hook-form";
import { Input } from "shared/ui/fields/input";
import { Button } from "shared/ui/buttons/button/ui/Button";
import { valibotResolver } from "@hookform/resolvers/valibot";
import type { BaseIssue, BaseSchema } from "valibot";
import { GenreInput } from "features/genre-input";

export type TrackFormData = {
  title: string;
  artist: string;
  album: string;
  genres: string[];
  coverUrl?: string;
};

export type TrackFormProps = {
  onSubmit: (data: TrackFormData) => void;
  onCancel: () => void;
  initialData?: TrackFormData;
  schema: BaseSchema<TrackFormData, TrackFormData, BaseIssue<unknown>>;
  submitLabel: string;
  fieldLabels: {
    title: string;
    artist: string;
    album: string;
    genres: string;
    genresPlaceholder: string;
    coverUrl: string;
    preview: string;
    cancel: string;
  };
  fieldPlaceholders?: {
    title?: string;
    artist?: string;
    album?: string;
    coverUrl?: string;
  };
};

const DEFAULT_COVER = "https://placehold.co/400x400?text=No+Cover";

export const TrackForm = ({
  onSubmit,
  onCancel,
  initialData = {
    title: "",
    artist: "",
    album: "",
    genres: [],
    coverUrl: "",
  },
  schema,
  submitLabel,
  fieldLabels,
  fieldPlaceholders = {},
}: TrackFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TrackFormData>({
    defaultValues: initialData,
    resolver: valibotResolver(schema),
  });

  const coverUrl = watch("coverUrl");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      data-testid="track-form"
    >
      <Input
        label={fieldLabels.title}
        id="title"
        required
        error={errors.title}
        placeholder={fieldPlaceholders.title}
        {...register("title")}
      />
      <Input
        label={fieldLabels.artist}
        id="artist"
        required
        error={errors.artist}
        placeholder={fieldPlaceholders.artist}
        {...register("artist")}
      />
      <Input
        label={fieldLabels.album}
        id="album"
        required
        error={errors.album}
        placeholder={fieldPlaceholders.album}
        {...register("album")}
      />
      <GenreInput
        name="genres"
        control={control}
        label={fieldLabels.genres}
        placeholder={fieldLabels.genresPlaceholder}
        required
      />
      <Input
        label={fieldLabels.coverUrl}
        id="coverUrl"
        error={errors.coverUrl}
        placeholder={fieldPlaceholders.coverUrl}
        {...register("coverUrl")}
      />
      <div className="mt-2">
        <p className="text-sm mb-2">{fieldLabels.preview}:</p>
        <img
          src={coverUrl || DEFAULT_COVER}
          alt={fieldLabels.preview}
          className="w-32 h-32 object-cover rounded-md"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_COVER;
          }}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          {fieldLabels.cancel}
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
};
