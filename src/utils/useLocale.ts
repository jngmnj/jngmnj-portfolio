'use client';

import { DEFAULT_LOCALE, hasLocale, type Locale } from '@/constants/locales';
import { usePathname } from 'next/navigation';

export function useLocale(): Locale {
  const pathname = usePathname();
  const seg = pathname?.split('/')[1] ?? '';
  return hasLocale(seg) ? seg : DEFAULT_LOCALE;
}
