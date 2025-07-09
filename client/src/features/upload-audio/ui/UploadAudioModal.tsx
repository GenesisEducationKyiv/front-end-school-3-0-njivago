import { useTranslation } from "react-i18next";
import { useModal } from "shared/ui/modal";
import { Button } from "shared/ui/buttons";
import { FileDropzone } from "shared/ui/fields";
import { Loader } from "shared/ui/loader";
import { useForm, useWatch } from "react-hook-form";
import { useToast } from "shared/ui/toast";
import { getErrorMessage, handleApiRequest } from "shared/lib/utils";
import {
  useDeleteAudioFileMutation,
  useUploadAudioFileMutation,
} from "shared/lib/api/tracks";
import type { FC } from "react";

type UploadAudioFormData = {
  file: File | null;
};

type UploadAudioModalProps = {
  trackId: string;
  hasAudio?: boolean;
  onSuccess?: () => void;
};

export const UploadAudioButton: FC<UploadAudioModalProps> = ({
  trackId,
  hasAudio,
  onSuccess,
}) => {
  const { openModal } = useModal();
  const { t } = useTranslation();

  const handleClick = () => {
    openModal(
      <UploadAudioForm
        trackId={trackId}
        hasAudio={hasAudio}
        onSuccess={onSuccess}
      />,
      hasAudio
        ? t("trackAudio.modalTitle.manage")
        : t("trackAudio.modalTitle.upload")
    );
  };

  return (
    <Button
      testId={`upload-track-${trackId}`}
      variant="outline"
      size="sm"
      onClick={handleClick}
      className="w-full"
    >
      {hasAudio ? t("trackAudio.buttons.manage") : t("trackAudio.buttons.add")}
    </Button>
  );
};

const UploadAudioForm: FC<UploadAudioModalProps> = ({
  trackId,
  hasAudio,
  onSuccess,
}) => {
  const { closeModal } = useModal();
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UploadAudioFormData>({
    defaultValues: {
      file: null,
    },
  });
  const selectedFile = useWatch({ control, name: "file" });

  const [uploadTrackAudio, { fetching: isUploading }] =
    useUploadAudioFileMutation();
  const [deleteTrackFile, { fetching: isDeleting }] =
    useDeleteAudioFileMutation();

  const isLoading = isUploading || isDeleting;

  const onFilesAccepted = (files: File[]) => {
    if (files[0]) {
      setValue("file", files[0]);
    }
  };

  const handleDeleteFile = async () => {
    if (isLoading) return;

    await handleApiRequest(
      await deleteTrackFile({ trackId }),
      () => {
        showSuccess(t("trackAudio.success.removed"));
        onSuccess?.();
        closeModal();
      },
      (error) => {
        showError(getErrorMessage(error));
      }
    );
  };

  const onSubmit = async (data: UploadAudioFormData) => {
    if (!data.file || isLoading) return;

    await handleApiRequest(
      await uploadTrackAudio({
        trackId,
        file: data.file,
      }),
      () => {
        showSuccess(t("trackAudio.success.uploaded"));
        onSuccess?.();
        closeModal();
      },
      (error) => {
        showError(getErrorMessage(error));
      }
    );
  };

  if (isLoading) {
    return <Loader size="lg" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {hasAudio && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {t("trackAudio.fileInfo.hasAudio")}
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={handleDeleteFile}
            disabled={isLoading}
            className="w-full text-red-500"
          >
            {isDeleting ? (
              <span className="flex items-center justify-center">
                <Loader size="sm" className="mr-2" />
                {t("trackAudio.success.removing")}
              </span>
            ) : (
              t("trackAudio.actions.removeCurrentAudio")
            )}
          </Button>
        </div>
      )}

      <div className="mt-4">
        {selectedFile ? (
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium truncate">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                  {t("trackAudio.fileInfo.size")} • {selectedFile.type}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setValue("file", null)}
                disabled={isLoading}
              >
                {t("trackAudio.actions.removeFile")}
              </Button>
            </div>
          </div>
        ) : (
          <FileDropzone
            label={t("trackAudio.fileInfo.audioFile")}
            accept={["audio/mpeg", "audio/wav", "audio/mp3", "audio/x-wav"]}
            maxSize={10 * 1024 * 1024} // 10MB
            onFilesAccepted={onFilesAccepted}
            error={errors.file}
          />
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={closeModal}
          disabled={isLoading}
        >
          {t("trackAudio.buttons.cancel")}
        </Button>
        <Button type="submit" disabled={!selectedFile || isLoading}>
          {isUploading ? (
            <span className="flex items-center justify-center">
              <Loader size="sm" className="mr-2" />
              {t("trackAudio.success.uploading")}
            </span>
          ) : (
            t("trackAudio.buttons.upload")
          )}
        </Button>
      </div>
    </form>
  );
};
