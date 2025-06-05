import type { ReactNode } from "react";

export type ActionConfirmationProps = {
  title?: string;
  description: string;
  confirmAction: () => void;
  renderConfirmButton?: (onClick: () => void) => ReactNode;
  cancelButtonText?: string;
};

export type ActionConfirmation = {
  openConfirmation: (props: ActionConfirmationProps) => void;
};
