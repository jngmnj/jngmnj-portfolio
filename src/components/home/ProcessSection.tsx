'use client';

import GridRails from '@/components/home/GridRails';
import Reveal from '@/components/home/Reveal';
import { useTranslation } from 'react-i18next';
import { LuArrowRight } from 'react-icons/lu';

interface ProcessItem {
  step: string;
  title: string;
  desc: string;
  output: string;
}

/**
 * 작업 방식 4단계.
 *
 * 결과물(프로젝트)과 기술(스킬) 사이에 두어, 같은 스택을 쓰더라도 어떻게 진행하는지를 보여준다.
 * 단계마다 "이 단계가 끝나면 무엇이 남는지"를 함께 적어, 설명만 있는 카드가 되지 않게 한다.
 */
export default function ProcessSection() {
  const { t } = useTranslation('common');
  const items =
    (t('home.process.items', { returnObjects: true }) as ProcessItem[]) ?? [];

  return (
    <section className="relative border-t border-gray-100 bg-white">
      <GridRails />

      <div className="relative container py-20 sm:py-24 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-seagull-700 mb-3 text-sm font-semibold tracking-[0.14em] uppercase">
            {t('home.process.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold break-keep text-gray-950 sm:text-4xl">
            {t('home.process.title')}
          </h2>
          <p className="mt-4 text-base leading-7 break-keep text-gray-600 sm:text-lg">
            {t('home.process.subtitle')}
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.08} className="h-full">
              <li className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50/70 p-6 transition-colors hover:border-gray-300 hover:bg-white">
                {/* 단계 사이를 잇는 화살표 — 마지막 카드에는 붙이지 않는다 */}
                {index < items.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-4 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-300 lg:flex"
                  >
                    <LuArrowRight className="size-3.5" />
                  </span>
                )}

                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-seagull-700 text-xs font-bold tracking-[0.12em] uppercase">
                    {item.step}
                  </span>
                  {/* 큰 숫자 — 진행 순서를 카드만 보고도 알 수 있게 한다 */}
                  <span
                    aria-hidden="true"
                    className="text-3xl leading-none font-extrabold text-gray-200 transition-colors group-hover:text-gray-300"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold break-keep text-gray-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 break-keep text-gray-600">
                  {item.desc}
                </p>

                {/* 산출물 — 단계가 끝났을 때 손에 남는 것 */}
                <div className="mt-auto pt-5">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
                      Output
                    </p>
                    <p className="mt-1.5 text-sm font-semibold break-keep text-gray-800">
                      {item.output}
                    </p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
