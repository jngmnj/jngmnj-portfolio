'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiRotateCcw, FiSliders } from 'react-icons/fi';
import type {
  FilterOption,
  ProjectFilters as Filters,
  ProjectQueryPatch,
} from '@/utils/projectFilters';
import type { ProjectSort } from '@/utils/projectSort';

interface Props {
  filters: Filters;
  sort: ProjectSort;
  categories: FilterOption[];
  technologies: FilterOption[];
  resultCount: number;
  totalCount: number;
  onChange: (patch: ProjectQueryPatch, mode?: 'push' | 'replace') => void;
}

function SearchInput({
  query,
  onChange,
}: {
  query: string;
  onChange: (value: string) => void;
}) {
  const { t } = useTranslation('common');
  const [input, setInput] = useState({ query, draft: query, composing: false });
  // Retain spaces during typing, while restoring the field after URL navigation.
  if (input.query !== query)
    setInput({
      query,
      draft: input.draft.trim() === query ? input.draft : query,
      composing: false,
    });
  return (
    <input
      id="project-search"
      type="search"
      value={input.draft}
      placeholder={t('projects.filters.searchPlaceholder')}
      autoComplete="off"
      onChange={(event) => {
        const value = event.currentTarget.value;
        setInput((current) => ({ ...current, draft: value }));
        if (!input.composing && !(event.nativeEvent as InputEvent).isComposing)
          onChange(value);
      }}
      onCompositionStart={() =>
        setInput((current) => ({ ...current, composing: true }))
      }
      onCompositionEnd={(event) => {
        const value = event.currentTarget.value;
        if (!input.composing) return;
        setInput((current) => ({ ...current, draft: value, composing: false }));
        onChange(value);
      }}
      className="focus:border-seagull-600 focus:ring-seagull-100 min-h-11 w-full min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors outline-none focus:ring-2"
    />
  );
}

export default function ProjectFilters({
  filters,
  sort,
  categories,
  technologies,
  resultCount,
  totalCount,
  onChange,
}: Props) {
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = useState(false);
  const activeCount =
    Number(Boolean(filters.q)) +
    Number(Boolean(filters.category)) +
    filters.tech.length;
  const active = Boolean(filters.q || filters.category || filters.tech.length);
  const technologyOptions = [
    ...technologies,
    ...filters.tech
      .filter((value) => !technologies.some((option) => option.value === value))
      .map((value) => ({ value, label: value })),
  ];
  return (
    <section aria-label={t('projects.filters.label')} className="mb-6">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="project-filter-controls"
        onClick={() => setExpanded((value) => !value)}
        className="focus-visible:outline-seagull-600 inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 text-left text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <FiSliders aria-hidden="true" className="size-4 shrink-0" />
        <span>{t('projects.filters.toggle')}</span>
        {activeCount > 0 && (
          <span className="bg-seagull-100 text-seagull-800 rounded-full px-2 py-0.5 text-xs">
            {activeCount}
          </span>
        )}
        <FiChevronDown
          aria-hidden="true"
          className={`ml-2 size-4 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <div id="project-filter-controls" hidden={!expanded}>
        <div className="mt-3 space-y-5 rounded-2xl border border-gray-100 bg-gray-50/80 p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_12rem_10rem]">
            <div className="min-w-0 space-y-2 sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="project-search"
                className="block text-sm font-semibold text-gray-700"
              >
                {t('projects.filters.search')}
              </label>
              <SearchInput
                query={filters.q}
                onChange={(q) => onChange({ q }, 'replace')}
              />
            </div>
            <div className="min-w-0 space-y-2">
              <label
                htmlFor="project-category"
                className="block text-sm font-semibold text-gray-700"
              >
                {t('projects.filters.category')}
              </label>
              <select
                id="project-category"
                value={filters.category}
                onChange={(event) => onChange({ category: event.target.value })}
                className="focus:border-seagull-600 focus:ring-seagull-100 min-h-11 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2"
              >
                <option value="">{t('projects.filters.allCategories')}</option>
                {filters.category &&
                  !categories.some(
                    (option) => option.value === filters.category
                  ) && (
                    <option value={filters.category}>{filters.category}</option>
                  )}
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0 space-y-2">
              <label
                htmlFor="project-sort"
                className="block text-sm font-semibold text-gray-700"
              >
                {t('projects.sort.label')}
              </label>
              <select
                id="project-sort"
                value={sort}
                onChange={(event) =>
                  onChange({ sort: event.target.value as ProjectSort })
                }
                className="focus:border-seagull-600 focus:ring-seagull-100 min-h-11 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2"
              >
                <option value="latest">{t('projects.sort.latest')}</option>
                <option value="oldest">{t('projects.sort.oldest')}</option>
                <option value="name">{t('projects.sort.name')}</option>
              </select>
            </div>
          </div>
          {technologyOptions.length > 0 && (
            <fieldset className="min-w-0">
              <legend className="mb-2 text-sm font-semibold text-gray-700">
                {t('projects.filters.technologies')}
              </legend>
              <div className="flex flex-wrap gap-2">
                {technologyOptions.map((option) => (
                  <label
                    key={option.value}
                    className="relative max-w-full cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={filters.tech.includes(option.value)}
                      onChange={(event) =>
                        onChange({
                          tech: event.target.checked
                            ? [...filters.tech, option.value]
                            : filters.tech.filter(
                                (value) => value !== option.value
                              ),
                        })
                      }
                    />
                    <span className="peer-checked:border-seagull-200 peer-checked:bg-seagull-100 peer-checked:text-seagull-900 peer-focus-visible:outline-seagull-600 flex min-h-11 items-center gap-2 rounded-full border border-transparent bg-white px-3.5 py-2 text-sm text-gray-600 transition-colors peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 hover:border-gray-200">
                      <span aria-hidden="true" className="shrink-0">
                        {filters.tech.includes(option.value) ? '✓' : '+'}
                      </span>
                      <span className="min-w-0 break-words">
                        {option.label}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200/70 pt-3">
            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-sm text-gray-600"
            >
              {t('projects.filters.results', {
                count: resultCount,
                total: totalCount,
              })}
            </p>
            <button
              type="button"
              disabled={!active}
              onClick={() => onChange({ q: '', category: '', tech: [] })}
              className="text-seagull-800 hover:bg-seagull-50 focus-visible:outline-seagull-600 inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:text-gray-400 disabled:hover:bg-transparent"
            >
              <FiRotateCcw aria-hidden="true" className="size-4 shrink-0" />
              {t('projects.filters.reset')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
