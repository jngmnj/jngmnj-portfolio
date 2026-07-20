import { DEFAULT_LOCALE, FALLBACK_LOCALE } from '@/constants/locales';
import en from '@/locales/en/common.json';
import ko from '@/locales/ko/common.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: { common: ko },
  en: { common: en },
} as const;

// Locale is driven by URL ([lang]); ClientLayout syncs via changeLanguage(lang).
i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: FALLBACK_LOCALE,
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
