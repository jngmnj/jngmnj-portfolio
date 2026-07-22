import { createPageMetadata } from '@/app/lib/og-metadata';
import type { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  return createPageMetadata({ lang, page: 'project', path: `/projects/${id}` });
}

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
