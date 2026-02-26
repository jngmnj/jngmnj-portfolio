'use client';

import Toast from '@/components/common/Toast';
import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoArrowUpRight } from 'react-icons/go';

export default function PortfolioLinksSection() {
  const { t } = useTranslation('common');
  const lang = useLocale();
  const portfolioLinks = (t('about.portfolio.items', {
    returnObjects: true,
  }) as {
    id: string;
    title: string;
    href?: string | null;
    description: string;
  }[]) ?? [];

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleClick = (
    link: (typeof portfolioLinks)[0],
    e: React.MouseEvent
  ) => {
    if (!link.href) {
      e.preventDefault();
      showToast(t('about.portfolio.toastPreparing'), 'info');
    }
  };
  return (
    <section className="mb-12 h-full sm:mb-16">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      <div className="-mx-2 flex flex-wrap">
        {portfolioLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href ? `/${lang}${link.href}` : '#'}
            className="group w-full px-2 py-3 md:w-1/2 flex flex-col md:flex-row"
            onClick={(e) => handleClick(link, e)}
          >
            <div className="hover:border-seagull-400 h-full rounded-xl border border-gray-200 px-4 py-6 transition-all sm:px-6 sm:py-8">
              <div className="group-hover:text-seagull-600 mb-3 text-2xl font-bold transition sm:text-3xl md:text-4xl">
                {link.id}
              </div>
              <div className="group-hover:text-seagull-600 mb-4 flex items-end gap-3 text-2xl font-bold transition sm:mb-6 sm:gap-4 sm:text-3xl md:text-4xl lg:text-5xl">
                {link.title}
                <div className="border-seagull-600 hidden rounded-full border p-2 opacity-0 transition group-hover:opacity-100 sm:p-3 lg:block lg:p-4">
                  <GoArrowUpRight className="text-seagull-600 text-xl sm:text-2xl lg:text-3xl" />
                </div>
              </div>
              <div className="text-sm leading-6 sm:text-base">{link.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
