import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

let labels = [];
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        returnObjects: true,
        interpolation: {
            escapeValue: false
        },
        parseMissingKeyHandler: (key, defaultValue) => {
            /* if (labels.hasOwnProperty(key)) {
                return labels[key];
            } */
            labels = { ...labels, [key]: key };
            console.log(labels);
            return key
        }
    });

export default i18n;