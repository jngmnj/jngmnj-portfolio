'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdFileDownload } from 'react-icons/md';

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function HeroSection() {
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
    <section className="mb-16 h-full">
      <div className="mb-16 flex flex-col items-center gap-6 lg:flex-row">
        <div className="order-last w-full lg:order-first lg:w-3/5">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.p
              className="mb-2 text-2xl text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Frontend Engineer
            </motion.p>
            <motion.h1
              className="text-4xl leading-tight md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span>안녕하세요,</span>
              <br />
              <span>
                <strong className="font-extrabold">지정민</strong>입니다.
              </span>
            </motion.h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              className="mb-2 text-lg font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              사용자 경험이 더 좋은 프로덕트를 구현하기위해 끊임없이 고민합니다.
            </motion.div>
            <motion.div
              className="leading-relaxed text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <p className="mb-2">
                프론트엔드, 백엔드 개발과정 수료와 UI/UX 디자인·퍼블리싱·기획
                경험을 결합하여, <br />
                개발–디자인–기획 간의 유연한 협업 역량을 가지고있습니다.
              </p>
              <p>
                이를 통해 서비스의 기획부터 배포까지 전 과정을 주도적으로
                이끌며,
                <br />
                단순 구현을 넘어 프로덕트 완성도를 높이는 데 기여하고 있습니다.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            className="mt-8 flex items-center justify-start gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="https://drive.google.com/file/d/1opn0TUVKUemECGX0Na7KUPyrDVm8hnB6/view?usp=drive_link"
                target="_blank"
                className="btn group flex items-center gap-2 rounded-xl border border-gray-600 px-6 py-3"
              >
                <MdFileDownload className="transition-transform group-hover:translate-y-1" />
                이력서 다운로드
              </Link>
            </motion.div>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.div
                    key={social.href}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Link href={social.href} target="_blank">
                      <div className="p-4">
                        <IconComponent className="size-6" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
        <motion.div
          className="order-first aspect-square w-1/2 overflow-hidden rounded-full lg:order-last lg:w-2/5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
        >
          <Image
            src="/images/about/img_profile.png"
            alt="Profile Photo"
            width={500}
            height={500}
            className="size-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
