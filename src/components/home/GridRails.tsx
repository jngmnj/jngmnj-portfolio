interface GridRailsProps {
  /** 어두운 배경 위에서는 밝은 회색 괘선이 너무 튀어 톤을 낮춘 색을 쓴다. */
  tone?: 'light' | 'dark';
}

/**
 * 콘텐츠 컨테이너(.container, max-w-7xl px-6) 경계를 따라 그리는 세로 괘선.
 *
 * 섹션마다 배경색이 달라도 좌우 정렬 기준선이 위아래로 이어져 보이도록,
 * 각 섹션 배경이 아니라 절대 위치 오버레이로 얹는다. 감싸는 쪽에 relative 가 있어야 한다.
 */
export default function GridRails({ tone = 'light' }: GridRailsProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-7xl -translate-x-1/2 border-x ${
        tone === 'dark' ? 'border-white/10' : 'border-gray-100'
      }`}
    />
  );
}
