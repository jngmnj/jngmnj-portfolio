/**
 * Single source of truth for supported locales.
 * Used by middleware (Edge), client (useLocale), and server (dictionaries, metadata).
 */

export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ko';

/** Used as i18n fallback when translation is missing for current locale */
export const FALLBACK_LOCALE: Locale = 'en';

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export function hasLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}

export const LANG_OPTIONS: { value: Locale; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
];
