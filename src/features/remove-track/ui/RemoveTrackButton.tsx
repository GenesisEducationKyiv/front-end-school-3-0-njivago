import { Button } from "shared/ui/buttons/button/ui/Button";
import { useTranslation } from "react-i18next";
import { tracksApi } from "shared/lib/api/main";
import { useActionConfirmation } from "widgets/action-confirmation";
import { useToast } from "shared/ui/toast";
import type { RemoveTrackProps } from "../lib/removeTrack.types";

export const RemoveTrackButton = ({
  trackId,
  trackTitle,
  onRemoveSuccess,
}: RemoveTrackProps) => {
  const { t } = useTranslation();
  const { openConfirmation } = useActionConfirmation();
  const [deleteTrack] = tracksApi.useDeleteTrackMutation();
  const { showSuccess, showError } = useToast();

  const handleDelete = async () => {
    try {
      await deleteTrack({
        params: { id: trackId },
        body: {},
      });
      showSuccess(t("removeTrack.success"));
      if (onRemoveSuccess) {
        onRemoveSuccess();
      }
    } catch (error) {
      showError(error as string); // ToDo: handle errors properly
    }
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
