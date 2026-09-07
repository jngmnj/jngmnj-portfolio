'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useModalClose, useScrollLock } from '@/utils/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import type { Swiper as SwiperType } from 'swiper';
import ImageCounter from './swiper/ImageCounter';
import ImageSwiper from './swiper/ImageSwiper';
import SwiperNavigationButtons from './swiper/SwiperNavigationButtons';
import { useSwiperKeyboard } from './swiper/useSwiperKeyboard';

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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달이 열릴 때 body 스크롤 막기
  useScrollLock(isOpen);
  const { handleBackdropClick } = useModalClose(isOpen, onClose);

  // 좌우 화살표 키로 이미지 이동
  useSwiperKeyboard(swiperInstance, isOpen);

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
          className="absolute inset-0 cursor-pointer bg-black/90"
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
            className="absolute top-5 right-5 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-white/34 bg-white/24 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28),0_14px_40px_rgba(15,23,42,0.24)] backdrop-blur-xl transition-all hover:border-white/42 hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 focus-visible:outline-none sm:top-6 sm:right-6"
            onClick={onClose}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="이미지 뷰어 닫기"
          >
            <RiCloseLine className="text-2xl" />
          </motion.button>

          {/* Image Slider */}
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative h-full w-full max-w-5xl">
              <ImageSwiper
                images={images}
                projectTitle={projectTitle}
                initialIndex={initialIndex}
                onSwiper={setSwiperInstance}
                navigation={{
                  prevEl: '#viewer-prev',
                  nextEl: '#viewer-next',
                }}
                slidesPerView={1}
                spaceBetween={20}
                imageClassName="object-contain"
                mode="viewer"
                showPagination={false}
                singleImageHeight="h-full max-h-[90vh]"
                containerClassName="h-full w-full"
              />
            </div>
            {/* Navigation Buttons (only for multiple images) */}
            {images.length > 1 && (
              <SwiperNavigationButtons
                prevButtonId="viewer-prev"
                nextButtonId="viewer-next"
                variant="viewer"
              />
            )}
          </div>

          {/* Image Counter */}
          <ImageCounter
            swiperInstance={swiperInstance}
            currentIndex={initialIndex}
            totalImages={images.length}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
