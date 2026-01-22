import type { KeyboardEvent } from 'react';

/**
 * 이미지 클릭 핸들러를 생성하는 유틸리티 함수
 */
export const createImageClickHandler = (
  index: number,
  onImageClick?: (index: number) => void
) => {
  if (!onImageClick) return undefined;
  return () => onImageClick(index);
};

/**
 * 이미지 키보드 핸들러를 생성하는 유틸리티 함수
 */
export const createImageKeyDownHandler = (
  index: number,
  onImageClick?: (index: number) => void
) => {
  if (!onImageClick) return undefined;
  return (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageClick(index);
    }
  };
};

/**
 * 이미지 클릭 관련 props를 생성하는 유틸리티 함수
 */
export const createImageClickProps = (
  index: number,
  projectTitle: string,
  onImageClick?: (index: number) => void,
  isClickable: boolean = true
) => {
  if (!isClickable || !onImageClick) {
    return {
      onClick: undefined,
      role: undefined,
      tabIndex: undefined,
      onKeyDown: undefined,
      ariaLabel: undefined,
    };
  }

  return {
    onClick: createImageClickHandler(index, onImageClick),
    role: 'button' as const,
    tabIndex: 0,
    onKeyDown: createImageKeyDownHandler(index, onImageClick),
    ariaLabel:
      index === 0
        ? '이미지 확대하기'
        : `${projectTitle} 이미지 ${index + 1} 확대하기`,
  };
};
