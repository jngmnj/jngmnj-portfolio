'use client';

import ProjectCard from '@/components/projects/ProjectCard';
import { FirebaseProject } from '@/types';
import { sortProjects } from '@/utils/projectSort';
import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuArrowRight } from 'react-icons/lu';

function SectionHeader({ lang }: { lang: string }) {
  const { t } = useTranslation('common');

  return (
    <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-seagull-700 mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
          {t('home.recentProjects.eyebrow')}
        </p>
        <h2 className="text-3xl font-bold text-gray-950 sm:text-4xl">
          {t('home.recentProjects.title')}
        </h2>
        <p className="mt-4 text-base leading-7 break-keep text-gray-600 sm:text-lg">
          {t('home.recentProjects.subtitle')}
        </p>
      </div>
      <Link
        href={`/${lang}/projects`}
        className="text-seagull-700 focus-visible:ring-seagull-200 hover:text-seagull-900 inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold transition-colors hover:border-gray-300 focus-visible:ring-2 focus-visible:outline-none"
      >
        {t('home.recentProjects.viewAll')}
        <LuArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}

export default function RecentProjectsSection() {
  const lang = useLocale();
  const { t } = useTranslation('common');
  const [projects, setProjects] = useState<FirebaseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchProjects = useCallback(async () => {
    setHasError(false);
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');

      const data = (await response.json()) as FirebaseProject[];
      setProjects(sortProjects(data, 'latest', lang).slice(0, 3));
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    // Fetch remote data when the home section mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchProjects();
  }, [fetchProjects]);

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <SectionHeader lang={lang} />

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-3xl border border-gray-200 bg-white"
            >
              <div className="m-2 aspect-video rounded-2xl bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
              <div className="px-4 pt-2 pb-4 sm:px-5 sm:pb-5">
                <div className="mb-2 h-3 w-24 rounded bg-gray-100" />
                <div className="mb-2 h-6 w-4/5 rounded-lg bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
                <div className="mb-3 space-y-2">
                  <div className="h-3.5 w-full rounded bg-gray-100" />
                  <div className="h-3.5 w-3/4 rounded bg-gray-100" />
                </div>
                <div className="mb-4 flex gap-1.5">
                  <div className="h-6 w-16 rounded-lg bg-gray-50" />
                  <div className="h-6 w-20 rounded-lg bg-gray-50" />
                  <div className="h-6 w-14 rounded-lg bg-gray-50" />
                </div>
                <div className="flex justify-end pt-1">
                  <div className="h-10 w-20 rounded-2xl bg-gray-50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              href={`/${lang}/projects?id=${project.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <p className="text-sm font-medium break-keep text-gray-600">
            {hasError
              ? t('home.recentProjects.error')
              : t('home.recentProjects.empty')}
          </p>
        </div>
      )}
    </section>
  );
}
