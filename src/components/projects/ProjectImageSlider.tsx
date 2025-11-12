'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import type { Swiper as SwiperType } from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ProjectImageSliderProps {
  images: string[];
  projectTitle: string;
  onImageClick?: (index: number) => void;
}

export default function ProjectImageSlider({
  images,
  projectTitle,
  onImageClick,
}: ProjectImageSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  // 이미지가 1개일 때는 슬라이더 없이 단일 이미지 표시
  if (images.length === 1) {
    return (
      <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-96">
        <Image
          src={images[0]}
          alt={`${projectTitle} - 1`}
          fill
          className="cursor-pointer object-cover transition-transform hover:scale-105"
          onClick={() => onImageClick?.(0)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onImageClick?.(0);
            }
          }}
          aria-label="이미지 확대하기"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={16}
        navigation={{
          prevEl: '#image-slider-prev',
          nextEl: '#image-slider-next',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        onSwiper={setSwiperInstance}
        className="rounded-lg"
        a11y={{
          prevSlideMessage: '이전 이미지',
          nextSlideMessage: '다음 이미지',
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-64 w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 md:h-96">
              <Image
                src={img}
                alt={`${projectTitle} - ${index + 1}`}
                fill
                className="cursor-pointer object-cover transition-transform hover:scale-105"
                onClick={() => onImageClick?.(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick?.(index);
                  }
                }}
                aria-label={`${projectTitle} 이미지 ${index + 1} 확대하기`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        id="image-slider-prev"
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl"
        aria-label="이전 이미지"
      >
        <GoChevronLeft className="text-2xl text-gray-700" />
      </button>
      <button
        id="image-slider-next"
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl"
        aria-label="다음 이미지"
      >
        <GoChevronRight className="text-2xl text-gray-700" />
      </button>
    </div>
  );
}
