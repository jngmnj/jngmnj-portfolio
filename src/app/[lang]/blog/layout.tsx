import { createPageMetadata } from '@/app/lib/og-metadata';
import type { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return createPageMetadata({ lang, page: 'blog', path: '/blog' });
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
