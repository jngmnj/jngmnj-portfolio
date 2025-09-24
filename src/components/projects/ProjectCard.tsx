import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    category: string;
  };
  openModal: (id: string) => void;
}

const ProjectCard = ({ project, openModal }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer rounded-2xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openModal(project.id)}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={400}
          className={`h-48 w-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-700">
            {project.category}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="group-hover:text-seagull-600 mb-2 text-xl font-bold transition-colors">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-3 text-gray-600">{project.description}</p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal(project.id);
            }}
            className="text-seagull-600 hover:text-seagull-700 font-medium transition-colors"
          >
            View Details →
          </button>

          <div className="flex gap-2">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
              >
                <GoArrowUpRight className="text-lg" />
              </Link>
            )}
            <Link
              href={project.githubUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <FaGithub className="text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
