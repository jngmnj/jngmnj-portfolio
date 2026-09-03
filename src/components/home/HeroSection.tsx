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
import {
  MdArrowForward,
  MdFileDownload,
  MdKeyboardArrowDown,
} from 'react-icons/md';

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
    <section className="relative flex min-h-[calc(100svh-91px)] items-center justify-center overflow-hidden bg-gray-100 lg:min-h-[calc(100svh-99px)]">
      <div className="from-seagull-100 via-waikawa-gray-50 absolute inset-0 bg-linear-to-br to-white" />

      {isMobile && (
        <>
          {mobileBgImageUrl && (
            <Image
              src={mobileBgImageUrl}
              alt=""
              fill
              fetchPriority="high"
              className="absolute inset-0 z-0 size-full object-cover transition-opacity duration-300"
              style={{ opacity: isLoadingBg ? 0 : 1 }}
            />
          )}
          <div className="absolute inset-0 z-1 bg-linear-to-b from-black/20 via-black/15 to-black/65" />
        </>
      )}

      {!isMobile && hasMeasured && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 z-0 hidden size-full object-cover md:block"
          >
            <source src="/images/bg/video_bg_hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-1 hidden bg-linear-to-b from-white/45 via-white/70 to-white/90 backdrop-blur-[2px] md:block" />
        </>
      )}

      <div
        className="relative z-2 container flex flex-col px-6 pb-24 md:items-center md:justify-center md:py-24 md:text-center"
        style={
          isMobile
            ? {
                justifyContent: 'flex-start',
                paddingTop: '42vh',
              }
            : undefined
        }
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="md:border-seagull-200 md:text-seagull-800 mb-5 w-fit rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm md:bg-white/70"
        >
          {t('home.hero.eyebrow')}
        </motion.p>

        <div className="mb-6 flex min-h-24 max-w-5xl items-start sm:min-h-32 md:items-center md:justify-center lg:min-h-40">
          <h1
            aria-label={t('home.title')}
            className="text-left text-4xl leading-[1.08] break-keep text-white sm:text-5xl md:text-center md:text-6xl md:text-gray-950 lg:text-7xl"
          >
            <span aria-hidden="true" className="font-extrabold">
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mb-8 max-w-2xl text-left text-base leading-7 break-keep text-gray-100 sm:text-lg sm:text-gray-200 md:mb-10 md:text-center md:text-xl md:leading-8 md:text-gray-600"
        >
          {t('home.hero.subtitleLine1')}
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          {t('home.hero.subtitleLine2')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-wrap items-center justify-start gap-3 md:justify-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={`/${lang}/projects`}
              className="bg-seagull-500 hover:bg-seagull-600 focus-visible:ring-seagull-200 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-6 sm:text-base"
            >
              {t('home.hero.viewProjects')}
              <MdArrowForward aria-hidden="true" className="size-5" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="https://drive.google.com/file/d/1opn0TUVKUemECGX0Na7KUPyrDVm8hnB6/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="md:focus-visible:ring-seagull-200 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/90 px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:px-6 sm:text-base md:border-gray-200"
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
                  transition={{ delay: 0.4 + index * 0.08 }}
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
                    <span className="flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-white/40 bg-white/90 p-3 transition-colors group-hover:bg-white md:border-gray-200">
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

      <motion.div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-2 hidden -translate-x-1/2 md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="rounded-full border border-gray-500/50 p-2">
          <MdKeyboardArrowDown className="size-5 text-gray-700" />
        </div>
      </motion.div>
    </section>
  );
}
