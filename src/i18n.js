import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import VI from 'locales/vi/translation.json';
import EN from 'locales/en/translation.json';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: EN,
            },
            vi: {
                translation: VI,
            },
        },
        fallbackLng: 'en',
        debug: true,
        detection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
            caches: ['cookie'],
        },
    });

export default i18n;
