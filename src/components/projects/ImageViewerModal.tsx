'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useModalClose, useScrollLock } from '@/utils/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageViewerModalProps {
  images: string[];
  initialIndex: number;
  projectTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageViewerModal({
  images,
  initialIndex,
  projectTitle,
  isOpen,
  onClose,
}: ImageViewerModalProps) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달이 열릴 때 body 스크롤 막기
  useScrollLock(isOpen);
  const { handleBackdropClick } = useModalClose(isOpen, onClose);

  // 초기 인덱스로 슬라이더 이동
  useEffect(() => {
    if (isOpen && swiperInstance && initialIndex !== undefined) {
      swiperInstance.slideTo(initialIndex);
    }
  }, [isOpen, swiperInstance, initialIndex]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // 좌우 화살표 키로 이미지 이동
  useEffect(() => {
    if (!isOpen || !swiperInstance) return;

    const handleArrowKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        swiperInstance.slidePrev();
      } else if (event.key === 'ArrowRight') {
        swiperInstance.slideNext();
      }
    };

    document.addEventListener('keydown', handleArrowKey);
    return () => document.removeEventListener('keydown', handleArrowKey);
  }, [isOpen, swiperInstance]);

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-viewer-title"
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/90"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
        />

        {/* Modal Content */}
        <motion.div
          ref={modalRef}
          className="relative z-10 h-full w-full max-w-7xl p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id="image-viewer-title" className="sr-only">
            {projectTitle} 이미지 뷰어
          </h2>
          {/* Close Button */}
          <motion.button
            className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white hover:shadow-xl"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="이미지 뷰어 닫기"
          >
            <RiCloseLine className="text-2xl text-gray-700" />
          </motion.button>

          {/* Image Slider */}
          <div className="flex h-full items-center justify-center">
            {images.length === 1 ? (
              <div className="relative h-full max-h-[90vh] w-full max-w-5xl">
                <Image
                  src={images[0]}
                  alt={`${projectTitle} - 1`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                />
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                slidesPerView={1}
                spaceBetween={20}
                navigation={{
                  prevEl: '#viewer-prev',
                  nextEl: '#viewer-next',
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                onSwiper={setSwiperInstance}
                className="h-full w-full max-w-5xl"
                a11y={{
                  prevSlideMessage: '이전 이미지',
                  nextSlideMessage: '다음 이미지',
                }}
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-full max-h-[90vh] w-full">
                      <Image
                        src={img}
                        alt={`${projectTitle} - ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                        priority={index === initialIndex}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Navigation Buttons (only for multiple images) */}
            {images.length > 1 && (
              <>
                <button
                  id="viewer-prev"
                  className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white hover:shadow-xl"
                  aria-label="이전 이미지"
                >
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
                </button>
                <button
                  id="viewer-next"
                  className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition-all hover:bg-white hover:shadow-xl"
                  aria-label="다음 이미지"
                >
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
                </button>
              </>
            )}
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
              {swiperInstance
                ? `${swiperInstance.activeIndex + 1} / ${images.length}`
                : `${initialIndex + 1} / ${images.length}`}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
