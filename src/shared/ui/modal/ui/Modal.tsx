import React from "react";
import { useModal } from "../lib/ModalContext";
import { Button } from "shared/ui/buttons/button/ui/Button";
import { Loader } from "shared/ui/loader";

export const Modal: React.FC = () => {
  const { state, closeModal } = useModal();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
        {state.title && (
          <h2 className="mb-4 text-xl font-semibold text-text">
            {state.title}
          </h2>
        )}
        <div className="max-h-[80vh] overflow-y-auto px-1">
          {state.isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader size="lg" />
              <span className="mt-4 text-gray-500">Loading...</span>
            </div>
          ) : (
            state.content
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-4"
          onClick={closeModal}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};
