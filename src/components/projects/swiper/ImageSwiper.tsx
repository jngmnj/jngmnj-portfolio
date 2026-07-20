'use client';

import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { createImageClickProps } from './imageClickHandlers';

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
  showPagination?: boolean;
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
  showPagination = true,
  imageClassName = 'object-cover',
  containerClassName = '',
  singleImageHeight = 'h-64 md:h-96',
  mode = 'thumbnail',
}: ImageSwiperProps) {
  // Swiper 인스턴스 설정
  const handleSwiper = (swiper: SwiperType) => {
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
    const isClickable = mode === 'thumbnail' && !!onImageClick;
    const clickProps = createImageClickProps(
      0,
      projectTitle,
      onImageClick,
      isClickable
    );

    return (
      <div
        className={`relative w-full overflow-hidden rounded-lg ${singleImageHeight} ${isClickable ? 'cursor-pointer' : ''}`}
        onClick={clickProps.onClick}
        role={clickProps.role}
        tabIndex={clickProps.tabIndex}
        onKeyDown={clickProps.onKeyDown}
        aria-label={clickProps.ariaLabel}
      >
        <Image
          src={images[0]}
          alt={`${projectTitle} - 1`}
          fill
          className={`${imageClassName} ${isClickable ? 'transition-transform hover:scale-105' : ''}`}
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
    modules: [Navigation, ...(showPagination ? [Pagination] : []), A11y],
    slidesPerView: typeof slidesPerView === 'number' ? slidesPerView : 1,
    spaceBetween: typeof spaceBetween === 'number' ? spaceBetween : 16,
    navigation: navigation || undefined,
    pagination: showPagination
      ? {
          clickable: true,
          dynamicBullets: true,
        }
      : false,
    loop: images.length > 1, // 이미지가 2개 이상일 때만 loop 활성화
    onSwiper: handleSwiper,
    a11y: {
      prevSlideMessage: '이전 이미지',
      nextSlideMessage: '다음 이미지',
    },
    ...(typeof slidesPerView === 'object' && { breakpoints: slidesPerView }),
  };

  return (
    <div
      className={`relative ${containerClassName} ${mode === 'viewer' ? 'h-full w-full' : ''}`}
    >
      <Swiper
        {...swiperConfig}
        className={mode === 'viewer' ? 'h-full w-full max-w-5xl' : 'rounded-lg'}
      >
        {images.map((img, index) => {
          const isClickable = mode === 'thumbnail' && !!onImageClick;
          const clickProps = createImageClickProps(
            index,
            projectTitle,
            onImageClick,
            isClickable
          );

          return (
            <SwiperSlide key={index}>
              <div
                className={`relative w-full ${
                  mode === 'viewer'
                    ? 'h-full max-h-[90vh]'
                    : `${singleImageHeight} overflow-hidden rounded-lg border border-gray-200 ${isClickable ? 'cursor-pointer' : ''}`
                }`}
                onClick={mode === 'viewer' ? undefined : clickProps.onClick}
                role={mode === 'viewer' ? undefined : clickProps.role}
                tabIndex={mode === 'viewer' ? undefined : clickProps.tabIndex}
                onKeyDown={mode === 'viewer' ? undefined : clickProps.onKeyDown}
                aria-label={
                  mode === 'viewer' ? undefined : clickProps.ariaLabel
                }
              >
                <Image
                  src={img}
                  alt={`${projectTitle} - ${index + 1}`}
                  fill
                  className={`${imageClassName} ${
                    isClickable && mode === 'thumbnail'
                      ? 'transition-transform hover:scale-105'
                      : ''
                  }`}
                  sizes={
                    mode === 'viewer'
                      ? '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px'
                      : undefined
                  }
                  priority={index === initialIndex}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
