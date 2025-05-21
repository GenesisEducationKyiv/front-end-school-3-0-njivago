import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "shared/ui/modal/lib/ModalContext";
import { Button } from "shared/ui/buttons";
import { FileDropzone } from "shared/ui/fields";
import { Loader } from "shared/ui/loader";
import { tracksApi } from "shared/lib/api/main/tracks";
import { useTranslation } from "react-i18next";

type UploadAudioFormData = {
  file: File | null;
};

type UploadAudioModalProps = {
  trackId: string;
  hasAudio?: boolean;
  onSuccess?: () => void;
};

export const UploadAudioButton: React.FC<UploadAudioModalProps> = ({
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

const UploadAudioForm: React.FC<UploadAudioModalProps> = ({
  trackId,
  hasAudio,
  onSuccess,
}) => {
  const { closeModal, setLoading } = useModal();
  const { t } = useTranslation();
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UploadAudioFormData>({
    defaultValues: {
      file: null,
    },
  });

  const [uploadTrackAudio, { isLoading: isUploading }] =
    tracksApi.useUploadTrackAudioMutation();
  const [deleteTrackFile, { isLoading: isDeleting }] =
    tracksApi.useDeleteTrackFileMutation();

  const selectedFile = watch("file");

  const onFilesAccepted = (files: File[]) => {
    if (files[0]) {
      setValue("file", files[0]);
    }
  };

  const handleDeleteFile = async () => {
    try {
      await deleteTrackFile({ params: { id: trackId }, body: {} }).unwrap();

      setStatusMessage({
        text: t("trackAudio.success.removed"),
        type: "success",
      });

      onSuccess?.();
      closeModal();
    } catch (error) {
      setStatusMessage({
        text: t("trackAudio.error.remove"),
        type: "error",
      });
    }
  };

  const onSubmit = async (data: UploadAudioFormData) => {
    if (!data.file) return;

    try {
      await uploadTrackAudio({
        params: { id: trackId },
        body: { file: data.file },
      }).unwrap();

      setStatusMessage({
        text: t("trackAudio.success.uploaded"),
        type: "success",
      });

      onSuccess?.();
      closeModal();
    } catch (error) {
      setStatusMessage({
        text: t("trackAudio.error.upload"),
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (isUploading || isDeleting) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isUploading, isDeleting]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {statusMessage && (
        <div
          className={`p-3 rounded-md mb-4 ${
            statusMessage.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {(isUploading || isDeleting) && (
            <div className="flex items-center">
              <Loader size="sm" className="mr-2" />
              <span>{statusMessage.text}</span>
            </div>
          )}
          {!isUploading && !isDeleting && statusMessage.text}
        </div>
      )}

      {hasAudio && !statusMessage && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {t("trackAudio.fileInfo.hasAudio")}
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={handleDeleteFile}
            disabled={isDeleting || isUploading}
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

      {!statusMessage && (
        <>
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
              disabled={isUploading}
            >
              {t("trackAudio.buttons.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={!selectedFile || isUploading || isDeleting}
            >
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
        </>
      )}
    </form>
  );
};
