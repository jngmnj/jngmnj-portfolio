'use client';

import { usePathname } from 'next/navigation';

export function useLocale(): string {
  const pathname = usePathname();
  const seg = pathname?.split('/')[1];
  return seg === 'en' || seg === 'ko' ? seg : 'ko';
}
