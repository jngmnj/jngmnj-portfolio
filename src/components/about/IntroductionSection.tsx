'use client';

import { getImageUrl } from '@/utils/imageUpload';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdFileDownload } from 'react-icons/md';

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function IntroductionSection() {
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

  const socialLinks: SocialLink[] = [
    { href: 'https://github.com/jngmnj', icon: IoLogoGithub },
    {
      href: 'https://instagram.com/jngmnj',
      icon: IoLogoInstagram,
    },
    {
      href: 'https://www.linkedin.com/in/%EC%A0%95%EB%AF%BC-%EC%A7%80-705288245/',
      icon: FaLinkedinIn,
    },
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative container flex flex-col items-center gap-12 px-6 lg:flex-row lg:gap-16">
        {/* Left Content */}
        <div className="flex w-full flex-col justify-center lg:w-3/5">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-seagull-200 bg-seagull-50 mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2"
          >
            <div className="bg-seagull-500 h-2 w-2 rounded-full" />
            <span className="text-seagull-700 text-sm font-medium">
              Frontend Engineer
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                안녕하세요,
              </motion.span>
              <motion.span
                className="block text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                지정민입니다.
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
            <p className="text-xl font-semibold text-gray-900">
              사용자 경험이 더 좋은 프로덕트를 구현하기위해 끊임없이 고민합니다.
            </p>
            <p className="leading-relaxed text-gray-600">
              프론트엔드, 백엔드 개발과정 수료와 UI/UX 디자인·퍼블리싱·기획
              경험을 결합하여, 개발–디자인–기획 간의 유연한 협업 역량을
              가지고있습니다.
            </p>
            <p className="leading-relaxed text-gray-600">
              이를 통해 서비스의 기획부터 배포까지 전 과정을 주도적으로 이끌며,
              단순 구현을 넘어 프로덕트 완성도를 높이는 데 기여하고 있습니다.
            </p>
          </motion.div>

          {/* CTA Buttons and Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6"
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
                className="bg-seagull-500 hover:bg-seagull-600 inline-flex items-center gap-2 rounded-xl px-7 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
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
          className="relative w-full lg:w-2/5"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Profile Image Container */}
          <div className="relative mx-auto aspect-square max-w-sm">
            {/* Profile Image */}
            <div className="relative h-full w-full overflow-hidden rounded-full">
              {isLoading ? (
                <div className="size-full animate-pulse rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
              ) : profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="Profile Photo"
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
            className="border-seagull-200 absolute -right-4 -bottom-4 flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-lg"
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
                  className="bg-seagull-500 h-2 w-2 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Open to Work
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
