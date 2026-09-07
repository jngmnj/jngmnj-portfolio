import { createPageMetadata } from '@/app/lib/og-metadata';
import BlogPageClient from './BlogPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return createPageMetadata({ lang, page: 'blog', path: '/blog' });
}

export default function BlogPage() {
  return <BlogPageClient />;
}
