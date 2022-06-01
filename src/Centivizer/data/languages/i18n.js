import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import translationEN from './en/translation.json'
import translationFR from './fr/translation.json'
import translationZH from './zh/translation.json'
import figmaEN from './enFigma/translation.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: translationEN
            },
            enFigma: {
                translations: figmaEN
            },
            fr: {
                translations: translationFR
            },
            zh: {
                translations: translationZH
            }
        },
        fallbackLng: "enFigma",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",
        fallbackNS: "translations",

        // keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;