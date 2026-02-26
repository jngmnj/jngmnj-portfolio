'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectContributionsProps {
  contributions?: {
    title: string;
    details: {
      text: string;
      link?: string;
      linkText?: string;
    }[];
  }[];
}

export default function ProjectContributions({
  contributions,
}: ProjectContributionsProps) {
  const { t } = useTranslation('common');
  if (!contributions || contributions.length === 0) return null;

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        {t('projects_modal.contributions')}
      </h2>
      <div className="space-y-6">
        {contributions.map((contribution, index) => (
          <motion.div
            key={index}
            className="rounded-lg border border-gray-200 bg-gray-50 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              {contribution.title}
            </h3>
            <div className="space-y-2">
              {contribution.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="flex items-start gap-3">
                  <div className="bg-seagull-500 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                  <div className="text-sm text-gray-600">
                    <span>{detail.text}</span>
                    {detail.link && (
                      <a
                        href={detail.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-seagull-100 text-seagull-700 hover:bg-seagull-200 ml-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors"
                      >
                        <FaExternalLinkAlt className="h-2 w-2" />
                        {detail.linkText || t('projects_modal.link')}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
