import { DEFAULT_LOCALE } from '@/constants/locales';
import { createPageMetadata } from '@/app/lib/og-metadata';
import Link from 'next/link';
import { GoHeart, GoNorthStar, GoPeople, GoStack } from 'react-icons/go';

const cardClass =
  'rounded-lg border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg block';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return createPageMetadata({ lang, page: 'admin', path: '/admin' });
}

export default async function AdminPage({
  params,
}: {
  params?: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang ?? DEFAULT_LOCALE;
  const base = `/${lang}/admin`;

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">관리자 대시보드</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href={`${base}/projects`} className={cardClass}>
          <div className="mb-4 flex items-center gap-3">
            <GoStack className="text-seagull-500 text-3xl" />
            <h2 className="text-xl font-semibold">프로젝트 관리</h2>
          </div>
          <p className="text-gray-600">
            포트폴리오 프로젝트를 등록하고 관리합니다.
          </p>
        </Link>

        <Link href={`${base}/about`} className={cardClass}>
          <div className="mb-4 flex items-center gap-3">
            <GoPeople className="text-seagull-500 text-3xl" />
            <h2 className="text-xl font-semibold">소개 관리</h2>
          </div>
          <p className="text-gray-600">
            경력, 교육, 기술, 프로필 정보를 탭별로 관리합니다.
          </p>
        </Link>

        <Link href={`${base}/home`} className={cardClass}>
          <div className="mb-4 flex items-center gap-3">
            <GoNorthStar className="text-seagull-500 text-3xl" />
            <h2 className="text-xl font-semibold">메인페이지 관리</h2>
          </div>
          <p className="text-gray-600">메인페이지 콘텐츠를 관리합니다.</p>
        </Link>

        <Link href={`${base}/contact`} className={cardClass}>
          <div className="mb-4 flex items-center gap-3">
            <GoHeart className="text-seagull-500 text-3xl" />
            <h2 className="text-xl font-semibold">문의 조회</h2>
          </div>
          <p className="text-gray-600">
            접수된 문의 목록과 상세 내용을 확인합니다.
          </p>
        </Link>
      </div>
    </div>
  );
}
