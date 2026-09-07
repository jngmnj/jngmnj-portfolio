'use client';

import { SOCIAL_LINKS, type SocialIconKey } from '@/app/lib/constants';
import GridRails from '@/components/home/GridRails';
import Reveal from '@/components/home/Reveal';
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

const RESUME_URL =
  'https://drive.google.com/file/d/1opn0TUVKUemECGX0Na7KUPyrDVm8hnB6/view?usp=drive_link';

const SOCIAL_ICONS: Record<SocialIconKey, IconType> = {
  github: IoLogoGithub,
  instagram: IoLogoInstagram,
  linkedin: FaLinkedinIn,
};

/**
 * 최상단 히어로.
 *
 * 대형 타이포 한 덩어리와 CTA 한 쌍으로 첫 화면의 시선을 왼쪽에 모으고, 영상/사진은 오른쪽 뒤
 * 배경으로 깔아 첫 화면 높이를 늘리지 않으면서 분위기만 더한다.
 *
 * 타이핑 문구는 h1 이 아니라 헤드라인 아래 보조 줄로 둔다. 대표 제목이 계속 바뀌면 문서의 제목이
 * 고정되지 않고, 문구 길이에 따라 헤드라인 높이가 흔들린다.
 */
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
  const capabilityText = prefersReducedMotion
    ? (capabilities[0] ?? '')
    : displayText;

  return (
    <section className="relative overflow-hidden bg-white">
      {/*
        배경 미디어 — 화면 오른쪽 뒤에 깔린다.
        텍스트가 얹히는 왼쪽은 흰색으로 덮어 대비를 확보하고, 오른쪽으로 갈수록 영상이 드러나게 한다.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[64%]"
      >
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

        {/* 좌→우 흰색 페이드. 모바일은 텍스트가 영상 위에 그대로 올라가므로 더 진하게 덮는다 */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-white/50 lg:via-white/70 lg:to-transparent" />
        {/* 위아래 경계도 흰색으로 흘려 섹션 경계선이 사진처럼 잘려 보이지 않게 한다 */}
        <div className="absolute inset-0 bg-linear-to-b from-white/70 via-transparent to-white" />
      </div>

      <GridRails />

      {/* 텍스트는 배경 미디어를 덮지 않는 왼쪽 절반에만 놓는다 */}
      <div className="relative container max-w-7xl pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <p className="border-seagull-200 text-seagull-800 w-fit rounded-full border bg-white px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase">
              {t('home.hero.eyebrow')}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 text-4xl leading-[1.1] font-extrabold tracking-tight break-keep text-gray-950 sm:text-6xl lg:text-7xl">
              {t('home.hero.headlineLine1')}
              <br />
              <span className="text-seagull-600">
                {t('home.hero.headlineLine2')}
              </span>
            </h1>

            {/* 타이핑 보조 줄 — 높이를 고정해 문구가 바뀌어도 아래 요소가 밀리지 않는다 */}
            <div className="mt-6 flex min-h-9 items-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 sm:text-base">
                <span className="text-gray-400">
                  {t('home.hero.capabilityLabel')}
                </span>
                <span className="font-semibold text-gray-900">
                  {capabilityText}
                  {!prefersReducedMotion && (
                    <motion.span
                      aria-hidden="true"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="ml-0.5 inline-block"
                    >
                      |
                    </motion.span>
                  )}
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-8 break-keep text-gray-600 sm:text-lg">
              {t('home.hero.subtitleLine1')}
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              {t('home.hero.subtitleLine2')}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/${lang}/projects`}
                className="bg-seagull-500 hover:bg-seagull-600 focus-visible:ring-seagull-200 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:text-base"
              >
                {t('home.hero.viewProjects')}
                <MdArrowForward aria-hidden="true" className="size-5" />
              </Link>
              <Link
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-seagull-200 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:text-base"
              >
                <MdFileDownload aria-hidden="true" className="size-5" />
                {t('home.hero.resume')}
              </Link>
            </div>

            <ul className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.href}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group focus-visible:ring-seagull-200 block rounded-xl focus-visible:ring-2 focus-visible:outline-none"
                    >
                      <span className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-colors group-hover:border-gray-300 group-hover:bg-gray-50">
                        <Icon
                          aria-hidden="true"
                          className="size-5 text-gray-600"
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
