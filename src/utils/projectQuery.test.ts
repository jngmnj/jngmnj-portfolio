import { QueryClient, QueryObserver } from '@tanstack/react-query';
import { expect, it } from 'vitest';
import { projectFixtures } from '@/test/fixtures/projects';
import { searchProjects } from './projectSearch';
import { projectSearchKey } from './projectQuery';

it('uses the fresh server snapshot on first render instead of a previously public cached project', () => {
  const client = new QueryClient();
  const query = 'lang=ko';
  const previous = searchProjects(projectFixtures, new URLSearchParams(), 'ko');
  const current = searchProjects(
    projectFixtures.map((project, index) => ({ ...project, isPublic: index !== 0 })),
    new URLSearchParams(),
    'ko'
  );
  client.setQueryData(projectSearchKey(query, previous), previous);
  const observer = new QueryObserver(client, {
    queryKey: projectSearchKey(query, current),
    initialData: current,
    queryFn: async () => current,
  });
  try {
    expect(observer.getCurrentResult().data?.projects.map(project => project.id))
      .toEqual(current.projects.map(project => project.id));
  } finally {
    observer.destroy();
    client.clear();
  }
});
