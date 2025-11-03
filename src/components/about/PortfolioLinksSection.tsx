'use client';

import Toast from '@/components/common/Toast';
import Link from 'next/link';
import { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';

const portfolioLinks = [
  {
    id: '01',
    title: 'Web Development',
    href: '/projects',
    description:
      '프론트엔드에서 효율적인 코드 작성과 최적화를 통해 사용자 친화적인 인터페이스와 성능을 구현합니다. HTML, CSS, Javascript는 기본으로, typescript를 통해 정적 타입 검사를 진행하며, React, Next.js등 여러 프레임워크와 라이브러리를 사용합니다.',
  },
  {
    id: '02',
    title: 'UI/UX Design',
    href: null,
    description:
      '사용자의 요구와 기대를 반영한 최상의 사용자 경험(UX)을 설계합니다. Figma, Adobe XD 등 다양한 디자인 툴을 사용하여 프로젝트의 시각적 디자인 및 인터랙션을 구현합니다.',
  },
  {
    id: '03',
    title: 'Database Management(SQL)',
    href: null,
    description:
      'SQL을 활용하여 데이터 쿼리, 삽입, 업데이트, 삭제를 할 수 있습니다. Firebase와 Firestore, MySQL, PostgreSQL 등의 데이터베이스를 다룰 수 있습니다.',
  },
  {
    id: '04',
    title: 'Search Engine Optimization(SEO)',
    href: null,
    description:
      '키워드 리서치, 메타 태그 최적화, 내부 링크 구조 개선 등을 통해 사이트의 SEO 성능을 향상시킵니다. Google Analytics와 같은 도구를 활용해 트래픽 분석 및 SEO 성과 측정을 수행할 수 있습니다.',
  },
];

export default function PortfolioLinksSection() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleClick = (
    link: (typeof portfolioLinks)[0],
    e: React.MouseEvent
  ) => {
    if (!link.href) {
      e.preventDefault();
      showToast('준비중입니다.', 'info');
    }
  };
  return (
    <section className="mb-16 h-full">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      <div className="-mx-2 flex flex-wrap">
        {portfolioLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href || '#'}
            className="group w-1/2 px-2 py-3"
            onClick={(e) => handleClick(link, e)}
          >
            <div className="hover:border-seagull-400 h-full rounded-xl border border-gray-200 px-6 py-8 transition-all">
              <div className="group-hover:text-seagull-600 mb-3 text-4xl font-bold transition">
                {link.id}
              </div>
              <div className="group-hover:text-seagull-600 mb-6 flex items-end gap-4 text-6xl font-bold transition md:text-4xl">
                {link.title}
                <div className="border-seagull-600 hidden rounded-full border p-4 opacity-0 transition group-hover:opacity-100 lg:block">
                  <GoArrowUpRight className="text-seagull-600 text-3xl" />
                </div>
              </div>
              <div className="leading-6">{link.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
