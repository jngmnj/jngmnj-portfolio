import { useEffect, useRef, type RefObject } from 'react';

/**
 * 모달이 열릴 때 body의 스크롤을 막는 hook
 * @param isLocked - 모달이 열려있는지 여부
 */
export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body에 스크롤 방지 스타일 적용
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // 스크롤 복원
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
};

/**
 * 모달 닫기 기능을 제공하는 hook (ESC 키, 배경 클릭)
 * @param isOpen - 모달이 열려있는지 여부
 * @param onClose - 모달을 닫는 함수
 * @param options - 옵션 설정
 * @param options.closeOnEsc - ESC 키로 닫기 여부 (기본값: true)
 * @param options.closeOnBackdrop - 배경 클릭으로 닫기 여부 (기본값: true)
 * @returns handleBackdropClick - 배경 클릭 핸들러 함수
 */
export const useModalClose = (
  isOpen: boolean,
  onClose: () => void,
  options?: { closeOnEsc?: boolean; closeOnBackdrop?: boolean }
) => {
  const { closeOnEsc = true, closeOnBackdrop = true } = options || {};

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation(); // 다른 모달의 ESC 핸들러 실행 방지
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose, closeOnEsc]);

  // 배경 클릭 핸들러
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return { handleBackdropClick };
};

/**
 * 모달 포커스 관리 hook (포커스 저장/복원 및 초기 포커스 설정)
 * @param closeButtonRef - 닫기 버튼의 ref
 * @param isOpen - 모달이 열려있는지 여부
 * @param options - 옵션 설정
 * @param options.focusDelay - 포커스 지연 시간 (ms, 기본값: 100)
 * @returns previousFocusRef - 이전 포커스 요소를 저장하는 ref
 */
export const useModalFocus = (
  closeButtonRef: RefObject<HTMLButtonElement | null>,
  isOpen: boolean,
  options?: { focusDelay?: number }
) => {
  const { focusDelay = 100 } = options || {};
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 현재 포커스 저장
    previousFocusRef.current = document.activeElement as HTMLElement;

    // 애니메이션 후 닫기 버튼에 포커스
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, focusDelay);

    return () => {
      clearTimeout(timer);
      // 모달이 닫힐 때 원래 포커스로 복원
      previousFocusRef.current?.focus();
    };
  }, [isOpen, closeButtonRef, focusDelay]);

  return { previousFocusRef };
};

/**
 * 모달 포커스 트랩 hook (Tab 키로 모달 내부만 순환)
 * @param modalRef - 모달 컨테이너의 ref
 * @param isOpen - 모달이 열려있는지 여부
 */
export const useFocusTrap = (
  modalRef: RefObject<HTMLElement | null>,
  isOpen: boolean
) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      // 포커스 가능한 요소들 선택
      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen, modalRef]);
};
