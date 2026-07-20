'use client';

import { SOCIAL_LINKS, type SocialIconKey } from '@/app/lib/constants';
import Loading from '@/app/loading';
import { getImageUrl } from '@/utils/imageUpload';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdFileDownload, MdKeyboardArrowDown } from 'react-icons/md';

const TYPING_SPEED = 50; // 타이핑 속도 (밀리초)
const DELETE_SPEED = 30; // 삭제 속도 (밀리초)
const PAUSE_TIME = 1500; // 문장 끝에서의 대기 시간 (밀리초)

export default function HeroSection() {
  const { t } = useTranslation('common');
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

  // 모바일 감지
  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setHasMeasured(true);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일 배경 이미지 로드
  useEffect(() => {
    if (isMobile) {
      getImageUrl('images/IMG_7606.JPG')
        .then((url) => {
          setMobileBgImageUrl(url);
        })
        .catch((error) => {
          console.error('Failed to load mobile background image:', error);
          // 실패 시 그라데이션 사용
          setMobileBgImageUrl(null);
        })
        .finally(() => {
          setIsLoadingBg(false);
        });
    }
  }, [isMobile]);

  useEffect(() => {
    const currentCapability = capabilities[currentIndex] ?? '';
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // 타이핑 중
      if (displayText.length < currentCapability.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentCapability.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
      } else {
        // 타이핑 완료, 대기
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_TIME);
      }
    } else {
      // 삭제 중
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        // 삭제 완료, 다음 문장으로
        timeout = setTimeout(() => {
          setIsDeleting(false);
          if (capabilities.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % capabilities.length);
          }
        }, 0); // setTimeout으로 감싸서 비동기 콜백으로
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, capabilities]);

  // Map icons to social links
  const iconMap: Record<
    SocialIconKey,
    React.ComponentType<{ className?: string }>
  > = {
    github: IoLogoGithub,
    instagram: IoLogoInstagram,
    linkedin: FaLinkedinIn,
  };

  const socialLinks = Object.entries(SOCIAL_LINKS).map(([key, href]) => ({
    href,
    icon: iconMap[key as SocialIconKey],
  }));

  if (isMobile && isLoadingBg) {
    return <Loading />;
  }

  return (
    <section className="relative flex min-h-[calc(100vh-40px)] items-center justify-center overflow-hidden">
      {/* Image Background - Mobile only */}
      {isMobile && !isLoadingBg && (
        <>
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              zIndex: 0,
              backgroundImage:
                'linear-gradient(135deg, #57c076 0%, #00512a 100%)',
            }}
          />
          {mobileBgImageUrl && (
            <Image
              src={mobileBgImageUrl}
              alt=""
              fill
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
              style={{
                zIndex: 1,
                opacity: !isLoadingBg ? 1 : 0,
              }}
            />
          )}
        </>
      )}

      {/* Video Background - Desktop only */}
      {!isMobile && hasMeasured && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            style={{ zIndex: 0 }}
          >
            <source src="/images/bg/video_bg_hero.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay for Content Visibility */}
          <div className="absolute inset-0 z-1 hidden bg-[#cee8ff] mix-blend-multiply backdrop-hue-rotate-[-30deg] md:block md:backdrop-blur-sm" />

          {/* Background decorative elements */}
          <div className="md:blockabsolute inset-0 -z-10 hidden overflow-hidden">
            <motion.div
              className="from-seagull-400/20 to-seagull-500/10 absolute -top-48 -right-48 h-96 w-96 rounded-full bg-linear-to-br blur-3xl"
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -30, 30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="from-waikawa-gray-400/15 to-seagull-400/5 absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-linear-to-tr blur-3xl"
              animate={{
                x: [0, -30, 30, 0],
                y: [0, 30, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </>
      )}

      <div
        className="relative container flex flex-col px-6 md:items-center md:justify-center md:text-center"
        style={{
          zIndex: 2,
          ...(isMobile && {
            justifyContent: 'flex-start',
            paddingTop: '66.666%', // 2/3 지점
          }),
        }}
      >
        {/* Main typing text */}
        <div className="mb-8 flex items-start sm:mb-10 md:mb-12 md:items-center md:justify-center">
          <h1 className="text-left text-4xl leading-tight text-white sm:text-5xl md:text-center md:text-6xl md:text-black lg:text-7xl xl:text-8xl">
            <span className="font-extrabold">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1 inline-block h-full w-1"
              >
                |
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8 max-w-2xl text-left text-gray-100 sm:mb-10 sm:text-lg sm:text-gray-200 md:mb-12 md:text-center md:text-2xl md:text-gray-600"
        >
          {t('home.hero.subtitleLine1')}
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          {t('home.hero.subtitleLine2')}
        </motion.p>

        {/* CTA Buttons and Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-start justify-start gap-6 md:items-center md:justify-center"
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
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl sm:px-7 sm:text-base"
            >
              <MdFileDownload className="size-5" />
              {t('home.hero.resume')}
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
                  transition={{ delay: 0.5 + index * 0.1 }}
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
                    <Link href={social.href} target="_blank" className="group">
                      <div className="flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-gray-50 p-3 transition-all group-hover:bg-gray-100">
                        <IconComponent className="size-6 text-gray-700 transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-2 -translate-x-1/2 transform md:left-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          {/* <p className="text-sm font-medium text-black">Scroll</p> */}
          <div
            className={`rounded-full border-2 p-2 ${isMobile ? 'border-white' : 'border-black'}`}
          >
            <MdKeyboardArrowDown
              className={`size-5 ${isMobile ? 'text-white' : 'text-black'}`}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
