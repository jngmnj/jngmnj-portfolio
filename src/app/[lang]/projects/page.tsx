import ProjectsSkeleton from '@/components/projects/ProjectsSkeleton';
import { Suspense } from 'react';
import ProjectsContent from './ProjectsContent';

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <div className="content container flex flex-col">
      <div className="mb-16">
        <h1 className="mb-4 text-4xl font-bold">Projects</h1>
        <p className="text-lg text-gray-600">
          프로젝트들과 개발과정을 소개합니다.
        </p>
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent projectId={id ?? null} />
      </Suspense>
    </div>
  );
}
