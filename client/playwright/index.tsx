import React from "react";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";
import { I18nextProvider } from "react-i18next";
import { UrqlProvider } from "../src/app/providers/urql";
import i18n from "../src/app/i18n";

beforeMount(async ({ App }) => (
  <I18nextProvider i18n={i18n}>
    <UrqlProvider>
      <App />
    </UrqlProvider>
  </I18nextProvider>
));
