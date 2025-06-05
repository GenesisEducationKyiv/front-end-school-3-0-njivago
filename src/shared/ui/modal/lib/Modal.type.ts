import type { ReactNode } from "react";

export type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  title?: string;
  isLoading?: boolean;
};

export type ModalContextValue = {
  state: ModalState;
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
  setLoading: (isLoading: boolean) => void;
};
