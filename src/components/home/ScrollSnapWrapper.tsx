'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import TopBanner from '@/components/common/TopBanner';
import HeroSection from '@/components/home/HeroSection';
import RecentProjectsSection from '@/components/home/RecentProjectsSection';
import SkillsSection from '@/components/home/SkillsSection';
import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuArrowRight } from 'react-icons/lu';

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

        <main>
          <div className="md:-scroll-mt-10">
            <HeroSection />
          </div>

          <div className="bg-white">
            <section
              id="about"
              className="container grid scroll-mt-20 gap-8 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20 lg:py-28"
            >
              <div>
                <p className="text-seagull-700 mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
                  {t('home.about.eyebrow')}
                </p>
                <h2 className="max-w-xl text-3xl leading-tight font-bold break-keep text-gray-950 sm:text-4xl lg:text-5xl">
                  {t('home.about.title')}
                </h2>
              </div>
              <div>
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
              </div>
            </section>
          </div>

          <div
            id="projects"
            className="scroll-mt-20 border-y border-gray-100 bg-gray-50/70"
          >
            <div className="container">
              <RecentProjectsSection />
            </div>
          </div>

          <div id="skills" className="scroll-mt-20 bg-white">
            <div className="container">
              <SkillsSection />
            </div>
          </div>

          <div
            id="contact"
            className="scroll-mt-20 bg-white px-6 pb-20 sm:pb-24 lg:pb-28"
          >
            <section className="from-seagull-50 to-waikawa-gray-50 mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-100 bg-linear-to-br px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20">
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
              <Link
                href={`/${lang}/contact`}
                className="bg-seagull-500 hover:bg-seagull-600 focus-visible:ring-seagull-200 mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-base"
              >
                {t('home.cta.button')}
                <LuArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
