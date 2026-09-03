'use client';

import Button from '@/components/common/Button';
import { FirebaseProject } from '@/types';
import { ProjectSort, sortProjects } from '@/utils/projectSort';
import { useLocale } from '@/utils/useLocale';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LuRefreshCw } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

interface ProjectListProps {
  onEdit: (project: FirebaseProject) => void;
}

export default function ProjectList({ onEdit }: ProjectListProps) {
  const [projects, setProjects] = useState<FirebaseProject[]>([]);
  const [sort, setSort] = useState<ProjectSort>('latest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null
  );
  const [actionMessage, setActionMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const { t } = useTranslation('common');
  const lang = useLocale();
  const sortedProjects = useMemo(
    () => sortProjects(projects, sort, lang),
    [lang, projects, sort]
  );

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        setError('프로젝트 목록을 불러오지 못했습니다.');
      }
    } catch {
      setError('프로젝트 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch remote data when the admin list mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async (projectId: string, projectTitle: string) => {
    if (!confirm(`"${projectTitle}" 프로젝트를 삭제하시겠습니까?`)) {
      return;
    }

    setDeletingProjectId(projectId);
    setActionMessage(null);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects((currentProjects) =>
          currentProjects.filter((project) => project.id !== projectId)
        );
        setActionMessage({
          type: 'success',
          text: `“${projectTitle}” 프로젝트를 삭제했습니다.`,
        });
      } else {
        setActionMessage({
          type: 'error',
          text: '프로젝트 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.',
        });
      }
    } catch {
      setActionMessage({
        type: 'error',
        text: '프로젝트 삭제 중 오류가 발생했습니다.',
      });
    } finally {
      setDeletingProjectId(null);
    }
  };

  if (loading) {
    return (
      <div
        className="space-y-4"
        aria-busy="true"
        aria-label="프로젝트 목록 로딩 중"
      >
        <p className="sr-only">프로젝트 목록을 불러오는 중입니다.</p>
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 sm:p-5"
          >
            <div className="flex gap-4">
              <div className="size-20 shrink-0 rounded-xl bg-gray-200 sm:size-24" />
              <div className="flex-1 space-y-3 py-1">
                <div className="h-5 w-2/5 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-3/4 rounded bg-gray-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-10 text-center">
        <p className="font-semibold text-red-800">목록을 표시할 수 없습니다</p>
        <p className="mt-2 text-sm break-keep text-red-700">{error}</p>
        <Button
          type="button"
          onClick={fetchProjects}
          color="danger"
          className="mt-5 min-h-11"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gray-100 text-2xl text-gray-400">
          +
        </div>
        <p className="mt-4 font-semibold text-gray-900">
          등록된 프로젝트가 없습니다
        </p>
        <p className="mt-2 text-sm leading-6 break-keep text-gray-500">
          상단의 새 프로젝트 버튼을 눌러 첫 프로젝트를 등록해 보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {actionMessage && (
        <div
          role="status"
          className={`rounded-xl border px-4 py-3 text-sm font-medium break-keep ${
            actionMessage.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {actionMessage.text}
        </div>
      )}

      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          총{' '}
          <span className="font-semibold text-gray-900">{projects.length}</span>
          개
        </p>
        <div className="flex items-center gap-2">
          <select
            aria-label={t('projects.sort.label')}
            value={sort}
            onChange={(event) => setSort(event.target.value as ProjectSort)}
            className="focus:border-seagull-500 focus:ring-seagull-100 min-h-10 min-w-32 flex-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-colors focus:ring-2 focus:outline-none sm:flex-none"
          >
            <option value="latest">{t('projects.sort.latest')}</option>
            <option value="oldest">{t('projects.sort.oldest')}</option>
            <option value="name">{t('projects.sort.name')}</option>
          </select>
          <Button
            type="button"
            onClick={fetchProjects}
            color="linePrimary"
            size="small"
            className="flex min-h-10 items-center gap-2"
          >
            <LuRefreshCw aria-hidden="true" className="text-base" />
            목록 새로고침
          </Button>
        </div>
      </div>

      {sortedProjects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:p-5"
        >
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:aspect-square sm:size-24">
            <Image
              src={project.image || '/images/common/img_user.png'}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="line-clamp-2 text-lg font-bold break-words text-gray-950">
                {project.title}
              </h3>
              <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium break-all text-gray-600">
                {project.category}
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-sm leading-6 break-words text-gray-600">
              {project.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies
                ?.slice(0, 5)
                .map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="max-w-full rounded-lg bg-gray-100 px-2 py-1 text-xs break-all text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              {(project.technologies?.length || 0) > 5 && (
                <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-500">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
            <button
              onClick={() => onEdit(project)}
              disabled={deletingProjectId === project.id}
              className="bg-seagull-500 hover:bg-seagull-600 focus-visible:ring-seagull-200 min-h-11 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              수정
            </button>
            <button
              onClick={() =>
                project.id && handleDelete(project.id, project.title)
              }
              disabled={deletingProjectId === project.id}
              className="min-h-11 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deletingProjectId === project.id ? '삭제 중…' : '삭제'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
