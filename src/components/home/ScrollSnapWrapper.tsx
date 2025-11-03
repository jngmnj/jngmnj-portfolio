'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import TopBanner from '@/components/common/TopBanner';
import HeroSection from '@/components/home/HeroSection';
import RecentProjectsSection from '@/components/home/RecentProjectsSection';
import SkillsSection from '@/components/home/SkillsSection';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function ScrollSnapWrapper() {
  const [showHeader, setShowHeader] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setShowTopBanner(scrollContainer.scrollTop < 100);
      setShowHeader(scrollContainer.scrollTop > 100);
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
        className="scrollbar-hide h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth"
        ref={scrollRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {showHeader && <Header />}
        <div className="snap-center snap-always">
          <HeroSection />
        </div>
        <div className="container py-24">
          <div className="snap-center snap-always">
            <SkillsSection />
          </div>
          <div className="snap-center snap-always">
            <RecentProjectsSection />
          </div>
          <div className="snap-center snap-always">
            <section className="rounded-lg bg-gray-50 p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">
                Let&apos;s Work Together
              </h2>
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
