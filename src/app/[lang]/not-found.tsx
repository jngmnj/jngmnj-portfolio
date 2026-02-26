import Link from 'next/link';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { getDictionary } from './dictionaries';

export default async function NotFoundPage({
  params,
}: {
  params?: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang ?? DEFAULT_LOCALE;
  const dict = await getDictionary(lang);
  const { notFound } = dict;

  return (
    <div className="content container flex min-h-screen flex-1 flex-col items-center justify-center">
      <p className="text-sm font-semibold tracking-[0.3em] text-gray-400 uppercase">
        {notFound.code}
      </p>
      <h1 className="mt-4 text-3xl font-bold md:text-4xl">{notFound.title}</h1>
      <p className="mt-3 max-w-lg text-base text-gray-600">
        {notFound.description}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={`/${lang}`} className="btn-primary btn-medium">
          {notFound.actions.home}
        </Link>
        <Link href={`/${lang}/contact`} className="btn-linePrimary btn-medium">
          {notFound.actions.contact}
        </Link>
      </div>
    </div>
  );
}
