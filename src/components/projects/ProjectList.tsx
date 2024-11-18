import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const openModal = (id: string) => {
    console.log('open modal', id);
  };
  return (
    // project list

    <div className="flex flex-col gap-20">
      <ProjectCard openModal={openModal} />
      <ProjectCard openModal={openModal} />
      <ProjectCard openModal={openModal} />
      <ProjectCard openModal={openModal} />
      <ProjectCard openModal={openModal} />
      <ProjectCard openModal={openModal} />
    </div>
  );
};

export default ProjectList;
