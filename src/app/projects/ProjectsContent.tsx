'use client';

import { FirebaseProject } from '@/types';
import ProjectList from '@/components/projects/ProjectList';
import { useSearchParams } from 'next/navigation';

interface ProjectsContentProps {
  initialProjects: FirebaseProject[];
}

export default function ProjectsContent({
  initialProjects,
}: ProjectsContentProps) {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');

  return (
    <ProjectList initialProjects={initialProjects} initialProjectId={projectId} />
  );
}

