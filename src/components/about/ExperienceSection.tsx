'use client';

import TabContent from '@/components/about/TabContent';
import TabMenu from '@/components/about/TabMenu';
import { useState } from 'react';

export default function ExperienceSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className="mb-16">
      <div className="flex max-h-[80vh] gap-8">
        {/* Left Sidebar */}
        <div className="w-1/3 shrink-0">
          <div className="mb-6 text-6xl leading-snug font-bold">
            저를
            <br />
            뽑아야 하는 이유
          </div>
          <div className="mb-16 text-gray-600">
            👇🏻 다음을 클릭하여 확인하세요.👇🏻
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
