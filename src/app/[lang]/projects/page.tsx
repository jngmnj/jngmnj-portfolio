import ProjectsSkeleton from '@/components/projects/ProjectsSkeleton';
import { createPageMetadata } from '@/app/lib/og-metadata';
import { getProjectOgData } from '@/app/lib/project-og';
import { projectExists } from '@/app/lib/project-exists';
import { DEFAULT_LOCALE } from '@/constants/locales';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getDictionary, hasLocale } from '../dictionaries';
import ProjectsContent from './ProjectsContent';

type ProjectsPageProps = {
  params?: Promise<{ lang: string }>;
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: ProjectsPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang ?? DEFAULT_LOCALE;
  const { id } = await searchParams;

  if (!id) {
    return createPageMetadata({ lang, page: 'projects', path: '/projects' });
  }

  const project = await getProjectOgData(id, lang);
  return createPageMetadata({
    lang,
    page: 'project',
    path: `/projects?id=${encodeURIComponent(id)}`,
    title: project?.title,
    description: project?.description,
    imageParams: { projectId: id },
  });
}

export default async function ProjectsPage({
  params,
  searchParams,
}: ProjectsPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang ?? DEFAULT_LOCALE;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { id } = await searchParams;
  if (id && !(await projectExists(id))) notFound();

  return (
    <div className="content container flex flex-col">
      <div className="mb-16">
        <h1 className="mb-4 text-4xl font-bold">{dict.projects.title}</h1>
        <p className="text-lg text-gray-600">{dict.projects.subtitle}</p>
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent projectId={id ?? null} />
      </Suspense>
    </div>
  );
}
