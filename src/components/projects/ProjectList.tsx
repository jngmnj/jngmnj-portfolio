import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    console.log('modal open', isModalOpen);
  }, [isModalOpen]);

  const openModal = (id: string) => {
    setIsModalOpen(true);
  };

  return (
    // project list

    <>
      <div className="flex flex-col gap-20">
        <ProjectCard openModal={() => openModal('1')} />
      </div>
      {isModalOpen && <Modal id="1" setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default ProjectList;
