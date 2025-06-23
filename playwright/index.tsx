import React from "react";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { ModalProvider } from "../src/shared/ui/modal";
import i18n from "../src/app/i18n";
import type { HooksConfig } from "../src/shared/lib/tests/ct";

beforeMount<HooksConfig>(async ({ App, hooksConfig }) => {
  const AppWithStore = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  if (hooksConfig?.withTranslations && hooksConfig?.withModals) {
    return (
      <I18nextProvider i18n={i18n}>
        <ModalProvider>{AppWithStore}</ModalProvider>
      </I18nextProvider>
    );
  }
  if (hooksConfig?.withModals) {
    return <ModalProvider>{AppWithStore}</ModalProvider>;
  }

  if (hooksConfig?.withTranslations) {
    return <I18nextProvider i18n={i18n}>{AppWithStore}</I18nextProvider>;
  }

  return AppWithStore;
});
