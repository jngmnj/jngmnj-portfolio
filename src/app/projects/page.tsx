import ProjectsSkeleton from '@/components/projects/ProjectsSkeleton';
import { Suspense } from 'react';
import ProjectsContent from './ProjectsContent';

export default function ProjectsPage() {
  return (
    <div className="content container flex flex-col">
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          Projects
        </h1>
        <p className="text-lg text-gray-600 md:text-xl">
          프로젝트들과 개발과정을 소개합니다.
        </p>
      </div>

      {/* Projects Grid */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent />
      </Suspense>
    </div>
  );
}
