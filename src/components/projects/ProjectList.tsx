'use client';

import { FirebaseProject } from '@/types';
import { getProjectSort, ProjectSort, sortProjects } from '@/utils/projectSort';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/utils/useLocale';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

interface ProjectListProps {
  initialProjects: FirebaseProject[];
  initialProjectId: string | null;
}

const ProjectList = ({
  initialProjects,
  initialProjectId,
}: ProjectListProps) => {
  const [projects] = useState<FirebaseProject[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<FirebaseProject | null>(null);

  const { t } = useTranslation('common');
  const lang = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = getProjectSort(searchParams.get('sort'));

  const sortedProjects = useMemo(
    () => sortProjects(projects, sort, lang),
    [lang, projects, sort]
  );

  const updateUrl = (params: URLSearchParams) => {
    const query = params.toString();
    window.history.replaceState(
      {},
      '',
      query ? `${pathname}?${query}` : pathname
    );
  };

  const handleSortChange = (nextSort: ProjectSort) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextSort === 'latest') {
      params.delete('sort');
    } else {
      params.set('sort', nextSort);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const openModal = (id: string) => {
    const project = projects.find((p) => p.id === id);
    setSelectedProject(project || null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // initialProjectId가 있고 projects가 로드되면 모달 자동 열기
    if (initialProjectId && projects.length > 0) {
      // Synchronize modal state with the server-provided URL query.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      openModal(initialProjectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProjectId, projects]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // URL에서 query parameter 제거
    const params = new URLSearchParams(searchParams.toString());
    params.delete('id');
    updateUrl(params);
  };

  // Empty State
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
        <p className="text-base font-medium text-gray-600">
          {t('projects.empty')}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <select
          id="project-sort"
          aria-label={t('projects.sort.label')}
          value={sort}
          onChange={(event) =>
            handleSortChange(event.target.value as ProjectSort)
          }
          className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 min-w-32 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors focus:ring-2 focus:outline-none"
        >
          <option value="latest">{t('projects.sort.latest')}</option>
          <option value="oldest">{t('projects.sort.oldest')}</option>
          <option value="name">{t('projects.sort.name')}</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sortedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            openModal={openModal}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProjectDetailModal project={selectedProject} closeModal={closeModal} />
      )}
    </>
  );
};

export default ProjectList;
