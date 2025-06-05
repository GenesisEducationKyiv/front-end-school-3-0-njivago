import type { ToastOptions } from "react-toastify";
import type { CSSProperties, FC, ReactNode } from "react";
import type { TOAST_COLORS } from "./Toast.constants";

export type ToastStatus = "success" | "error" | "info" | "warning";

export type ToastType = keyof typeof TOAST_COLORS;

export type TToastOptions = ToastOptions & {
  style?: CSSProperties & {
    "--toastify-color-progress-light"?: string;
  };
};

export type TToastProps = {
  description: string;
  title?: string;
  actions?: ReactNode;
};

export type TToastComponent = FC<TToastProps>;
