import React from "react";
import { createContext } from "shared/lib/hooks/createContext";
import type { PropsWithChildren } from "react";
import type { ModalContextValue, ModalState } from "./Modal.type";

const initialState: ModalState = {
  isOpen: false,
  content: null,
  isLoading: false,
};

export const { ModalProvider, useModal, ModalContext } = createContext(
  "Modal",
  (_: PropsWithChildren) => {
    const [state, setState] = React.useState<ModalState>(initialState);

    const openModal = (content: React.ReactNode, title?: string) => {
      setState({ isOpen: true, content, title, isLoading: false });
    };

    const closeModal = () => {
      setState(initialState);
    };

    const setLoading = (isLoading: boolean) => {
      setState((prevState) => ({ ...prevState, isLoading }));
    };

    const value: ModalContextValue = {
      state,
      openModal,
      closeModal,
      setLoading,
    };

    return value;
  }
);
