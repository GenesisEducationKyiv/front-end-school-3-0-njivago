import { Button } from "shared/ui/buttons/button/ui/Button";
import { useTranslation } from "react-i18next";
import { useActionConfirmation } from "widgets/action-confirmation";
import { useToast } from "shared/ui/toast";
import type { RemoveTrackProps } from "../lib/removeTrack.types";
import { getErrorMessage, handleApiRequest } from "shared/lib/utils";
import { useDeleteTrackMutation } from "shared/lib/api/tracks";

export const RemoveTrackButton = ({
  trackId,
  trackTitle,
  onRemoveSuccess,
}: RemoveTrackProps) => {
  const { t } = useTranslation();
  const { openConfirmation } = useActionConfirmation();
  const [deleteTrack] = useDeleteTrackMutation();
  const { showSuccess, showError } = useToast();

  const handleDelete = async () => {
    await handleApiRequest(
      await deleteTrack({
        id: trackId,
      }),
      () => {
        showSuccess(t("removeTrack.success"));

        if (onRemoveSuccess) {
          onRemoveSuccess();
        }
      },
      (error) => {
        showError(getErrorMessage(error));
      }
    );
  };

  const handleClick = () => {
    openConfirmation({
      description: t("removeTrack.confirmMessage", { title: trackTitle }),
      confirmAction: handleDelete,
      renderConfirmButton: (onClick) => (
        <Button
          variant="primary"
          className="flex-1 bg-red-500 hover:bg-red-600"
          onClick={onClick}
        >
          {t("actionConfirmation.deleteButton")}
        </Button>
      ),
    });
  };

  return (
    <Button
      testId={`delete-track-${trackId}`}
      variant="outline"
      size="sm"
      className="text-red-500 border-red-500 hover:bg-red-50"
      onClick={handleClick}
    >
      {t("removeTrack.button")}
    </Button>
  );
};
