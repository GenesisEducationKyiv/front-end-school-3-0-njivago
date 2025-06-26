import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../assets/translations/en.json";
import ukTranslation from "../assets/translations/uk.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  uk: {
    translation: ukTranslation,
  },
};

const getInitialLanguage = (): string => {
  const storedLanguage = localStorage.getItem("i18nextLng");

  if (storedLanguage) return storedLanguage;

  const browserLanguage = navigator.language;

  if (browserLanguage.startsWith("uk")) return "uk";

  return "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const originalChangeLanguage = i18n.changeLanguage;
i18n.changeLanguage = (lng: string, ...rest) => {
  localStorage.setItem("i18nextLng", lng);
  return originalChangeLanguage(lng, ...rest);
};

export default i18n;
