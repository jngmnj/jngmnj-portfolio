'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectContributionsProps {
  contributions?: {
    title: string;
    titleEn?: string;
    details: {
      text: string;
      textEn?: string;
      link?: string;
      linkText?: string;
      linkTextEn?: string;
    }[];
  }[];
}

export default function ProjectContributions({
  contributions,
}: ProjectContributionsProps) {
  const { i18n, t } = useTranslation('common');
  if (!contributions || contributions.length === 0) return null;

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-950">
        {t('projects_modal.contributions')}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {contributions.map((contribution, index) => {
          const title =
            i18n.language.startsWith('en') && contribution.titleEn
              ? contribution.titleEn
              : contribution.title;

          return (
            <motion.div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <h3 className="mb-3 text-base font-semibold text-gray-950">
                {title}
              </h3>
              <div className="space-y-3">
                {contribution.details.map((detail, detailIndex) => {
                  const text =
                    i18n.language.startsWith('en') && detail.textEn
                      ? detail.textEn
                      : detail.text;
                  const linkText =
                    i18n.language.startsWith('en') && detail.linkTextEn
                      ? detail.linkTextEn
                      : detail.linkText;

                  return (
                    <div key={detailIndex} className="flex items-start gap-3">
                      <div className="bg-seagull-500 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                      <div className="text-sm leading-6 text-gray-600">
                        <span>{text}</span>
                        {detail.link && (
                          <a
                            href={detail.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-seagull-700 hover:text-seagull-800 bg-seagull-50 hover:bg-seagull-100 ml-2 inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-semibold transition-colors"
                          >
                            <FaExternalLinkAlt className="h-2 w-2" />
                            {linkText || t('projects_modal.link')}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
