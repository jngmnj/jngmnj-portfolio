import { motion } from 'framer-motion';
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
  const [_isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group cursor-pointer rounded-2xl border border-gray-200 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openModal(project.id)}
      whileHover={{
        y: -8,
        boxShadow:
          '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="h-48 w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

        {/* Category Badge */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-700">
            {project.category}
          </span>
        </motion.div>
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
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2">
          {project.liveUrl && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={project.liveUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
              >
                Demo <GoArrowUpRight className="inline text-lg" />
              </Link>
            </motion.div>
          )}
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={project.githubUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="flex rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <FaGithub className="inline-block text-lg" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
