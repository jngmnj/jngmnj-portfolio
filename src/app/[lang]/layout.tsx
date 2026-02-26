import {
  DEFAULT_KEYWORDS,
  DEFAULT_NAME,
  HOME_OG_IMAGE_URL,
  ROBOTS_CONFIG,
  SITE_URL,
} from '@/app/lib/constants';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { getMetadataForLocale } from '@/app/lib/metadata-i18n';
import SetHtmlLang from '@/components/common/SetHtmlLang';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import ClientLayout from '../ClientLayout';
import { getDictionary, hasLocale } from './dictionaries';

type Props = { children: ReactNode; params?: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang ?? DEFAULT_LOCALE;
  if (!hasLocale(lang)) return {};
  const meta = getMetadataForLocale(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: DEFAULT_KEYWORDS,
    robots: ROBOTS_CONFIG,
    icons: {
      icon: [
        { url: '/favicon/icon.png', sizes: '32x32', type: 'image/png' },
        {
          url: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
      ],
      apple: [
        { url: '/favicon/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/favicon/safari-pinned-tab.svg',
          color: '#000000',
        },
      ],
    },
    manifest: '/manifest.json',
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: SITE_URL,
      siteName: meta.siteName,
      images: [
        {
          url: HOME_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: meta.siteName,
        },
      ],
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [HOME_OG_IMAGE_URL],
    },
    authors: [{ name: DEFAULT_NAME }],
    creator: DEFAULT_NAME,
    publisher: DEFAULT_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }];
}

export default async function LangLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang ?? DEFAULT_LOCALE;
  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);

  return (
    <>
      <SetHtmlLang lang={lang} />
      <ClientLayout lang={lang} dictionary={dictionary}>
        {children}
      </ClientLayout>
    </>
  );
}
