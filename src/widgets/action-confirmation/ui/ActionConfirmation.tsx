import { useState } from "react";
import { useModal } from "shared/ui/modal/lib/ModalContext";
import { Button } from "shared/ui/buttons/button/ui/Button";
import { Loader } from "shared/ui/loader";
import { useTranslation } from "react-i18next";
import type {
  ActionConfirmation,
  ActionConfirmationProps,
} from "../lib/ActionConfirmation.types";

export const ActionConfirmationModal = ({
  title,
  description,
  confirmAction,
  renderConfirmButton,
  cancelButtonText,
}: ActionConfirmationProps) => {
  const { closeModal, setLoading } = useModal();
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsProcessing(true);
      setLoading(true);
      await confirmAction();
      setIsProcessing(false);
      setLoading(false);
      closeModal();
    } catch (error) {
      setIsProcessing(false);
      setLoading(false);
      console.error("Error during action confirmation:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center p-4"
      data-testid="confirm-dialog"
    >
      <h2 className="mb-4 text-xl font-semibold">
        {title || t("actionConfirmation.title")}
      </h2>
      <p className="mb-8 text-center">{description}</p>
      <div className="flex w-full gap-4">
        <Button
          testId="cancel-delete"
          variant="outline"
          className="flex-1"
          onClick={closeModal}
          disabled={isProcessing}
        >
          {cancelButtonText || t("actionConfirmation.cancelButton")}
        </Button>
        {renderConfirmButton ? (
          renderConfirmButton(handleConfirm)
        ) : (
          <Button
            testId="confirm-delete"
            variant="primary"
            className="flex-1 bg-red-500 hover:bg-red-600"
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <Loader size="sm" color="white" className="mr-2" />
                {t("actionConfirmation.processing")}
              </span>
            ) : (
              t("actionConfirmation.deleteButton")
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export const useActionConfirmation = (): ActionConfirmation => {
  const { openModal } = useModal();

  const openConfirmation = ({
    title,
    description,
    confirmAction,
    renderConfirmButton,
    cancelButtonText,
  }: ActionConfirmationProps) => {
    openModal(
      <ActionConfirmationModal
        title={title}
        description={description}
        confirmAction={confirmAction}
        renderConfirmButton={renderConfirmButton}
        cancelButtonText={cancelButtonText}
      />
    );
  };

  return { openConfirmation };
};
