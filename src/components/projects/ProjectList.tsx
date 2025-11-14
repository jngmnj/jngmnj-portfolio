'use client';

import { FirebaseProject } from '@/types';
import { useEffect, useState } from 'react';
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

  const openModal = (id: string) => {
    const project = projects.find((p) => p.id === id);
    setSelectedProject(project || null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // initialProjectId가 있고 projects가 로드되면 모달 자동 열기
    if (initialProjectId && projects.length > 0) {
      openModal(initialProjectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProjectId, projects]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // URL에서 query parameter 제거
    window.history.replaceState({}, '', '/projects');
  };

  // Empty State
  if (projects.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-12 text-center">
        <p className="text-lg text-gray-600">
          아직 등록된 프로젝트가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
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
