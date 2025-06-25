import React from "react";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import i18n from "../src/app/i18n";

beforeMount(async ({ App }) => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>
));
