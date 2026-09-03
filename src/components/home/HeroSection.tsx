'use client';

import { SOCIAL_LINKS, type SocialIconKey } from '@/app/lib/constants';
import { getImageUrl } from '@/utils/imageUpload';
import { useLocale } from '@/utils/useLocale';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { IconType } from 'react-icons';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdArrowForward, MdFileDownload } from 'react-icons/md';

const TYPING_SPEED = 50;
const DELETE_SPEED = 30;
const PAUSE_TIME = 1500;

const SOCIAL_ICONS: Record<SocialIconKey, IconType> = {
  github: IoLogoGithub,
  instagram: IoLogoInstagram,
  linkedin: FaLinkedinIn,
};

export default function HeroSection() {
  const { t } = useTranslation('common');
  const lang = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const capabilities = useMemo(
    () =>
      (t('home.hero.capabilities', {
        returnObjects: true,
      }) as string[]) ?? [],
    [t]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMeasured, setHasMeasured] = useState(false);
  const [mobileBgImageUrl, setMobileBgImageUrl] = useState<string | null>(null);
  const [isLoadingBg, setIsLoadingBg] = useState(true);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setHasMeasured(true);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || mobileBgImageUrl) return;

    getImageUrl('images/IMG_7606.JPG')
      .then((url) => setMobileBgImageUrl(url))
      .catch(() => setMobileBgImageUrl(null))
      .finally(() => setIsLoadingBg(false));
  }, [isMobile, mobileBgImageUrl]);

  useEffect(() => {
    if (prefersReducedMotion || capabilities.length === 0) return;

    const currentCapability = capabilities[currentIndex] ?? '';
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < currentCapability.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentCapability.slice(0, displayText.length + 1));
      }, TYPING_SPEED);
    } else if (!isDeleting) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_TIME);
    } else if (displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, DELETE_SPEED);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((previous) => (previous + 1) % capabilities.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [
    capabilities,
    currentIndex,
    displayText,
    isDeleting,
    prefersReducedMotion,
  ]);

  const socialLinks = Object.entries(SOCIAL_LINKS).map(([key, href]) => ({
    href,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    icon: SOCIAL_ICONS[key as SocialIconKey],
  }));
  const heroText = prefersReducedMotion
    ? (capabilities[0] ?? t('home.title'))
    : displayText;

  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-14">
      <div className="from-seagull-50 absolute inset-x-0 top-0 h-56 bg-linear-to-b to-transparent" />

      <div className="relative container">
        <div className="grid overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/80 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex min-w-0 flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16 xl:px-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-seagull-200 text-seagull-800 mb-4 w-fit rounded-full border bg-white px-3 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase"
            >
              {t('home.hero.eyebrow')}
            </motion.p>

            <div className="mb-5 flex min-h-24 max-w-3xl items-start sm:min-h-28 lg:min-h-32">
              <h1
                aria-label={t('home.title')}
                className="text-4xl leading-[1.08] font-extrabold break-words text-gray-950 sm:text-5xl sm:break-keep lg:text-6xl"
              >
                <span aria-hidden="true">
                  {heroText}
                  {!prefersReducedMotion && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="ml-1 inline-block"
                    >
                      |
                    </motion.span>
                  )}
                </span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="mb-7 max-w-xl text-base leading-7 break-words text-gray-600 sm:text-lg sm:leading-8 sm:break-keep"
            >
              {t('home.hero.subtitleLine1')}
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              {t('home.hero.subtitleLine2')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/${lang}/projects`}
                  className="bg-seagull-500 hover:bg-seagull-600 focus-visible:ring-seagull-200 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-6 sm:text-base"
                >
                  {t('home.hero.viewProjects')}
                  <MdArrowForward aria-hidden="true" className="size-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="https://drive.google.com/file/d/1opn0TUVKUemECGX0Na7KUPyrDVm8hnB6/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-visible:ring-seagull-200 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-6 sm:text-base"
                >
                  <MdFileDownload aria-hidden="true" className="size-5" />
                  {t('home.hero.resume')}
                </Link>
              </motion.div>

              <div className="flex items-center gap-2 sm:ml-1">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.div
                      key={social.href}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.34 + index * 0.08 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="group focus-visible:ring-seagull-200 block rounded-xl focus-visible:ring-2 focus-visible:outline-none"
                      >
                        <span className="flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-gray-200 bg-white p-3 transition-colors group-hover:border-gray-300 group-hover:bg-gray-50">
                          <Icon
                            aria-hidden="true"
                            className="size-5 text-gray-700"
                          />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="relative order-first min-h-52 overflow-hidden bg-gray-200 sm:min-h-72 lg:order-last lg:min-h-full">
            <div className="from-seagull-200 via-waikawa-gray-100 absolute inset-0 bg-linear-to-br to-white" />

            {isMobile && mobileBgImageUrl && (
              <Image
                src={mobileBgImageUrl}
                alt=""
                fill
                fetchPriority="high"
                className="object-cover object-[center_38%] transition-opacity duration-300"
                style={{ opacity: isLoadingBg ? 0 : 1 }}
              />
            )}

            {!isMobile && hasMeasured && (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 hidden size-full object-cover md:block"
              >
                <source src="/images/bg/video_bg_hero.mp4" type="video/mp4" />
              </video>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
