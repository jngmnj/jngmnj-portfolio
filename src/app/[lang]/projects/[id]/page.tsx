import { createPageMetadata } from '@/app/lib/og-metadata';
import { getProjectOgData } from '@/app/lib/project-og';
import { projectExists } from '@/app/lib/project-exists';
import { hasLocale } from '@/constants/locales';
import { notFound, redirect } from 'next/navigation';

type PostProps = {
  params: Promise<{ lang: string; id: string }>;
};

export async function generateMetadata({ params }: PostProps) {
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

export default async function ProjectDetailPage({ params }: PostProps) {
  const { lang, id } = await params;
  if (!hasLocale(lang) || !(await projectExists(id))) notFound();
  redirect(`/${lang}/projects?id=${encodeURIComponent(id)}`);
}
