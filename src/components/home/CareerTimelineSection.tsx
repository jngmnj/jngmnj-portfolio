'use client';

import GridRails from '@/components/home/GridRails';
import Reveal from '@/components/home/Reveal';
import { useLocale } from '@/utils/useLocale';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { LuArrowRight } from 'react-icons/lu';

interface CareerItem {
  period: string;
  role: string;
  org: string;
  type: string;
}

/**
 * 경력·학력 요약 타임라인.
 *
 * 페이지에서 유일한 어두운 블록이라 스크롤 중간에 한 번 끊어 주는 구분점이 된다.
 * 전체 기록은 소개 페이지가 담당하고, 여기서는 최근 항목만 추려 보여준다.
 */
export default function CareerTimelineSection() {
  const lang = useLocale();
  const { t } = useTranslation('common');
  const items =
    (t('home.career.items', { returnObjects: true }) as CareerItem[]) ?? [];

  return (
    <section className="relative border-y border-gray-900 bg-gray-950">
      <GridRails tone="dark" />

      <div className="relative container py-20 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="text-seagull-300 mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
              {t('home.career.eyebrow')}
            </p>
            <h2 className="text-3xl leading-tight font-bold break-keep text-white sm:text-4xl">
              {t('home.career.title')}
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 break-keep text-gray-400">
              {t('home.career.subtitle')}
            </p>
            <Link
              href={`/${lang}/about`}
              className="focus-visible:ring-seagull-300 mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:ring-2 focus-visible:outline-none"
            >
              {t('home.career.button')}
              <LuArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>

          {/* 좌측 세로선을 따라 항목이 시간순으로 쌓이는 타임라인 */}
          <ol className="relative border-l border-white/10 pl-6 sm:pl-8">
            {items.map((item, index) => (
              <Reveal
                key={`${item.period}-${item.org}`}
                delay={index * 0.08}
                className="relative pb-9 last:pb-0"
              >
                {/* 세로선 위의 점 — pl 값만큼 왼쪽으로 빼서 선 가운데에 놓는다 */}
                <span
                  aria-hidden="true"
                  className="bg-seagull-400 absolute top-2 -left-6 size-2 rounded-full sm:-left-8"
                  style={{ marginLeft: '-3.5px' }}
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-sm font-semibold text-gray-400">
                    {item.period}
                  </p>
                  <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-gray-400">
                    {item.type}
                  </span>
                </div>
                <p className="mt-2 text-lg font-bold break-keep text-white">
                  {item.role}
                </p>
                <p className="mt-1 text-sm text-gray-400">{item.org}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
