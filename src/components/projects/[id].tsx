import { Project as ProjectType } from '@/types';

type ProjectProps = ProjectType;
const Project = ({
  id,
  title,
  description,
  thumbnail,
  images,
  stack,
  links,
}: ProjectProps) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <div className="flex gap-4">
        {stack.map((stackItem, index) => (
          <div
            key={index}
            className="inline-block text-sm font-medium text-gray-600"
          >
            {stackItem}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <>
          <a href={links.github} target="_blank" className="text-blue-500">
            github
          </a>
          <a href={links.demo} target="_blank" className="text-blue-500">
            demo
          </a>
        </>
      </div>
    </div>
  );
};

export default Project;
