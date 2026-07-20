'use client';

import { FirebaseProject } from '@/types';
import { getTimestampMillis } from '@/utils/projectLocale';
import { useLocale } from '@/utils/useLocale';
import ProjectCard from '@/components/projects/ProjectCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function RecentProjectsSection() {
  const lang = useLocale();
  const { t } = useTranslation('common');
  const [projects, setProjects] = useState<FirebaseProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        // 가장 최근 3개 프로젝트만 가져오기 (createdAt 기준 역순)
        const recentProjects = data
          .sort(
            (a: FirebaseProject, b: FirebaseProject) =>
              getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt)
          )
          .slice(0, 3);
        setProjects(recentProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            {t('home.recentProjects.title')}
          </h2>
          <Link
            href={`/${lang}/projects`}
            className="text-seagull-500 hover:text-seagull-700"
          >
            {t('home.recentProjects.viewAll')}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-3xl border border-gray-200 bg-white"
            >
              {/* Image skeleton */}
              <div className="m-2 aspect-video rounded-2xl bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />

              {/* Content skeleton */}
              <div className="px-4 pt-2 pb-4 sm:px-5 sm:pb-5">
                {/* Category skeleton */}
                <div className="mb-2 h-3 w-24 rounded bg-gray-100" />

                {/* Title skeleton */}
                <div className="mb-2 h-6 w-4/5 rounded-lg bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />

                {/* Description skeleton */}
                <div className="mb-3 space-y-2">
                  <div className="h-3.5 w-full rounded bg-gray-100" />
                  <div className="h-3.5 w-3/4 rounded bg-gray-100" />
                </div>

                {/* Tags skeleton */}
                <div className="mb-4 flex gap-1.5">
                  <div className="h-6 w-16 rounded-lg bg-gray-50" />
                  <div className="h-6 w-20 rounded-lg bg-gray-50" />
                  <div className="h-6 w-14 rounded-lg bg-gray-50" />
                </div>

                {/* Action skeleton */}
                <div className="flex justify-end pt-1">
                  <div className="flex items-center gap-1.5 rounded-2xl bg-gray-50 px-2 py-1">
                    <div className="size-8 rounded-xl bg-white" />
                    <div className="size-8 rounded-xl bg-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">{t('home.recentProjects.title')}</h2>
        <Link
          href={`/${lang}/projects`}
          className="text-seagull-500 hover:text-seagull-700 transition-colors"
        >
          {t('home.recentProjects.viewAll')}
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            href={`/${lang}/projects?id=${project.id}`}
          />
        ))}
      </div>
      {/* ProjectDetailModal is now handled by ProjectDetailModal component */}
    </section>
  );
}
