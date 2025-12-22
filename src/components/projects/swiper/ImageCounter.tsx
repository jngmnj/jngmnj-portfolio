'use client';

import type { Swiper as SwiperType } from 'swiper';

interface ImageCounterProps {
  swiperInstance: SwiperType | null;
  currentIndex: number;
  totalImages: number;
  className?: string;
}

export default function ImageCounter({
  swiperInstance,
  currentIndex,
  totalImages,
  className = '',
}: ImageCounterProps) {
  if (totalImages <= 1) return null;

  const displayIndex = swiperInstance
    ? swiperInstance.activeIndex + 1
    : currentIndex + 1;

  return (
    <div
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white ${className}`}
    >
      {displayIndex} / {totalImages}
    </div>
  );
}

