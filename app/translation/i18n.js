import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
 .use(LanguageDetector)
 .use(HttpBackend)
 .use(initReactI18next)
 .init({
  fallbackLng: "en",
  debug: true,
  supportedLngs: ["en", "es", "fr", "de", "it", "pt"],
  load: "languageOnly",
  detection: {
   order: ["navigator", "htmlTag", "localStorage", "cookie", "querystring"],
   caches: ["localStorage", "cookie"],
  },
  interpolation: { escapeValue: false },
  backend: { loadPath: "/locales/{{lng}}.json" },
 });

export default i18n;
