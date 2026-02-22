import en from '@/locales/en/common.json';
import ko from '@/locales/ko/common.json';
import 'server-only';

const dictionaries = {
  ko: () => Promise.resolve(ko as Record<string, unknown>),
  en: () => Promise.resolve(en as Record<string, unknown>),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ['ko', 'en'];

export const hasLocale = (locale: string): locale is Locale =>
  locale === 'ko' || locale === 'en';

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
