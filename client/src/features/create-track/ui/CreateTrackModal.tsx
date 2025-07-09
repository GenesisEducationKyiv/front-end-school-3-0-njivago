import { useTranslation } from "react-i18next";
import { useModal } from "shared/ui/modal";
import { Button } from "shared/ui/buttons";
import { TrackForm } from "widgets/track-form";
import { useToast } from "shared/ui/toast";
import { Suspense } from "react";
import { getErrorMessage, handleApiRequest } from "shared/lib/utils";
import { createTrackSchema } from "../lib/createTrack.schema";

import type { CreateTrackProps } from "../lib/createTrack.types";
import type { CreateTrackSchema } from "../lib/createTrack.schema";
import { Loader } from "shared/ui";

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

export const CreateTrackForm = ({ onSubmit }: CreateTrackProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (data: CreateTrackSchema) => {
    await handleApiRequest(
      await onSubmit(data),
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
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};
