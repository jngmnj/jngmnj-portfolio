import ProjectList from '@/components/projects/ProjectList';
import getProjects from '../../lib/getProjects';
import { searchProjects } from '@/utils/projectSearch';

export default async function ProjectsContent({
  query,
  locale,
}: {
  query: string;
  locale: string;
}) {
  const projects = await getProjects();
  return (
    <ProjectList
      initialResult={searchProjects(
        projects,
        new URLSearchParams(query),
        locale
      )}
      initialQuery={query}
    />
  );
}
