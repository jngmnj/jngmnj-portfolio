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
  const [isTransparent, setIsTransparent] = useState(true);
  const [showTopBanner, setShowTopBanner] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setShowTopBanner(scrollContainer.scrollTop < 100);
      setIsTransparent(scrollContainer.scrollTop < 100);
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
        className="
          scrollbar-hide
          h-screen
          overflow-y-auto
          md:scroll-smooth
          md:snap-y md:snap-mandatory
        "
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <Header isTransparent={isTransparent} />

        {/* Hero */}
        <div className="md:snap-center md:snap-always md:-scroll-mt-10 -mt-16.5 md:mt-0">
          <HeroSection />
        </div>

        <div className="container py-24">
          {/* Skills */}
          <div className="md:snap-center md:snap-always">
            <SkillsSection />
          </div>

          {/* Recent Projects */}
          <div className="md:snap-center md:snap-always">
            <RecentProjectsSection />
          </div>

          {/* CTA */}
          <div className="md:snap-center md:snap-always">
            <section className="rounded-lg bg-gray-50 p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold">
                Let&apos;s Work Together
              </h2>
              <p className="mb-6 text-gray-600">
                I&apos;m open to new opportunities!
                <br />
                귀사의 연락을 기다립니다.
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
