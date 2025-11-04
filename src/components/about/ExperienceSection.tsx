'use client';

import TabContent from '@/components/about/TabContent';
import TabMenu from '@/components/about/TabMenu';
import { useState } from 'react';

export default function ExperienceSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className="pb-40">
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="w-1/3 shrink-0">
          <div className="mb-6 text-6xl leading-snug font-bold">
            Experience
            <br />& Strengths
          </div>
          <div className="mb-16 text-gray-600">
            다양한 경험을 통해 성장해왔습니다.
          </div>
          <TabMenu
            activeTabIndex={activeTabIndex}
            onTabChange={setActiveTabIndex}
          />
        </div>

        {/* Right Content */}
        <div className="flex-1">
          <TabContent tabIndex={activeTabIndex} />
        </div>
      </div>
    </section>
  );
}
