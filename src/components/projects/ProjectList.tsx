'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import type { FirebaseProject } from '@/types';
import { getProjectSort, sortProjects } from '@/utils/projectSort';
import {
  filterProjects,
  getProjectFilterOptions,
  readProjectFilters,
  writeProjectUrl,
  type ProjectQueryPatch,
} from '@/utils/projectFilters';
import { useLocale } from '@/utils/useLocale';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import ProjectFilters from './ProjectFilters';
import type { ProjectSearchResult } from '@/utils/projectSearch';

interface Props {
  initialResult: ProjectSearchResult;
  initialQuery: string;
}

// Fixture stories exercise the same collection without depending on Firebase.
export function ProjectCollection({
  projects,
  query,
  locale,
  onQueryChange,
  result,
  pending = false,
  error = false,
  retry,
}: {
  projects: FirebaseProject[];
  query: string;
  locale: string;
  onQueryChange: (patch: ProjectQueryPatch, mode?: 'push' | 'replace') => void;
  result?: ProjectSearchResult;
  pending?: boolean;
  error?: boolean;
  retry?: () => void;
}) {
  const { t } = useTranslation('common');
  const params = useMemo(() => new URLSearchParams(query), [query]);
  const filters = useMemo(() => readProjectFilters(params), [params]);
  const sort = getProjectSort(params.get('sort'));
  const options = useMemo(
    () => result?.options ?? getProjectFilterOptions(projects, locale),
    [projects, locale, result]
  );
  const visibleProjects = useMemo(
    () =>
      result?.projects ??
      sortProjects(filterProjects(projects, filters), sort, locale),
    [projects, filters, sort, locale, result]
  );
  const total = result?.total ?? projects.length;
  const selectedProject = result
    ? result.selectedProject
    : projects.find((project) => project.id === params.get('id'));

  return (
    <>
      {total > 0 && (
        <ProjectFilters
          filters={filters}
          sort={sort}
          {...options}
          resultCount={visibleProjects.length}
          totalCount={total}
          onChange={onQueryChange}
        />
      )}
      {pending && (
        <p role="status" className="py-2 text-sm text-gray-600">
          {t('projects.filters.loading')}
        </p>
      )}
      {error ? (
        <div role="alert" className="py-12 text-center">
          <p>{t('projects.filters.error')}</p>
          <button
            type="button"
            onClick={retry}
            className="mt-3 min-h-11 rounded-xl border px-4"
          >
            {t('projects.filters.retry')}
          </button>
        </div>
      ) : total === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <p className="font-medium text-gray-600">{t('projects.empty')}</p>
        </div>
      ) : visibleProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('projects.filters.noResults')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('projects.filters.noResultsHint')}
          </p>
        </div>
      ) : (
        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              openModal={(id) => onQueryChange({ id })}
            />
          ))}
        </div>
      )}
      {selectedProject && (
        <ProjectDetailModal
          key={selectedProject.id}
          project={selectedProject}
          closeModal={() => onQueryChange({ id: null }, 'replace')}
        />
      )}
    </>
  );
}

function requestQuery(query: string, locale: string) {
  const source = new URLSearchParams(query);
  const target = new URLSearchParams();
  for (const key of ['q', 'category', 'tech', 'sort']) {
    source.getAll(key).forEach((value) => target.append(key, value));
  }
  target.set('lang', locale);
  return target.toString();
}

export default function ProjectList({ initialResult, initialQuery }: Props) {
  const { t } = useTranslation('common');
  const params = useSearchParams();
  const locale = useLocale();
  const query = requestQuery(params.toString(), locale);
  const [settledQuery, setSettledQuery] = useState(query);
  useEffect(() => {
    const timer = setTimeout(() => setSettledQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);
  const response = useQuery({
    queryKey: ['project-search', settledQuery],
    queryFn: async ({ signal }): Promise<ProjectSearchResult> => {
      const response = await fetch(`/api/projects/search?${settledQuery}`, {
        signal,
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Failed to search projects');
      return response.json();
    },
    initialData:
      settledQuery === requestQuery(initialQuery, locale)
        ? initialResult
        : undefined,
    placeholderData: (previous) => previous,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const result = response.data ?? initialResult;
  const id = params.get('id');
  const knownProject =
    result.projects.find((project) => project.id === id) ??
    (initialResult.selectedProject?.id === id
      ? initialResult.selectedProject
      : null);
  const detail = useQuery({
    queryKey: ['project-detail', id],
    enabled: Boolean(id) && !knownProject,
    queryFn: async ({ signal }): Promise<FirebaseProject> => {
      const response = await fetch(
        `/api/projects/detail?id=${encodeURIComponent(id!)}`,
        { signal, cache: 'no-store' }
      );
      if (!response.ok) throw new Error('Failed to fetch project');
      return response.json();
    },
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const selectedProject = id ? (knownProject ?? detail.data ?? null) : null;
  return (
    <>
      {id && !selectedProject && (
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 p-4">
          <p role={detail.isError ? 'alert' : 'status'}>
            {t(
              detail.isError
                ? 'projects.filters.detailError'
                : 'projects.filters.detailLoading'
            )}
          </p>
          {detail.isError && (
            <button
              className="min-h-11 cursor-pointer rounded-xl px-3"
              onClick={() => void detail.refetch()}
            >
              {t('projects.filters.retry')}
            </button>
          )}
          <button
            className="min-h-11 cursor-pointer rounded-xl px-3"
            onClick={() => writeProjectUrl({ id: null }, 'replace')}
          >
            {t('projects_modal.close')}
          </button>
        </div>
      )}
      <ProjectCollection
        projects={[]}
        result={{
          ...result,
          selectedProject,
        }}
        pending={query !== settledQuery || response.isFetching}
        error={response.isError}
        retry={() => void response.refetch()}
        query={params.toString()}
        locale={locale}
        onQueryChange={writeProjectUrl}
      />
    </>
  );
}
