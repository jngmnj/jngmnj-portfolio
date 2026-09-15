import ErrorState from '@/components/common/ErrorState';
import { hasLocale } from '@/constants/locales';
import { notFound } from 'next/navigation';

export const metadata = { robots: { index: false, follow: false } };

// Proxy supplies HTTP 404; explicit params preserve the locale during a rewrite.
export default async function MissingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <ErrorState kind="notFound" locale={lang} />;
}
