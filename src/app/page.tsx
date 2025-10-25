'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io';
import { MdFileDownload } from 'react-icons/md';

export default function HomePage() {
  return (
    <main className="container">
      {/* Hero Section */}
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
                사용자 경험이 더 좋은 프로덕트를 구현하기위해 끊임없이
                고민합니다.
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
                  단순 구현을 넘어 프로덕트 완성도를 높이는 데 기여하고
                  있습니다.
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
                {[
                  { href: 'https://github.com/jngmnj', icon: IoLogoGithub },
                  {
                    href: 'https://instagram.com/jngmnj',
                    icon: IoLogoInstagram,
                  },
                  {
                    href: 'https://www.linkedin.com/in/%EC%A0%95%EB%AF%BC-%EC%A7%80-705288245/',
                    icon: FaLinkedinIn,
                  },
                ].map((social, _index) => {
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

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Skills</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-lg border p-4 text-center">
            <h3 className="mb-2 font-semibold">Frontend</h3>
            <p className="text-sm text-gray-600">
              React, Next.js, TypeScript, Tailwind CSS
            </p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <h3 className="mb-2 font-semibold">Backend</h3>
            <p className="text-sm text-gray-600">Node.js, Express, Firebase</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <h3 className="mb-2 font-semibold">Design</h3>
            <p className="text-sm text-gray-600">Figma, UI/UX</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <h3 className="mb-2 font-semibold">Tools</h3>
            <p className="text-sm text-gray-600">Git, Docker, Vercel, AWS</p>
          </div>
        </div>
      </section>

      {/* Recent Projects Preview */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Recent Projects</h2>
          <Link
            href="/projects"
            className="text-seagull-600 hover:text-seagull-700"
          >
            View All →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="https://github.com/jngmnj/jngmnj-portfolio"
            target="_blank"
            className="group"
          >
            <div className="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all group-hover:shadow-md hover:border-gray-400">
              <h3 className="mb-2 text-xl font-semibold">
                포트폴리오 웹사이트
              </h3>
              <p className="mb-4 text-gray-600">
                Next.js와 Tailwind CSS를 사용하여 제작한 반응형 포트폴리오
                웹사이트
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  Next.js
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  TypeScript
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  Tailwind CSS
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="https://github.com/main-10-2team/boardgame-frontend"
            target="_blank"
            className="group"
          >
            <div className="cursor-porigin-center h-full rounded-lg border border-gray-200 p-6 transition-all group-hover:shadow-md hover:border-gray-400">
              <h3 className="mb-2 text-xl font-semibold">
                보드게임 플랫폼, 보드큐(Boardque)
              </h3>
              <p className="mb-4 text-gray-600">
                보드게임 입문자부터 마니아까지, 조건 기반 추천과 리뷰·평점을
                통해 신뢰성 있는 보드게임 선택을 돕는 서비스
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  Next.js
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  TypeScript
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  Tanstack Query
                </span>
              </div>
            </div>
          </Link>
          <Link
            href="https://github.com/OZ-Coding-School/oz_externship_fe_01_team2"
            target="_blank"
            className="group"
          >
            <div className="h-full cursor-pointer rounded-lg border border-gray-200 p-6 transition-all group-hover:shadow-md hover:border-gray-400">
              <h3 className="mb-2 text-xl font-semibold">
                오즈코딩스쿨 통합교육 플랫폼(LMS)
              </h3>
              <p className="mb-4 text-gray-600">
                AI 기반 자동 응답 기능을 갖춘 통합 교육 플랫폼(LMS)
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  React
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  TypeScript
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                  Tailwind CSS
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <h2 className="mb-4 text-3xl font-bold">Let&apos;s Work Together</h2>
        <p className="mb-6 text-gray-600">
          I&apos;m open to new opportunities!
          <br /> 귀사의 연락을 기다립니다.
        </p>
        <Link
          href="/contact"
          className="btn-primary btn-medium inline-flex items-center"
        >
          Contact Me
        </Link>
      </section>
    </main>
  );
}
