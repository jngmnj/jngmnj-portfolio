import type { FirebaseProject } from '@/types';
import type { ProjectSort } from './projectSort';

export interface ProjectFilters {
  q: string;
  category: string;
  tech: string[];
}
export type ProjectQueryPatch = Partial<ProjectFilters> & {
  sort?: ProjectSort;
  id?: string | null;
};
const normalize = (value: string) =>
  value.normalize('NFKC').trim().toLowerCase();
const uniqueValues = (values: string[]) =>
  [...new Set(values.map(normalize).filter(Boolean))].sort();

export function readProjectFilters(params: URLSearchParams): ProjectFilters {
  return {
    q: (params.get('q') ?? '').trim(),
    category: normalize(params.get('category') ?? ''),
    tech: uniqueValues(params.getAll('tech')),
  };
}

export function updateProjectQuery(source: string, patch: ProjectQueryPatch) {
  const params = new URLSearchParams(source);
  const set = (key: string, value: string) =>
    value ? params.set(key, value) : params.delete(key);
  if (patch.q !== undefined) set('q', patch.q.trim());
  if (patch.category !== undefined) set('category', normalize(patch.category));
  if (patch.tech !== undefined) {
    params.delete('tech');
    uniqueValues(patch.tech).forEach((tech) => params.append('tech', tech));
  }
  if (patch.sort !== undefined)
    set('sort', patch.sort === 'latest' ? '' : patch.sort);
  if (patch.id !== undefined) set('id', patch.id ?? '');
  return params.toString();
}

// Always read the live URL so rapid edits cannot overwrite another control's change.
export function writeProjectUrl(
  patch: ProjectQueryPatch,
  mode: 'push' | 'replace' = 'push'
) {
  const query = updateProjectQuery(window.location.search, patch);
  const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
  if (
    url ===
    `${window.location.pathname}${window.location.search}${window.location.hash}`
  )
    return;
  if (mode === 'replace') window.history.replaceState(null, '', url);
  else window.history.pushState(null, '', url);
}

export function filterProjects(
  projects: FirebaseProject[],
  filters: ProjectFilters
) {
  const query = normalize(filters.q);
  const category = normalize(filters.category);
  const technologies = uniqueValues(filters.tech);
  return projects.filter((project) => {
    const tech = (project.technologies ?? []).map(normalize);
    const fields = [
      project.title,
      project.titleEn,
      project.description,
      project.descriptionEn,
      ...tech,
    ];
    return (
      (!query ||
        fields.some((field) => normalize(field ?? '').includes(query))) &&
      (!category || normalize(project.category ?? '') === category) &&
      (!technologies.length ||
        technologies.some((value) => tech.includes(value)))
    );
  });
}

export interface FilterOption {
  value: string;
  label: string;
}
export function getProjectFilterOptions(
  projects: FirebaseProject[],
  locale: string
) {
  const options = (values: string[]): FilterOption[] => {
    const entries = new Map<string, string>();
    values.forEach((value) => {
      const key = normalize(value);
      if (key && !entries.has(key)) entries.set(key, value.trim());
    });
    return [...entries]
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) =>
        a.label.localeCompare(b.label, locale, {
          sensitivity: 'base',
          numeric: true,
        })
      );
  };
  return {
    categories: options(projects.map((project) => project.category ?? '')),
    technologies: options(
      projects.flatMap((project) => project.technologies ?? [])
    ),
  };
}
