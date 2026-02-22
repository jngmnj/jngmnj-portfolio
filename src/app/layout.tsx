import type { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
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
      <body>{children}</body>
    </html>
  );
}
