'use client';

import { DEFAULT_LOCALE, hasLocale, type Locale } from '@/constants/locales';
import en from '@/locales/en/common.json';
import ko from '@/locales/ko/common.json';
import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

function getLocale(): Locale {
  const segment = window.location.pathname.split('/')[1];
  return hasLocale(segment) ? segment : DEFAULT_LOCALE;
}

// This replaces the root layout, so it cannot depend on its CSS or providers.
export default function GlobalError() {
  const lang = useSyncExternalStore(subscribe, getLocale, () => DEFAULT_LOCALE);

  const dict = lang === 'en' ? en : ko;
  const control = {
    display: 'inline-block',
    padding: '14px 24px',
    borderRadius: 16,
    border: '1px solid #d1d5db',
    font: 'inherit',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
  };

  return (
    <html lang={lang}>
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          color: '#111827',
          background: '#fff',
        }}
      >
        <main
          style={{
            minHeight: '100svh',
            display: 'grid',
            placeItems: 'center',
            padding: 24,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              maxWidth: 520,
              textAlign: 'center',
              lineHeight: 1.7,
              wordBreak: 'keep-all',
            }}
          >
            <p
              aria-hidden="true"
              style={{
                margin: 0,
                color: '#0076a7',
                fontSize: 'clamp(96px, 16vw, 128px)',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.05em',
              }}
            >
              !
            </p>
            <h1
              style={{
                margin: '32px 0 0',
                fontSize: 'clamp(24px, 5vw, 30px)',
                fontWeight: 600,
                lineHeight: 1.4,
                letterSpacing: '-0.025em',
              }}
            >
              {dict.errors.unexpected.title}
            </h1>
            <p
              style={{ margin: '16px auto 0', maxWidth: 448, color: '#6b7280' }}
            >
              {dict.errors.unexpected.description}
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 12,
                marginTop: 32,
              }}
            >
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{ ...control, background: '#111827', color: '#fff' }}
              >
                {dict.errors.actions.retry}
              </button>
              {/* Native navigation also recovers a broken router/layout. */}
              <a
                href={`/${lang}`}
                style={{ ...control, background: '#fff', color: '#374151' }}
              >
                {dict.notFound.actions.home}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
