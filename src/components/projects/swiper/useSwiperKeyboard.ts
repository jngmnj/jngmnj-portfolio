import { useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';

/**
 * Swiper를 키보드로 제어하는 hook
 * @param swiperInstance - Swiper 인스턴스
 * @param isEnabled - 키보드 제어 활성화 여부
 */
export function useSwiperKeyboard(
  swiperInstance: SwiperType | null,
  isEnabled: boolean = true
) {
  useEffect(() => {
    if (!isEnabled || !swiperInstance) return;

    const handleArrowKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        swiperInstance.slidePrev();
      } else if (event.key === 'ArrowRight') {
        swiperInstance.slideNext();
      }
    };

    document.addEventListener('keydown', handleArrowKey);
    return () => document.removeEventListener('keydown', handleArrowKey);
  }, [swiperInstance, isEnabled]);
}
