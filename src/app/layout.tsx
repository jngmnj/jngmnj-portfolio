import type { Metadata } from 'next';
import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';
import './globals.css';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_NAME,
  DEFAULT_TITLE,
  HOME_OG_IMAGE_URL,
  ROBOTS_CONFIG,
  SITE_URL,
} from './lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${DEFAULT_TITLE} | Frontend Engineer`,
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  robots: ROBOTS_CONFIG,
  openGraph: {
    title: `${DEFAULT_TITLE} | Frontend Engineer`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: `${DEFAULT_TITLE} Portfolio`,
    images: [
      {
        url: HOME_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${DEFAULT_TITLE} Portfolio`,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${DEFAULT_TITLE} | Frontend Engineer`,
    description: DEFAULT_DESCRIPTION,
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

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/poposnail61/min-sans@main/web/css/minsansvf-dynamic-subset.css"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
