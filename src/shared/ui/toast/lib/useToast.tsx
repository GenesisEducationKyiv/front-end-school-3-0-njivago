import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Icon } from "shared/ui/icons";
import { Toast } from "../ui/Toast";
import type { ToastType, TToastOptions, TToastProps } from "./Toast.types";
import { defaultOptions, TOAST_COLORS, TOAST_ICONS } from "./Toast.constants";

const createToast = (props: TToastProps, options?: TToastOptions) =>
  toast(<Toast {...props} />, {
    ...defaultOptions,
    ...options,
  });

export const useToast = () => {
  const { t } = useTranslation();

  const createToastWithType = (
    type: ToastType,
    description: string,
    title: string,
    props?: Omit<TToastProps, "description" | "status" | "title">,
    options?: TToastOptions
  ) =>
    createToast(
      {
        description,
        title,
        ...props,
      },
      {
        ...options,
        icon: (
          <Icon
            name={TOAST_ICONS[type]}
            className={`text-[${TOAST_COLORS[type]}]`}
          />
        ),
        style: {
          "--toastify-color-progress-light": TOAST_COLORS[type],
        },
      }
    );

  const showSuccess = (
    description: string,
    title: string = t("toast.success"),
    props?: Omit<TToastProps, "description" | "status" | "title">,
    options?: TToastOptions
  ) => createToastWithType("success", description, title, props, options);

  const showError = (
    description: string,
    title: string = t("toast.error"),
    props?: Omit<TToastProps, "description" | "status" | "title">,
    options?: TToastOptions
  ) => createToastWithType("error", description, title, props, options);

  return {
    showSuccess,
    showError,
  };
};
