import ProjectItem from './ProjectItem';

const ProjectList = () => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-10">
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
    </div>
  );
};

export default ProjectList;
