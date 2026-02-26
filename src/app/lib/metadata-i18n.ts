import { hasLocale, LOCALE_COOKIE_NAME, type Locale } from '@/constants/locales';
import en from '@/locales/en/common.json';
import ko from '@/locales/ko/common.json';

interface MetadataStrings {
  title: string;
  description: string;
  siteName: string;
}

const metadataMap: Record<Locale, MetadataStrings> = {
  ko: (ko as { metadata?: MetadataStrings }).metadata ?? {
    title: '지정민 | Frontend Engineer',
    description: '프론트엔드 엔지니어 지정민의 포트폴리오입니다.',
    siteName: '지정민 Portfolio',
  },
  en: (en as { metadata?: MetadataStrings }).metadata ?? {
    title: 'Jungmin Ji | Frontend Engineer',
    description: 'Portfolio of Jungmin Ji, frontend engineer.',
    siteName: 'Jungmin Ji Portfolio',
  },
};

export function getMetadataForLocale(locale: string): MetadataStrings {
  const l: Locale = hasLocale(locale) ? locale : 'ko';
  return metadataMap[l];
}

export { LOCALE_COOKIE_NAME };
