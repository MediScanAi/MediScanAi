import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    saveMissing: false,
    missingKeyHandler: async (key) => {
      return key;
    },
    ns: [
      'aboutUs',
      'analysisHistory',
      'bloodAnalysis',
      'bloodTest',
      'chatWithAI',
      'contactUs',
      'footer',
      'geneticAnalysis',
      'geneticTest',
      'header',
      'health',
      'homePage',
      'mainTest',
      'profil',
      'rootForm',
      'urineAnalysis',
      'urineTest',
      'userInfo',
      'vitaminAnalysis',
      'vitaminTest',
      'login',
      'register',
      'forgotPassword',
    ],
    supportedLngs: ['en', 'ru', 'hy'],
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
