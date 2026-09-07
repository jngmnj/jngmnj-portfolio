'use client';

import GridRails from '@/components/home/GridRails';
import Reveal from '@/components/home/Reveal';
import { useTranslation } from 'react-i18next';
import type { IconType } from 'react-icons';
import {
  LuCode,
  LuDatabase,
  LuLayoutTemplate,
  LuPenTool,
  LuSearch,
} from 'react-icons/lu';

// 문구는 locale, 아이콘은 코드에서 순서대로 붙인다(번역 파일에 컴포넌트를 넣지 않기 위해).
const ICONS: IconType[] = [
  LuCode,
  LuPenTool,
  LuLayoutTemplate,
  LuDatabase,
  LuSearch,
];

/**
 * 히어로 바로 아래 역량 스트립 — 어떤 일을 맡을 수 있는지 한 줄로 먼저 보여준다.
 */
export default function CapabilityStrip() {
  const { t } = useTranslation('common');
  const items =
    (t('home.capabilityStrip.items', {
      returnObjects: true,
    }) as string[]) ?? [];

  return (
    <section className="relative border-y border-gray-100 bg-white">
      <GridRails />

      <div className="relative container py-12">
        <Reveal>
          <p className="text-center text-sm font-semibold break-keep text-gray-700">
            {t('home.capabilityStrip.title')}
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {items.map((item, index) => {
              const Icon = ICONS[index] ?? LuCode;
              return (
                <li
                  key={item}
                  className="flex items-center gap-2 text-gray-400 transition-colors hover:text-gray-600"
                >
                  <Icon aria-hidden="true" className="size-5" />
                  <span className="text-sm font-semibold">{item}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
