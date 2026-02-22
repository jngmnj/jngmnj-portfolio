'use client';

import { FirebaseProject } from '@/types';
import { useLocale } from '@/utils/useLocale';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RecentProjectsSection() {
  const lang = useLocale();
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
              (b.createdAt?.toMillis?.() || 0) -
              (a.createdAt?.toMillis?.() || 0)
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
          <h2 className="text-3xl font-bold">Recent Projects</h2>
          <Link
            href={`/${lang}/projects`}
            className="text-seagull-500 hover:text-seagull-700"
          >
            View All →
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
        <h2 className="text-3xl font-bold">Recent Projects</h2>
        <Link
          href={`/${lang}/projects`}
          className="text-seagull-500 hover:text-seagull-700 transition-colors"
        >
          View All →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/${lang}/projects?id=${project.id}`}
            className="group flex h-full flex-col"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-lg">
              {/* Image Section */}
              {project.image && (
                <div className="relative aspect-video overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    quality={85}
                  />
                  {/* Overlay linear on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/0 to-black/0 transition-all duration-300 group-hover:from-black/10" />
                </div>
              )}
              {/* Content Section */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="group-hover:text-seagull-500 mb-2 text-xl font-semibold text-gray-900 transition-colors">
                  {project.title}
                </h3>
                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors group-hover:bg-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.technologies && project.technologies.length > 3 && (
                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* ProjectDetailModal is now handled by ProjectDetailModal component */}
    </section>
  );
}
