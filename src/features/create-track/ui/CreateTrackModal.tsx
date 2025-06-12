import { useTranslation } from "react-i18next";
import { useModal } from "shared/ui/modal/lib/ModalContext";
import { Button } from "shared/ui/buttons/button/ui/Button";
import { TrackForm } from "widgets/track-form";
import { createTrackSchema } from "../lib/createTrack.schema";
import { useToast } from "shared/ui/toast";

import type { CreateTrackProps } from "../lib/createTrack.types";
import type { CreateTrackSchema } from "../lib/createTrack.schema";
import { getErrorMessage, handleApiRequest } from "shared/lib/utils";

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
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (data: CreateTrackSchema) => {
    await handleApiRequest(
      onSubmit(data),
      () => {
        showSuccess(t("createTrack.success"));
        closeModal();
      },
      (error) => {
        showError(getErrorMessage(error));
      }
    );
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
