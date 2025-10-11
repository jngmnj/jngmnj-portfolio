import { useState } from 'react';
import { projects } from '../../data/projects';
import Modal from '../common/Modal';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const openModal = (id: string) => {
    const project = projects.find((p) => p.id === id);
    setSelectedProject(project || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
        <Modal project={selectedProject} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default ProjectList;
