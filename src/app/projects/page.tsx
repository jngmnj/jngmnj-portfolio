'use client';

import ProjectList from '@/components/projects/ProjectList';
import { useSearchParams } from 'next/navigation';

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');

  return (
    <div className="container">
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
      <ProjectList initialProjectId={projectId} />
    </div>
  );
}
