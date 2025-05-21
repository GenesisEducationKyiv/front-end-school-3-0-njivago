import { useState } from "react";
import { cn } from "shared/lib/utils";
import { FormField } from "../../base";
import { FileDropzone } from "../../file-dropzone";
import type { ImageInputProps } from "../lib/ImageInput.types";

export const ImageInput = ({
  label,
  error,
  required,
  id,
  value,
  onChange,
  className,
}: ImageInputProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileAccepted = (files: File[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  return (
    <FormField label={label} error={error} required={required} htmlFor={id}>
      <div className={cn("flex flex-col gap-4", className)}>
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <FileDropzone
            onFilesAccepted={handleFileAccepted}
            accept={["image/*"]}
            maxSize={5 * 1024 * 1024} // 5MB
            multiple={false}
          />
        )}
      </div>
    </FormField>
  );
};
