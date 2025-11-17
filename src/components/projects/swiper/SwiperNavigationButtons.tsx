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
  const baseClasses =
    'absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl';
  const viewerClasses = variant === 'viewer' ? 'p-3 z-20' : '';

  return (
    <>
      <button
        id={prevButtonId}
        className={`${baseClasses} ${viewerClasses} left-4 ${className}`}
        aria-label="이전 이미지"
      >
        {variant === 'viewer' ? (
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        ) : (
          <GoChevronLeft className="text-2xl text-gray-700" />
        )}
      </button>
      <button
        id={nextButtonId}
        className={`${baseClasses} ${viewerClasses} right-4 ${className}`}
        aria-label="다음 이미지"
      >
        {variant === 'viewer' ? (
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        ) : (
          <GoChevronRight className="text-2xl text-gray-700" />
        )}
      </button>
    </>
  );
}
