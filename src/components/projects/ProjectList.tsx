'use client';

import { FirebaseProject } from '@/types';
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

const ProjectList = ({
  initialProjectId,
}: {
  initialProjectId: string | null;
}) => {
  const [projects, setProjects] = useState<FirebaseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<FirebaseProject | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    // initialProjectId가 있고 projects가 로드되면 모달 자동 열기
    if (initialProjectId && projects.length > 0) {
      openModal(initialProjectId);
    }
  }, [initialProjectId, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');

      if (!response.ok) {
        throw new Error('프로젝트를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(
        err instanceof Error
          ? err.message
          : '프로젝트를 불러오는데 실패했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = (id: string) => {
    const project = projects.find((p) => p.id === id);
    setSelectedProject(project || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // URL에서 query parameter 제거
    window.history.replaceState({}, '', '/projects');
  };

  // Loading State
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 animate-pulse rounded-2xl bg-gray-200" />
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-8 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchProjects}
          className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-red-700 transition-colors hover:bg-red-200"
        >
          다시 시도
        </button>
      </div>
    );
  }

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
