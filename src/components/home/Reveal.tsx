'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface RevealProps {
  /** 같은 줄의 카드들을 순차로 띄울 때 쓰는 지연(초). 인덱스 * 0.08 정도가 자연스럽다. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * 스크롤로 화면에 들어오는 순간 한 번만 페이드·업으로 나타나는 래퍼.
 *
 * 홈은 세로로 긴 문서라 모든 블록이 처음부터 완성된 상태로 있으면 읽는 순서가 드러나지 않는다.
 * 시야에 들어온 블록만 뒤늦게 자리를 잡게 해 순서를 만든다. 한 번 드러나면 관찰을 끊어,
 * 되돌아 스크롤할 때 읽던 내용이 다시 사라지지 않게 한다.
 *
 * whileInView 대신 관찰을 직접 붙이는 이유: 홈 콘텐츠가 통째로 이 래퍼 안에 들어가므로,
 * 관찰이 한 번도 보고되지 않는 환경에서는 화면이 빈 채로 남는다. 그런 경우를 대비해
 * 일정 시간이 지나면 관찰 결과와 무관하게 드러내는 안전장치를 함께 둔다.
 */
export default function Reveal({
  delay = 0,
  className,
  children,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 관찰이 동작하지 않는 환경에서도 내용이 반드시 보이도록 하는 안전장치.
    const fallbackTimer = setTimeout(() => setIsShown(true), 1200);

    /* rootMargin 하단을 깎아, 요소가 화면 맨 아래에 걸치는 순간이 아니라 조금 올라온 뒤에
       재생되게 한다. 그래야 스크롤을 멈춘 위치에서 애니메이션이 보인다. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsShown(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(element);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  // 동작 최소화를 켠 사용자에게는 애니메이션 없이 최종 상태로 둔다.
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isShown ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
