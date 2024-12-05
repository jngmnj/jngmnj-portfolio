import Modal from '../common/Modal';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const openModal = (id: string) => {
    console.log('open modal', id);
  };
  return (
    // project list
    <>
      <div className="flex flex-col gap-20">
        <ProjectCard openModal={openModal} />
        <ProjectCard openModal={openModal} />
        <ProjectCard openModal={openModal} />
        <ProjectCard openModal={openModal} />
        <ProjectCard openModal={openModal} />
        <ProjectCard openModal={openModal} />
      </div>
      <Modal id="1" />
    </>
  );
};

export default ProjectList;
