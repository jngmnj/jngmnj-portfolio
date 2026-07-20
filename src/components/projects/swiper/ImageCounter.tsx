'use client';

import type { Swiper as SwiperType } from 'swiper';
import { useEffect, useState } from 'react';

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
  const [displayIndex, setDisplayIndex] = useState(currentIndex + 1);

  useEffect(() => {
    setDisplayIndex(currentIndex + 1);
  }, [currentIndex]);

  useEffect(() => {
    if (!swiperInstance) return;

    const updateIndex = () => {
      setDisplayIndex(swiperInstance.realIndex + 1);
    };

    updateIndex();
    swiperInstance.on('slideChange', updateIndex);
    swiperInstance.on('realIndexChange', updateIndex);

    return () => {
      swiperInstance.off('slideChange', updateIndex);
      swiperInstance.off('realIndexChange', updateIndex);
    };
  }, [swiperInstance]);

  if (totalImages <= 1) return null;

  return (
    <div
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white ${className}`}
    >
      {displayIndex} / {totalImages}
    </div>
  );
}
