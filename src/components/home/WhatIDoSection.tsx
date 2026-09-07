'use client';

import GridRails from '@/components/home/GridRails';
import {
  CodeMock,
  DesignMock,
  PipelineMock,
} from '@/components/home/HomeMocks';
import Reveal from '@/components/home/Reveal';
import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { IconType } from 'react-icons';
import {
  LuAccessibility,
  LuChevronRight,
  LuCloudUpload,
  LuComponent,
  LuFileCheck,
  LuGauge,
  LuLanguages,
  LuLayers,
  LuPalette,
  LuPlug,
  LuRefreshCw,
  LuSmartphone,
  LuTerminal,
  LuType,
} from 'react-icons/lu';

interface WhatIDoItem {
  label: string;
  headlineLine1: string;
  headlineLine2: string;
  descriptionLine1: string;
  descriptionLine2: string;
  highlights: string[];
  pipelineSteps?: string[];
}

/* 항목별 2×2 목록에 붙일 아이콘. locale 배열 순서와 1:1로 맞춘다. */
const HIGHLIGHT_ICONS: IconType[][] = [
  [LuTerminal, LuType, LuSmartphone, LuGauge],
  [LuPalette, LuComponent, LuLanguages, LuFileCheck],
  [LuLayers, LuPlug, LuCloudUpload, LuRefreshCw],
];

const FALLBACK_ICON = LuAccessibility;

/**
 * 무엇을 할 수 있는지 항목마다 한 화면 분량으로 소개하는 섹션.
 *
 * 카드 3장으로 나열하면 "무엇을 하는 사람인지"까지만 남고 실제로 어떻게 일하는지는 전달되지
 * 않는다. 항목마다 화면 목업을 붙여 스크롤만으로 결과물의 감이 잡히게 한다.
 */
export default function WhatIDoSection() {
  const { t } = useTranslation('common');
  const items =
    (t('home.whatIDo.items', { returnObjects: true }) as WhatIDoItem[]) ?? [];

  return (
    <section
      id="what-i-do"
      className="relative scroll-mt-20 overflow-hidden bg-white"
    >
      <GridRails />

      <div className="relative container pt-20 sm:pt-24 lg:pt-28">
        <Reveal>
          <p className="text-seagull-700 mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
            {t('home.whatIDo.eyebrow')}
          </p>
          <h2 className="max-w-2xl text-3xl leading-tight font-bold break-keep text-gray-950 sm:text-4xl lg:text-5xl">
            {t('home.whatIDo.title')}
          </h2>
        </Reveal>
      </div>

      {items.map((item, index) => (
        <WhatIDoBlock
          key={item.label}
          item={item}
          index={index}
          reversed={index % 2 === 1}
        />
      ))}
    </section>
  );
}

// 항목 1건 분량의 블록. reversed 로 목업/텍스트 좌우를 번갈아 배치해 스크롤 리듬을 만든다.
function WhatIDoBlock({
  item,
  index,
  reversed,
}: {
  item: WhatIDoItem;
  index: number;
  reversed: boolean;
}) {
  const lang = useLocale();
  const { t } = useTranslation('common');
  const icons = HIGHLIGHT_ICONS[index] ?? [];

  const mock =
    index === 0 ? (
      <CodeMock />
    ) : index === 1 ? (
      <DesignMock />
    ) : (
      <PipelineMock steps={item.pipelineSteps ?? []} />
    );

  return (
    <div className="border-t border-gray-100 first:border-t-0">
      <div className="container py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 카피 */}
          <Reveal className={`min-w-0 ${reversed ? 'lg:order-2' : ''}`}>
            <p className="text-seagull-700 text-sm font-bold">{item.label}</p>

            <h3 className="mt-4 text-3xl leading-tight font-bold break-keep text-gray-950 sm:text-4xl">
              {item.headlineLine1}
              <br />
              {item.headlineLine2}
            </h3>

            <div className="mt-6 flex flex-col gap-1.5 text-base leading-8 break-keep text-gray-600">
              <p>{item.descriptionLine1}</p>
              <p>{item.descriptionLine2}</p>
            </div>

            {/* 2×2 목록 — 문장으로 풀지 않고 키워드만 남겨 훑어보게 한다 */}
            <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {item.highlights.map((highlight, highlightIndex) => {
                const Icon = icons[highlightIndex] ?? FALLBACK_ICON;
                return (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-800"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-gray-400"
                    />
                    {highlight}
                  </li>
                );
              })}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href={`/${lang}/projects`}
                className="bg-seagull-500 hover:bg-seagull-600 focus-visible:ring-seagull-200 inline-flex min-h-12 items-center justify-center gap-1 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t('home.whatIDo.primaryCta')}
                <LuChevronRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="focus-visible:ring-seagull-200 inline-flex min-h-11 items-center gap-1 rounded-xl px-1 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900 focus-visible:ring-2 focus-visible:outline-none"
              >
                {t('home.whatIDo.secondaryCta')}
                <LuChevronRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </Reveal>

          {/* 화면 목업 — lg 이상에서만 원근 기울임을 주고 컨테이너 바깥으로 살짝 흘려보낸다 */}
          <Reveal
            delay={0.12}
            className={`min-w-0 [perspective:2200px] ${
              reversed ? 'lg:order-1 lg:-ml-10' : 'lg:-mr-10'
            }`}
          >
            <div
              className={`transition-transform duration-500 ${
                reversed
                  ? 'lg:[transform:rotateX(3deg)_rotateY(12deg)_rotateZ(1deg)]'
                  : 'lg:[transform:rotateX(3deg)_rotateY(-12deg)_rotateZ(-1deg)]'
              } lg:hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)]`}
            >
              {mock}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
