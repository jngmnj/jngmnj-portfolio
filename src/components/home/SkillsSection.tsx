'use client';

import { motion } from 'framer-motion';
import {
  RiCodeLine,
  RiDatabase2Line,
  RiPaletteLine,
  RiToolsLine,
} from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string;
  surface: string;
  iconColor: string;
  delay: number;
}

export default function SkillsSection() {
  const { t } = useTranslation('common');
  const items =
    (t('home.skills.items', {
      returnObjects: true,
    }) as { title: string; skills: string }[]) ?? [];

  const base: Omit<SkillCategory, 'title' | 'skills'>[] = [
    {
      icon: <RiCodeLine className="size-6" />,
      surface: 'bg-blue-50',
      iconColor: 'text-blue-600',
      delay: 0,
    },
    {
      icon: <RiDatabase2Line className="size-6" />,
      surface: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      delay: 0.1,
    },
    {
      icon: <RiPaletteLine className="size-6" />,
      surface: 'bg-violet-50',
      iconColor: 'text-violet-600',
      delay: 0.2,
    },
    {
      icon: <RiToolsLine className="size-6" />,
      surface: 'bg-orange-50',
      iconColor: 'text-orange-600',
      delay: 0.3,
    },
  ];

  const skills: SkillCategory[] = base.map((meta, index) => ({
    ...meta,
    title: items[index]?.title ?? '',
    skills: items[index]?.skills ?? '',
  }));

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="mb-10 max-w-2xl sm:mb-12">
        <p className="text-seagull-700 mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
          {t('home.skills.eyebrow')}
        </p>
        <h2 className="text-3xl font-bold text-gray-950 sm:text-4xl">
          {t('home.skills.title')}
        </h2>
        <p className="mt-4 text-base leading-7 break-keep text-gray-600 sm:text-lg">
          {t('home.skills.subtitle')}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {skills.map((skill) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: skill.delay }}
            whileHover={{ y: -2 }}
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-gray-300 sm:p-6"
          >
            <div
              className={`mb-5 flex size-12 items-center justify-center rounded-xl ${skill.surface} ${skill.iconColor}`}
            >
              {skill.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-950">
              {skill.title}
            </h3>
            <p className="mt-2 text-sm leading-6 break-words text-gray-600">
              {skill.skills}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
