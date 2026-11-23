import type { FirebaseProject } from '@/types';
import {
  filterProjects,
  getProjectFilterOptions,
  readProjectFilters,
} from './projectFilters';
import { getProjectSort, sortProjects } from './projectSort';

export function searchProjects(
  projects: FirebaseProject[],
  params: URLSearchParams,
  locale: string
) {
  projects = projects.filter((project) => project.isPublic !== false);
  return {
    projects: sortProjects(
      filterProjects(projects, readProjectFilters(params)),
      getProjectSort(params.get('sort')),
      locale
    ),
    total: projects.length,
    options: getProjectFilterOptions(projects, locale),
    selectedProject:
      projects.find((project) => project.id === params.get('id')) ?? null,
  };
}

export type ProjectSearchResult = ReturnType<typeof searchProjects>;
