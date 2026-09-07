'use client';

import { FirebaseProject } from '@/types';
import { getProjectDescription, getProjectTitle } from '@/utils/projectLocale';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  project: FirebaseProject;
  openModal?: (id: string) => void;
  href?: string;
}

const ProjectCard = ({ project, openModal, href }: ProjectCardProps) => {
  const router = useRouter();
  const { i18n, t } = useTranslation('common');
  const title = getProjectTitle(project, i18n.language);
  const description = getProjectDescription(project, i18n.language);
  const imageSrc = project.image || '/images/common/img_user.png';
  const visibleTechnologies = project.technologies.slice(0, 4);
  const hiddenTechnologyCount =
    project.technologies.length - visibleTechnologies.length;

  const handleOpen = () => {
    if (project.id && openModal) {
      openModal(project.id);
      return;
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${title} ${t('projects.details')}`}
      className="group focus-visible:border-seagull-500 focus-visible:ring-seagull-200 flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-colors outline-none hover:border-gray-300 focus-visible:ring-2"
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleOpen();
        }
      }}
      whileHover={{
        y: -2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Project Image */}
      <div className="relative m-2 aspect-video overflow-hidden rounded-2xl bg-gray-100">
        <motion.div
          className="relative size-full"
          transition={{ duration: 0.3 }}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.025]" />
      </div>

      {/* Project Content */}
      <div className="flex flex-1 flex-col px-4 pt-2 pb-4 sm:px-5 sm:pb-5">
        <div className="mb-2 flex items-center gap-3">
          <span className="max-w-44 truncate text-[11px] font-semibold tracking-[0.08em] text-gray-400 uppercase">
            {project.category}
          </span>
        </div>

        <h3 className="group-hover:text-seagull-700 mb-1.5 line-clamp-2 text-xl leading-snug font-semibold text-gray-950 transition-colors">
          {title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500">
          {description}
        </p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap content-start gap-1.5">
          {visibleTechnologies.map((tech) => (
            <span
              key={tech}
              className="max-w-full truncate rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500"
            >
              {tech}
            </span>
          ))}
          {hiddenTechnologyCount > 0 && (
            <span className="rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-400">
              +{hiddenTechnologyCount}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex justify-end pt-1">
          <div className="flex items-center gap-1.5 rounded-2xl bg-gray-50 px-2 py-1">
            {project.liveUrl && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${title} ${t('projects_modal.demo')}`}
                  className="hover:text-seagull-600 focus-visible:ring-seagull-200 inline-flex size-8 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:outline-none"
                >
                  <GoArrowUpRight className="text-base" />
                </Link>
              </motion.div>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${title} GitHub`}
                className="focus-visible:ring-seagull-200 inline-flex size-8 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-white hover:text-gray-900 focus-visible:ring-2 focus-visible:outline-none"
              >
                <FaGithub className="text-lg" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
