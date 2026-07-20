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
              className="animate-pulse overflow-hidden rounded-lg border border-gray-200"
            >
              {/* Image skeleton */}
              <div className="aspect-video bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />

              {/* Content skeleton */}
              <div className="space-y-3 p-6">
                {/* Title skeleton */}
                <div className="h-6 rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />

                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />
                </div>

                {/* Tags skeleton */}
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 rounded bg-gray-200" />
                  <div className="h-6 w-20 rounded bg-gray-200" />
                  <div className="h-6 w-24 rounded bg-gray-200" />
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
