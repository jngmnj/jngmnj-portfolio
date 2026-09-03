import { FirebaseProject } from '@/types';
import { getProjectTitle, getTimestampMillis } from './projectLocale';

export type ProjectSort = 'latest' | 'oldest' | 'name';

export function getProjectSort(value: string | null): ProjectSort {
  if (value === 'oldest' || value === 'name') return value;
  return 'latest';
}

export function sortProjects(
  projects: FirebaseProject[],
  sort: ProjectSort,
  locale: string
) {
  const collator = new Intl.Collator(locale, {
    numeric: true,
    sensitivity: 'base',
  });

  return projects
    .map((project, index) => ({ project, index }))
    .sort((itemA, itemB) => {
      if (sort === 'name') {
        return (
          collator.compare(
            getProjectTitle(itemA.project, locale),
            getProjectTitle(itemB.project, locale)
          ) || itemA.index - itemB.index
        );
      }

      const dateA = getTimestampMillis(itemA.project.createdAt);
      const dateB = getTimestampMillis(itemB.project.createdAt);

      if (!dateA && !dateB) return itemA.index - itemB.index;
      if (!dateA) return 1;
      if (!dateB) return -1;

      const dateComparison = sort === 'oldest' ? dateA - dateB : dateB - dateA;
      return dateComparison || itemA.index - itemB.index;
    })
    .map(({ project }) => project);
}
