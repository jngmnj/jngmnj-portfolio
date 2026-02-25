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
  gradient: string;
  iconColor: string;
  delay: number;
}

export default function SkillsSection() {
  const { t } = useTranslation('common');
  const items = (t('home.skills.items', {
    returnObjects: true,
  }) as { title: string; skills: string }[]) ?? [];

  const base: Omit<SkillCategory, 'title' | 'skills'>[] = [
    {
      icon: <RiCodeLine className="mx-auto size-8" />,
      gradient: 'from-blue-50',
      iconColor: 'group-hover:text-blue-500',
      delay: 0,
    },
    {
      icon: <RiDatabase2Line className="mx-auto size-8" />,
      gradient: 'from-green-50',
      iconColor: 'group-hover:text-green-500',
      delay: 0.1,
    },
    {
      icon: <RiPaletteLine className="mx-auto size-8" />,
      gradient: 'from-purple-50',
      iconColor: 'group-hover:text-purple-500',
      delay: 0.2,
    },
    {
      icon: <RiToolsLine className="mx-auto size-8" />,
      gradient: 'from-orange-50',
      iconColor: 'group-hover:text-orange-500',
      delay: 0.3,
    },
  ];

  const skills: SkillCategory[] = base.map((meta, index) => ({
    ...meta,
    title: items[index]?.title ?? '',
    skills: items[index]?.skills ?? '',
  }));

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-bold">{t('home.skills.title')}</h2>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: skill.delay }}
            whileHover={{
              y: -8,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            className="group relative overflow-hidden rounded-lg border border-gray-200 p-6 text-center transition-all duration-300"
          >
            <div
              className={`absolute inset-0 bg-linear-to-br ${skill.gradient} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative z-10">
              <div className={`mb-3 transition-colors ${skill.iconColor}`}>
                {skill.icon}
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">
                {skill.title}
              </h3>
              <p className="text-sm text-gray-600">{skill.skills}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
