'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdFileDownload } from 'react-icons/md';

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
  '다~~~ 됩니다. (해보겠습니다!!!)',
];

const TYPING_SPEED = 50; // 타이핑 속도 (밀리초)
const DELETE_SPEED = 30; // 삭제 속도 (밀리초)
const PAUSE_TIME = 1500; // 문장 끝에서의 대기 시간 (밀리초)

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % CAPABILITIES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  const socialLinks = [
    { href: 'https://github.com/jngmnj', icon: IoLogoGithub },
    { href: 'https://instagram.com/jngmnj', icon: IoLogoInstagram },
    {
      href: 'https://www.linkedin.com/in/%EC%A0%95%EB%AF%BC-%EC%A7%80-705288245/',
      icon: FaLinkedinIn,
    },
  ];

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden">
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

      <div className="relative container flex flex-col items-center justify-center px-6 text-center">
        {/* Main typing text */}
        <div className="mb-12 flex min-h-40 items-center justify-center">
          <h1 className="text-5xl leading-tight font-black md:text-6xl lg:text-7xl">
            <span className="from-seagull-500 to-seagull-700 bg-linear-to-r bg-clip-text text-transparent">
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
          className="mb-12 max-w-2xl text-lg text-gray-600 md:text-xl"
        >
          프론트엔드 엔지니어, UI/UX 디자이너, 기획자로서
          <br />
          사용자 경험이 더 좋은 프로덕트를 구현하기 위해 끊임없이 고민합니다.
        </motion.p>

        {/* CTA Buttons and Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6"
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
              className="from-seagull-400 to-seagull-500 shadow-seagull-400/30 hover:shadow-seagull-400/40 inline-flex items-center gap-2 rounded-xl bg-linear-to-r px-7 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
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
                    <Link href={social.href} target="_blank">
                      <div className="hover:from-seagull-50 hover:to-seagull-100 flex items-center justify-center rounded-xl bg-linear-to-br from-gray-50 to-gray-100 p-3 transition-all">
                        <IconComponent className="hover:text-seagull-500 size-6 text-gray-700 transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
