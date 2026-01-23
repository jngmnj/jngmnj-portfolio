'use client';

import TabContent from '@/components/about/TabContent';
import TabMenu from '@/components/about/TabMenu';
import { useState } from 'react';

export default function ExperienceSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className="pb-20 sm:pb-32 md:pb-40">
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Left Sidebar */}
        <div className="w-full shrink-0 md:w-1/3">
          <div className="mb-4 text-3xl leading-snug font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Experience
            <br />& Strengths
          </div>
          <div className="mb-8 text-sm text-gray-600 sm:text-base md:mb-16">
            다양한 경험을 통해 성장해왔습니다.
          </div>
          <TabMenu
            activeTabIndex={activeTabIndex}
            onTabChange={setActiveTabIndex}
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 py-4 md:py-0">
          <TabContent tabIndex={activeTabIndex} />
        </div>
      </div>
    </section>
  );
}
