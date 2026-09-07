'use client';

import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

interface SwiperNavigationButtonsProps {
  prevButtonId: string;
  nextButtonId: string;
  variant?: 'default' | 'viewer';
  className?: string;
}

export default function SwiperNavigationButtons({
  prevButtonId,
  nextButtonId,
  variant = 'default',
  className = '',
}: SwiperNavigationButtonsProps) {
  const isViewer = variant === 'viewer';
  const baseClasses = isViewer
    ? 'absolute top-1/2 z-30 -translate-y-1/2 cursor-pointer transition-all focus-visible:outline-none'
    : 'absolute top-1/2 z-10 -translate-y-1/2 cursor-pointer transition-all focus-visible:outline-none';
  const buttonClasses = isViewer
    ? 'flex h-12 w-12 items-center justify-center rounded-2xl border border-white/34 bg-white/24 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28),0_14px_42px_rgba(15,23,42,0.26)] backdrop-blur-xl hover:border-white/56 hover:bg-white/48 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42),0_18px_52px_rgba(15,23,42,0.3)] focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 sm:h-14 sm:w-14'
    : 'rounded-full bg-white/90 p-2 text-gray-700 shadow-lg hover:bg-white hover:shadow-xl focus-visible:ring-2 focus-visible:ring-seagull-400 focus-visible:ring-offset-2';
  const iconClasses = isViewer
    ? 'text-3xl transition-transform'
    : 'text-2xl text-gray-700';
  const prevPosition = isViewer ? 'left-4 sm:left-6' : 'left-4';
  const nextPosition = isViewer ? 'right-4 sm:right-6' : 'right-4';

  return (
    <>
      <button
        id={prevButtonId}
        className={`${baseClasses} ${buttonClasses} ${prevPosition} group ${className}`}
        aria-label="이전 이미지"
      >
        <GoChevronLeft
          className={`${iconClasses} ${isViewer ? 'group-hover:-translate-x-0.5' : ''}`}
        />
      </button>
      <button
        id={nextButtonId}
        className={`${baseClasses} ${buttonClasses} ${nextPosition} group ${className}`}
        aria-label="다음 이미지"
      >
        <GoChevronRight
          className={`${iconClasses} ${isViewer ? 'group-hover:translate-x-0.5' : ''}`}
        />
      </button>
    </>
  );
}
