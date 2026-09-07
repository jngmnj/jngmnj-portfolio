'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import TopBanner from '@/components/common/TopBanner';
import CapabilityStrip from '@/components/home/CapabilityStrip';
import CareerTimelineSection from '@/components/home/CareerTimelineSection';
import GridRails from '@/components/home/GridRails';
import HeroSection from '@/components/home/HeroSection';
import ProcessSection from '@/components/home/ProcessSection';
import RecentProjectsSection from '@/components/home/RecentProjectsSection';
import Reveal from '@/components/home/Reveal';
import SkillsSection from '@/components/home/SkillsSection';
import WhatIDoSection from '@/components/home/WhatIDoSection';
import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuArrowRight, LuCheck, LuMail } from 'react-icons/lu';

// about.experience 프로필에 적힌 연락용 메일 주소와 같은 값을 쓴다.
const CONTACT_EMAIL = 'jngmnj4@gmail.com';

export default function ScrollSnapWrapper() {
  const lang = useLocale();
  const { t } = useTranslation('common');
  const [showTopBanner, setShowTopBanner] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setShowTopBanner(scrollContainer.scrollTop < 100);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showTopBanner && <TopBanner />}

      <div
        ref={scrollRef}
        className="scrollbar-hide h-screen overflow-y-auto md:scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <Header />

        {/*
          섹션 순서는 "누구인가 → 무엇을 할 수 있나 → 어떻게 해왔나 → 결과물 → 어떻게 일하나 → 연락"
          으로 두어, 위에서 아래로 읽는 것만으로 판단에 필요한 정보가 채워지게 한다.
        */}
        <main className="break-keep">
          <div className="md:-scroll-mt-10">
            <HeroSection />
          </div>

          <CapabilityStrip />

          <div className="relative bg-white">
            <GridRails />
            <section
              id="about"
              className="relative container grid scroll-mt-20 gap-8 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20 lg:py-28"
            >
              <Reveal>
                <p className="text-seagull-700 mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
                  {t('home.about.eyebrow')}
                </p>
                <h2 className="max-w-xl text-3xl leading-tight font-bold break-keep text-gray-950 sm:text-4xl lg:text-5xl">
                  {t('home.about.title')}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-2xl text-base leading-8 break-keep text-gray-600 sm:text-lg">
                  {t('home.about.description')}
                </p>
                <Link
                  href={`/${lang}/about`}
                  className="text-seagull-700 focus-visible:ring-seagull-200 hover:text-seagull-900 mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl px-1 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  {t('home.about.button')}
                  <LuArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Reveal>
            </section>
          </div>

          <WhatIDoSection />

          <CareerTimelineSection />

          <div
            id="projects"
            className="relative scroll-mt-20 border-b border-gray-100 bg-gray-50/70"
          >
            <GridRails />
            <div className="relative container">
              <RecentProjectsSection />
            </div>
          </div>

          <div id="skills" className="relative scroll-mt-20 bg-white">
            <GridRails />
            <div className="relative container">
              <SkillsSection />
            </div>
          </div>

          <ProcessSection />

          <div
            id="contact"
            className="relative scroll-mt-20 bg-white px-6 pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28"
          >
            <Reveal>
              <section className="from-seagull-50 to-waikawa-gray-50 mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-100 bg-linear-to-br px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20">
                {/* 구직 상태 배지 — 초록 점으로 지금 열려 있다는 것을 먼저 알린다 */}
                <p className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700">
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-emerald-500"
                  />
                  {t('home.cta.status')}
                </p>

                <p className="text-seagull-700 mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
                  {t('home.cta.eyebrow')}
                </p>
                <h2 className="text-3xl font-bold break-keep text-gray-950 sm:text-4xl">
                  {t('home.cta.title')}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 break-keep text-gray-600 sm:text-lg">
                  {t('home.cta.line1')}
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  {t('home.cta.line2')}
                </p>

                {/* 어떤 연락을 받을 수 있는지 — 문의를 망설이는 쪽에 판단 기준을 준다 */}
                <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {(
                    (t('home.cta.points', {
                      returnObjects: true,
                    }) as string[]) ?? []
                  ).map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-1.5 text-sm break-keep text-gray-600"
                    >
                      <LuCheck
                        aria-hidden="true"
                        className="size-4 shrink-0 text-emerald-600"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href={`/${lang}/contact`}
                    className="bg-seagull-500 hover:bg-seagull-600 focus-visible:ring-seagull-200 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:text-base"
                  >
                    {t('home.cta.button')}
                    <LuArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="focus-visible:ring-seagull-200 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto sm:text-base"
                  >
                    <LuMail aria-hidden="true" className="size-4" />
                    {t('home.cta.emailButton')}
                  </a>
                </div>

                <p className="mt-5 text-sm text-gray-500">
                  {t('home.cta.emailLabel')}{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-seagull-700 hover:text-seagull-900 font-semibold underline underline-offset-4"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </section>
            </Reveal>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
