import en from '@/locales/en/common.json';
import ko from '@/locales/ko/common.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: { common: ko },
  en: { common: en },
} as const;

const getInitialLng = () =>
  typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'ko' : 'ko';

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLng(),
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
