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
      className="group focus-visible:border-seagull-500 focus-visible:ring-seagull-200 flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors outline-none focus-visible:ring-2"
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleOpen();
        }
      }}
      whileHover={{
        y: -4,
        boxShadow:
          '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <motion.div
          className="size-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

        {/* Category Badge */}
        <motion.div
          className="absolute top-3 left-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-flex max-w-52 items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
            {project.category}
          </span>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="group-hover:text-seagull-600 mb-2 line-clamp-2 min-h-14 text-xl leading-snug font-bold text-gray-900 transition-colors">
          {title}
        </h3>
        <p className="mb-5 line-clamp-3 min-h-16 text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        {/* Technologies */}
        <div className="mb-5 flex min-h-16 flex-wrap content-start gap-2">
          {visibleTechnologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex max-w-full items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors group-hover:bg-gray-200"
            >
              {tech}
            </span>
          ))}
          {hiddenTechnologyCount > 0 && (
            <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
              +{hiddenTechnologyCount}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <span className="text-seagull-600 group-hover:text-seagull-700 text-sm font-medium transition-colors">
            {t('projects.details')}
          </span>
          <div className="flex items-center gap-2">
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
                  className="focus-visible:ring-seagull-200 inline-flex min-h-9 items-center gap-1 rounded-full bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                  {t('projects_modal.demo')}
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
                className="focus-visible:ring-seagull-200 inline-flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 focus-visible:ring-2 focus-visible:outline-none"
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
