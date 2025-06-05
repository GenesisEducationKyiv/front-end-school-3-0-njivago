import { useTranslation } from "react-i18next";
import { useModal } from "shared/ui/modal/lib/ModalContext";
import { Button } from "shared/ui/buttons/button/ui/Button";
import { TrackForm } from "widgets/track-form";
import { editTrackSchema } from "../lib/editTrack.schema";

import type { EditTrackProps } from "../lib/editTrack.types";
import type { EditTrackSchema } from "../lib/editTrack.schema";
import { useToast } from "shared/ui/toast";

export const EditTrackButton = ({
  onSubmit,
  initialData,
  trackId,
}: EditTrackProps) => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <EditTrackForm
        onSubmit={onSubmit}
        initialData={initialData}
        trackId={trackId}
      />,
      t("editTrack.modalTitle")
    );
  };

  return (
    <Button
      testId={`edit-track-${trackId}`}
      variant="outline"
      size="sm"
      onClick={handleOpenModal}
    >
      {t("editTrack.button")}
    </Button>
  );
};

const EditTrackForm = ({ onSubmit, initialData }: EditTrackProps) => {
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { showError, showSuccess } = useToast();

  const handleSubmit = async (data: EditTrackSchema) => {
    try {
      await onSubmit(data);
      showSuccess(t("editTrack.success"));
      closeModal();
    } catch (error) {
      showError(error as string); // ToDo: handle errors properly
    }
  };

  return (
    <TrackForm
      onSubmit={handleSubmit}
      onCancel={closeModal}
      initialData={initialData}
      schema={editTrackSchema(t)}
      submitLabel={t("editTrack.actions.save")}
      fieldLabels={{
        title: t("editTrack.title.label"),
        artist: t("editTrack.artist.label"),
        album: t("editTrack.album.label"),
        genres: t("editTrack.genres.label"),
        genresPlaceholder: t("editTrack.genres.placeholder"),
        coverUrl: t("editTrack.coverUrl.label"),
        preview: t("editTrack.preview"),
        cancel: t("editTrack.actions.cancel"),
      }}
      fieldPlaceholders={{
        title: t("editTrack.title.placeholder"),
        artist: t("editTrack.artist.placeholder"),
        album: t("editTrack.album.placeholder"),
        coverUrl: t("editTrack.coverUrl.placeholder"),
      }}
    />
  );
};
