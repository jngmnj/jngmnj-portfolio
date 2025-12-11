import ProjectsSkeleton from '@/components/projects/ProjectsSkeleton';
import { Suspense } from 'react';
import ProjectsContent from './ProjectsContent';

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  return (
    <div className="content container flex flex-col">
      <div className="mb-16">
        <h1 className="mb-4 text-4xl font-bold">Projects</h1>
        <p className="text-lg text-gray-600">
          프로젝트들과 개발과정을 소개합니다.
        </p>
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent projectId={searchParams.id ?? null} />
      </Suspense>
    </div>
  );
}
