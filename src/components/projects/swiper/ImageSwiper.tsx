'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageSwiperProps {
  images: string[];
  projectTitle: string;
  initialIndex?: number;
  onSwiper?: (swiper: SwiperType) => void;
  onImageClick?: (index: number) => void;
  // Swiper 설정
  slidesPerView?:
    | number
    | { [key: number]: { slidesPerView: number; spaceBetween: number } };
  spaceBetween?: number;
  navigation?: {
    prevEl: string;
    nextEl: string;
  };
  // 스타일 옵션
  imageClassName?: string;
  containerClassName?: string;
  singleImageHeight?: string;
  // 모드 옵션
  mode?: 'thumbnail' | 'viewer'; // thumbnail: 썸네일 그리드, viewer: 전체 화면 뷰어
}

export default function ImageSwiper({
  images,
  projectTitle,
  initialIndex,
  onSwiper,
  onImageClick,
  slidesPerView = 1,
  spaceBetween = 16,
  navigation,
  imageClassName = 'object-cover',
  containerClassName = '',
  singleImageHeight = 'h-64 md:h-96',
  mode = 'thumbnail',
}: ImageSwiperProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Swiper 인스턴스 설정
  const handleSwiper = (swiper: SwiperType) => {
    setSwiperInstance(swiper);
    onSwiper?.(swiper);

    // initialIndex가 있으면 해당 슬라이드로 이동
    if (initialIndex !== undefined && initialIndex >= 0) {
      swiper.slideTo(initialIndex);
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  // 이미지가 1개일 때는 슬라이더 없이 단일 이미지 표시
  if (images.length === 1) {
    const isClickable = mode === 'thumbnail' && onImageClick;
    return (
      <div
        className={`relative w-full overflow-hidden rounded-lg ${singleImageHeight}`}
      >
        <Image
          src={images[0]}
          alt={`${projectTitle} - 1`}
          fill
          className={`${imageClassName} ${isClickable ? 'cursor-pointer transition-transform hover:scale-105' : ''}`}
          onClick={() => isClickable && onImageClick?.(0)}
          role={isClickable ? 'button' : undefined}
          tabIndex={isClickable ? 0 : undefined}
          onKeyDown={
            isClickable
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick?.(0);
                  }
                }
              : undefined
          }
          aria-label={isClickable ? '이미지 확대하기' : undefined}
          sizes={
            mode === 'viewer'
              ? '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px'
              : undefined
          }
        />
      </div>
    );
  }

  // Swiper 설정
  const swiperConfig = {
    modules: [Navigation, Pagination, A11y],
    slidesPerView: typeof slidesPerView === 'number' ? slidesPerView : 1,
    spaceBetween: typeof spaceBetween === 'number' ? spaceBetween : 16,
    navigation: navigation || undefined,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    onSwiper: handleSwiper,
    a11y: {
      prevSlideMessage: '이전 이미지',
      nextSlideMessage: '다음 이미지',
    },
    ...(typeof slidesPerView === 'object' && { breakpoints: slidesPerView }),
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <Swiper
        {...swiperConfig}
        className={mode === 'viewer' ? 'h-full w-full max-w-5xl' : 'rounded-lg'}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative w-full ${
                mode === 'viewer'
                  ? 'h-full max-h-[90vh]'
                  : `${singleImageHeight} cursor-pointer overflow-hidden rounded-lg border border-gray-200`
              }`}
            >
              <Image
                src={img}
                alt={`${projectTitle} - ${index + 1}`}
                fill
                className={`${imageClassName} ${
                  mode === 'thumbnail' && onImageClick
                    ? 'cursor-pointer transition-transform hover:scale-105'
                    : ''
                }`}
                onClick={() => mode === 'thumbnail' && onImageClick?.(index)}
                role={
                  mode === 'thumbnail' && onImageClick ? 'button' : undefined
                }
                tabIndex={mode === 'thumbnail' && onImageClick ? 0 : undefined}
                onKeyDown={
                  mode === 'thumbnail' && onImageClick
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onImageClick?.(index);
                        }
                      }
                    : undefined
                }
                aria-label={
                  mode === 'thumbnail' && onImageClick
                    ? `${projectTitle} 이미지 ${index + 1} 확대하기`
                    : undefined
                }
                sizes={
                  mode === 'viewer'
                    ? '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px'
                    : undefined
                }
                priority={index === initialIndex}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
