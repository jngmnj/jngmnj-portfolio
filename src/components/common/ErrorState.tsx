'use client';

import en from '@/locales/en/common.json';
import ko from '@/locales/ko/common.json';
import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';

type ErrorStateProps = {
  kind?: 'notFound' | 'postNotFound' | 'unexpected';
  reset?: () => void;
};

export default function ErrorState({
  kind = 'unexpected',
  reset,
}: ErrorStateProps) {
  const lang = useLocale();
  // Error boundaries must also work when the translation provider fails.
  const dict = lang === 'en' ? en : ko;
  const copy = kind === 'notFound' ? dict.notFound : dict.errors[kind];
  const focus =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-center text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-seagull-500';

  return (
    <main className="grid min-h-svh w-full flex-1 place-items-center px-6 py-16">
      <div className="mx-auto w-full max-w-xl text-center">
        <p
          aria-hidden={kind === 'unexpected' ? true : undefined}
          className="text-seagull-700 text-8xl leading-none font-semibold tracking-tighter sm:text-9xl"
        >
          {kind === 'unexpected' ? '!' : dict.notFound.code}
        </p>
        <h1 className="mt-8 text-2xl leading-snug font-semibold tracking-tight text-balance break-keep text-gray-900 sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-pretty break-keep text-gray-500 sm:text-base">
          {copy.description}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {reset && (
            <button
              type="button"
              onClick={reset}
              className={`${focus} bg-seagull-700 hover:bg-seagull-800 text-white`}
            >
              {dict.errors.actions.retry}
            </button>
          )}
          {kind === 'postNotFound' && (
            <Link
              href={`/${lang}/blog`}
              className={`${focus} bg-seagull-700 hover:bg-seagull-800 text-white`}
            >
              {dict.errors.actions.blog}
            </Link>
          )}
          <Link
            href={`/${lang}`}
            className={`${focus} ${kind === 'notFound' ? 'bg-gray-900 text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            {dict.notFound.actions.home}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
