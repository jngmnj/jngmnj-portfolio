'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ProjectTechStackProps {
  techStack?: {
    frontend?: string[];
    styling?: string[];
    deployment?: string[];
    tools?: string[];
    stateManagement?: string[];
    backend?: string[];
    realtime?: string[];
    ai?: string[];
    optimization?: string[];
  };
}

export default function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  const { t } = useTranslation('common');
  if (!techStack) return null;

  const categoryLabels: Record<string, string> = {
    frontend: t('projects_tech.categories.frontend'),
    styling: t('projects_tech.categories.styling'),
    deployment: t('projects_tech.categories.deployment'),
    backend: t('projects_tech.categories.backend'),
    tools: t('projects_tech.categories.tools'),
    stateManagement: t('projects_tech.categories.stateManagement'),
    realtime: t('projects_tech.categories.realtime'),
    ai: t('projects_tech.categories.ai'),
    optimization: t('projects_tech.categories.optimization'),
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-950">
        {t('projects_modal.tech_stack')}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(techStack).map(([category, techs]) => (
          <div key={category} className="rounded-3xl bg-gray-50 p-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-950 capitalize">
              {categoryLabels[category] || category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {techs?.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-lg bg-white px-2 py-1 text-xs font-medium text-gray-500"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
