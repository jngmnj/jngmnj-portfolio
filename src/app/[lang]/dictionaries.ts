import { DEFAULT_LOCALE, hasLocale, type Locale } from '@/constants/locales';
import en from '@/locales/en/common.json';
import ko from '@/locales/ko/common.json';
import 'server-only';

export type CommonDictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<CommonDictionary>> = {
  ko: () => Promise.resolve(ko),
  en: () => Promise.resolve(en),
};

export type { Locale };
export { hasLocale };

export const locales: Locale[] = ['ko', 'en'];

export async function getDictionary(locale: Locale | string) {
  const l: Locale = hasLocale(String(locale)) ? (locale as Locale) : DEFAULT_LOCALE;
  return dictionaries[l]();
}
