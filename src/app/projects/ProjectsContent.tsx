'use client';

import ProjectList from '@/components/projects/ProjectList';
import { useSearchParams } from 'next/navigation';

export default function ProjectsContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');

  return <ProjectList initialProjectId={projectId} />;
}

