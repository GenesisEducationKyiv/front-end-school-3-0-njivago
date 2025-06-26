import type { ToastOptions } from "react-toastify";

export const TOAST_COLORS = {
  success: "rgb(134,239,172)",
  error: "rgb(248,113,113)",
} as const;

export const TOAST_ICONS = {
  success: "check",
  error: "cross",
} as const;

export const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 9000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};
