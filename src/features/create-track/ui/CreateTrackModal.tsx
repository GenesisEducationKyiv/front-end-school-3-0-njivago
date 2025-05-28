import { useTranslation } from "react-i18next";
import { useModal } from "shared/ui/modal/lib/ModalContext";
import { Button } from "shared/ui/buttons/button/ui/Button";
import type { CreateTrackProps } from "../lib/createTrack.types";
import {
  createTrackSchema,
  type CreateTrackSchema,
} from "../lib/createTrack.schema";
import { TrackForm } from "widgets/track-form";

export const CreateTrackButton = ({ onSubmit }: CreateTrackProps) => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <CreateTrackForm onSubmit={onSubmit} />,
      t("createTrack.modalTitle")
    );
  };

  return (
    <Button testId="create-track-button" onClick={handleOpenModal}>
      {t("createTrack.button")}
    </Button>
  );
};

const CreateTrackForm = ({ onSubmit }: CreateTrackProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModal();

  const handleSubmit = async (data: CreateTrackSchema) => {
    await onSubmit(data);
    closeModal();
  };

  return (
    <TrackForm
      onSubmit={handleSubmit}
      onCancel={closeModal}
      schema={createTrackSchema(t)}
      submitLabel={t("createTrack.actions.create")}
      fieldLabels={{
        title: t("createTrack.title.label"),
        artist: t("createTrack.artist.label"),
        album: t("createTrack.album.label"),
        genres: t("createTrack.genres.label"),
        genresPlaceholder: t("createTrack.genres.placeholder"),
        coverUrl: t("createTrack.coverUrl.label"),
        preview: t("createTrack.preview"),
        cancel: t("createTrack.actions.cancel"),
      }}
      fieldPlaceholders={{
        title: t("createTrack.title.placeholder"),
        artist: t("createTrack.artist.placeholder"),
        album: t("createTrack.album.placeholder"),
        coverUrl: t("createTrack.coverUrl.placeholder"),
      }}
    />
  );
};
