'use client';

import '@/i18n';
import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation('common');
  const lang = useLocale();

  return (
    <div className="content container flex min-h-screen flex-1 flex-col items-center justify-center">
      <p className="text-sm font-semibold tracking-[0.3em] text-gray-400 uppercase">
        {t('notFound.code')}
      </p>
      <h1 className="mt-4 text-3xl font-bold md:text-4xl">
        {t('notFound.title')}
      </h1>
      <p className="mt-3 max-w-lg text-base text-gray-600">
        {t('notFound.description')}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={`/${lang}`} className="btn-primary btn-medium">
          {t('notFound.actions.home')}
        </Link>
        <Link href={`/${lang}/contact`} className="btn-linePrimary btn-medium">
          {t('notFound.actions.contact')}
        </Link>
      </div>
    </div>
  );
}
