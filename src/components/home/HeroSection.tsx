'use client';

import { SOCIAL_LINKS, type SocialIconKey } from '@/app/lib/constants';
import { getImageUrl } from '@/utils/imageUpload';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdFileDownload, MdKeyboardArrowDown } from 'react-icons/md';

const CAPABILITIES = [
  '프론트엔드 엔지니어링? 됩니다.',
  'UI/UX 디자인? 됩니다.',
  '서비스 기획? 됩니다.',
  '야근? 됩니다.',
  '신규 툴 도입? 됩니다.',
  '코드 리뷰? 됩니다.',
  '협업? 됩니다.',
  '문서 작성? 됩니다.',
  '데드라인? 지킵니다.',
  '문제 해결? 됩니다.',
  '팀워크? 됩니다.',
  '피드백? 감사합니다.',
  '고객 관점 고민? 늘 됩니다.',
  '성장? 매일 됩니다.',
  '해보겠습니다!!!',
];

const TYPING_SPEED = 50; // 타이핑 속도 (밀리초)
const DELETE_SPEED = 30; // 삭제 속도 (밀리초)
const PAUSE_TIME = 1500; // 문장 끝에서의 대기 시간 (밀리초)

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileBgImageUrl, setMobileBgImageUrl] = useState<string | null>(null);
  const [isLoadingBg, setIsLoadingBg] = useState(true);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
    } else {
      setIsLoadingBg(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const currentCapability = CAPABILITIES[currentIndex];
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
          setCurrentIndex((prev) => (prev + 1) % CAPABILITIES.length);
        }, 0); // setTimeout으로 감싸서 비동기 콜백으로
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  // Map icons to social links
  const iconMap: Record<SocialIconKey, React.ComponentType<{ className?: string }>> = {
    github: IoLogoGithub,
    instagram: IoLogoInstagram,
    linkedin: FaLinkedinIn,
  };

  const socialLinks = Object.entries(SOCIAL_LINKS).map(([key, href]) => ({
    href,
    icon: iconMap[key as SocialIconKey],
  }));

  return (
    <section className="relative flex min-h-[calc(100vh-40px)] items-center justify-center overflow-hidden">
      {/* Video Background - Desktop only */}
      {!isMobile && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/images/bg/video_bg_hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Image Background - Mobile only */}
      {isMobile && (
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            zIndex: 0,
            backgroundImage: mobileBgImageUrl
              ? `url(${mobileBgImageUrl})`
              : 'linear-gradient(135deg, #cee8ff 0%, #a8d5ff 100%)',
            transition: 'background-image 0.3s ease-in-out',
          }}
        >
          {isLoadingBg && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#cee8ff] to-[#a8d5ff]" />
          )}
        </div>
      )}

      {/* Dark Overlay for Content Visibility */}
      <div className="absolute inset-0 z-1 bg-[#cee8ff] mix-blend-multiply md:backdrop-blur-sm backdrop-hue-rotate-[-30deg]" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
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

      <div
        className="relative container flex flex-col px-6 md:items-center md:justify-center md:text-center"
        style={{ 
          zIndex: 2,
          ...(isMobile && {
            justifyContent: 'flex-start',
            paddingTop: '66.666%', // 2/3 지점
          })
        }}
      >
        {/* Main typing text */}
        <div className="mb-8 flex items-start md:items-center md:justify-center sm:mb-10 md:mb-12">
          <h1 className="text-left text-4xl leading-tight text-white sm:text-5xl md:text-center md:text-black md:text-6xl lg:text-7xl xl:text-8xl">
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 max-w-2xl text-left text-gray-100 sm:mb-10 sm:text-lg sm:text-gray-200 md:mb-12 md:text-center md:text-gray-600 md:text-2xl"
        >
          프론트엔드 엔지니어, UI/UX 디자이너, 기획자로서
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          사용자 경험이 더 좋은 프로덕트를 구현하기 위해 끊임없이 고민합니다.
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
              이력서 다운로드
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
          <div className={`rounded-full border-2 p-2 ${isMobile ? 'border-white' : 'border-black'}`}>
            <MdKeyboardArrowDown className={`size-5 ${isMobile ? 'text-white' : 'text-black'}`} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
