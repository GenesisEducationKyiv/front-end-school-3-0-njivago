import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "shared/lib/utils";
import { FormField } from "../../base";
import type { FileDropzoneProps } from "../lib/FileDropzone.types";

export const FileDropzone = ({
  label,
  error,
  required,
  id,
  onFilesAccepted,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB default
  multiple = false,
  className,
}: FileDropzoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAccepted(acceptedFiles);
      setIsDragActive(false);
    },
    [onFilesAccepted]
  );

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: accept
      ? Object.fromEntries(accept.map((type) => [type, []]))
      : undefined,
    maxSize,
    multiple,
  });

  return (
    <FormField label={label} error={error} required={required} htmlFor={id}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg",
          "transition-colors duration-200 ease-in-out",
          isDragActive
            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
            : "border-gray-300 dark:border-gray-700",
          isDragReject && "border-red-500 bg-red-50 dark:bg-red-900/20",
          error && "border-red-500",
          className
        )}
      >
        <input {...getInputProps()} id={id} />
        <div className="flex flex-col items-center justify-center text-center">
          <svg
            className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Drag and drop files here, or click to select files
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {accept?.join(", ")} • Max size: {maxSize / 1024 / 1024}MB
          </p>
        </div>
      </div>
    </FormField>
  );
};
