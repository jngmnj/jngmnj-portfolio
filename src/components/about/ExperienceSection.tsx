'use client';

import TabContent from '@/components/about/TabContent';
import TabMenu from '@/components/about/TabMenu';
import type { AboutTab } from '@/data/MyData';
import { useEffect, useState } from 'react';
import { AboutContent, isAboutContent } from '@/data/aboutContent';
import { useTranslation } from 'react-i18next';

export default function ExperienceSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { t, i18n } = useTranslation('common');
  const [content, setContent] = useState<AboutContent | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/about', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) return;
        const data = await response.json();
        if (isAboutContent(data.content)) setContent(data.content);
      })
      .catch(() => {
        /* Keep the localized fallback when unavailable. */
      });
    return () => controller.abort();
  }, []);
  const tabs =
    (t('about.experience.tabs', {
      returnObjects: true,
    }) as AboutTab[]) ?? [];

  const displayTabs = content
    ? content[i18n.language.startsWith('en') ? 'en' : 'ko']
    : tabs;

  return (
    <section className="pb-20 sm:pb-32 md:pb-40">
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Left Sidebar */}
        <div className="w-full shrink-0 md:w-1/3">
          <div className="mb-4 text-3xl leading-snug font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            {t('about.experience.titleLine1')}
            <br />
            {t('about.experience.titleLine2')}
          </div>
          <div className="mb-8 text-sm text-gray-600 sm:text-base md:mb-16">
            {t('about.experience.subtitle')}
          </div>
          <TabMenu
            activeTabIndex={activeTabIndex}
            onTabChange={setActiveTabIndex}
            tabs={displayTabs}
          />
        </div>

        {/* Right Content */}
        <div className="min-w-0 flex-1 py-4 md:py-0">
          <TabContent tabIndex={activeTabIndex} tabs={displayTabs} />
        </div>
      </div>
    </section>
  );
}
