'use client';

import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const TopBanner = () => {
  const lang = useLocale();
  const { t } = useTranslation('common');
  return (
    <Link
      href={`/${lang}/contact`}
      className="flex h-10 items-center justify-center bg-black text-white"
    >
      {t('topBanner.text')}
    </Link>
  );
};

export default TopBanner;
