import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import uk from "./locales/uk.json";

const savedLang = localStorage.getItem("lang");
const browserLang = navigator.language.split("-")[0];
const initialLang =
  savedLang || (["en", "ru", "uk"].includes(browserLang) ? browserLang : "en");

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uk: { translation: uk },
  },
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
