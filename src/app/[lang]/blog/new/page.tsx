import { createPageMetadata } from '@/app/lib/og-metadata';
import NewPostPageClient from './NewPostPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return {
    ...createPageMetadata({ lang, page: 'blog', path: '/blog/new' }),
    robots: { index: false, follow: false },
  };
}

export default function NewPostPage() {
  return <NewPostPageClient />;
}
