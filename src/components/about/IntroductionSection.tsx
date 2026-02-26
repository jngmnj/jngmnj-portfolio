'use client';

import { SOCIAL_LINKS, type SocialIconKey } from '@/app/lib/constants';
import { getImageUrl } from '@/utils/imageUpload';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdFileDownload } from 'react-icons/md';

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function IntroductionSection() {
  const { t } = useTranslation('common');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Firebase Storage에서 프로필 이미지 URL 가져오기
    getImageUrl('images/img_profile.jpg')
      .then((url) => {
        setProfileImageUrl(url);
      })
      .catch((error) => {
        console.error('Failed to load profile image:', error);
        // 실패 시 기본 이미지 사용
        setProfileImageUrl('/images/about/img_profile.png');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Map icons to social links
  const iconMap: Record<SocialIconKey, React.ComponentType<{ className?: string }>> = {
    github: IoLogoGithub,
    instagram: IoLogoInstagram,
    linkedin: FaLinkedinIn,
  };

  const socialLinks: SocialLink[] = Object.entries(SOCIAL_LINKS).map(([key, href]) => ({
    href,
    icon: iconMap[key as SocialIconKey],
  }));

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="relative container flex flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:flex-row lg:gap-16">
        {/* Left Content */}
        <div className="order-2 flex w-full flex-col justify-center md:order-1 lg:w-3/5">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-seagull-200 bg-seagull-50 mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2"
          >
            <div className="bg-seagull-500 h-2 w-2 rounded-full" />
            <span className="text-seagull-700 text-sm font-medium">
              {t('about.intro.tag')}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('about.intro.greetingLine1')}
              </motion.span>
              <motion.span
                className="block text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t('about.intro.greetingLine2')}
              </motion.span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 max-w-2xl space-y-4"
          >
            <p className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
              {t('about.intro.headline')}
            </p>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              {t('about.intro.desc1')}
            </p>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              {t('about.intro.desc2')}
            </p>
          </motion.div>

          {/* CTA Buttons and Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6"
          >
            {/* Resume Download Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="https://drive.google.com/file/d/1opn0TUVKUemECGX0Na7KUPyrDVm8hnB6/view?usp=drive_link"
                target="_blank"
                className="bg-seagull-500 hover:bg-seagull-600 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl sm:px-7 sm:py-3 sm:text-base"
              >
                <MdFileDownload className="size-4 sm:size-5" />
                {t('about.intro.resume')}
              </Link>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.div
                    key={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.15,
                        rotate: 10,
                        y: -4,
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        className="group"
                      >
                        <div className="flex items-center justify-center rounded-xl bg-gray-50 p-3 transition-all hover:bg-gray-100">
                          <IconComponent className="group-hover:text-seagull-500 size-6 text-gray-700 transition-colors" />
                        </div>
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Profile Image */}
        <motion.div
          className="order-1 relative w-full md:order-2 lg:w-2/5"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Profile Image Container */}
          <div className="relative mx-auto aspect-square max-w-[280px] sm:max-w-sm">
            {/* Profile Image */}
            <div className="relative h-full w-full overflow-hidden rounded-full">
              {isLoading ? (
                <div className="size-full animate-pulse rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
              ) : profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={t('about.intro.profileAlt')}
                  width={500}
                  height={500}
                  className="size-full object-cover"
                  priority
                />
              ) : null}
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            className="border-seagull-200 absolute right-0 bottom-0 flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 shadow-lg sm:-right-4 sm:-bottom-4 sm:px-4 sm:py-2"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="bg-seagull-500 h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-700 sm:text-sm">
              {t('about.intro.openToWork')}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
