import { createPageMetadata } from '@/app/lib/og-metadata';
import { getProjectOgData } from '@/app/lib/project-og';
import type { ReactNode } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const project = await getProjectOgData(id, lang);
  return createPageMetadata({
    lang,
    page: 'project',
    path: `/projects/${id}`,
    title: project?.title,
    description: project?.description,
    imageParams: { projectId: id },
  });
}

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
