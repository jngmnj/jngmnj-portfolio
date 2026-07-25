import { createPageMetadata } from '@/app/lib/og-metadata';
import AdminProjectsPageClient from './AdminProjectsPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return {
    ...createPageMetadata({
      lang,
      page: 'admin',
      path: '/admin/projects',
    }),
    robots: { index: false, follow: false },
  };
}

export default function AdminProjectsPage() {
  return <AdminProjectsPageClient />;
}
