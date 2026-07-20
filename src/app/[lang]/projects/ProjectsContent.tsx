import ProjectList from '@/components/projects/ProjectList';
import getProjects from '../../lib/getProjects';

interface Props {
  projectId: string | null;
}

export default async function ProjectsContent({ projectId }: Props) {
  const projects = await getProjects();
  return (
    <ProjectList initialProjects={projects} initialProjectId={projectId} />
  );
}
