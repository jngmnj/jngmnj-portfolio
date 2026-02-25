import ProjectsSkeleton from '@/components/projects/ProjectsSkeleton';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getDictionary, hasLocale } from '../dictionaries';
import ProjectsContent from './ProjectsContent';

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { id } = await searchParams;

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
