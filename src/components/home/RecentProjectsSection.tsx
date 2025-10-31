'use client';

import { FirebaseProject } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RecentProjectsSection() {
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
            href="/projects"
            className="text-seagull-600 hover:text-seagull-700"
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
              <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />

              {/* Content skeleton */}
              <div className="space-y-3 p-6">
                {/* Title skeleton */}
                <div className="h-6 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />

                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
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
          href="/projects"
          className="text-seagull-600 hover:text-seagull-700"
        >
          View All →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects?id=${project.id}`}
            className="group"
          >
            <div className="h-full overflow-hidden rounded-lg border border-gray-200 transition-all group-hover:shadow-md hover:border-gray-400">
              {/* Image Section */}
              {project.image && (
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              {/* Content Section */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-4 text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-gray-100 px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
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
