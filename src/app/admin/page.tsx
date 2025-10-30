import Link from 'next/link';
import {
  GoHeart,
  GoNorthStar,
  GoPeople,
  GoStack,
  GoTools,
} from 'react-icons/go';

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">관리자 대시보드</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/projects">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <GoStack className="text-seagull-500 text-3xl" />
              <h2 className="text-xl font-semibold">프로젝트 관리</h2>
            </div>
            <p className="text-gray-600">
              포트폴리오 프로젝트를 등록하고 관리합니다.
            </p>
          </div>
        </Link>

        <Link href="/admin/offers">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <GoNorthStar className="text-seagull-500 text-3xl" />
              <h2 className="text-xl font-semibold">메인페이지 관리</h2>
            </div>
            <p className="text-gray-600">메인페이지 콘텐츠를 관리합니다.</p>
          </div>
        </Link>

        <Link href="/admin/users">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <GoPeople className="text-seagull-500 text-3xl" />
              <h2 className="text-xl font-semibold">회원 관리</h2>
            </div>
            <p className="text-gray-600">회원 정보를 조회하고 관리합니다.</p>
          </div>
        </Link>

        <Link href="/admin/contact">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <GoHeart className="text-seagull-500 text-3xl" />
              <h2 className="text-xl font-semibold">문의/방명록</h2>
            </div>
            <p className="text-gray-600">문의사항과 방명록을 확인합니다.</p>
          </div>
        </Link>

        <Link href="/admin/setting">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <GoTools className="text-seagull-500 text-3xl" />
              <h2 className="text-xl font-semibold">사이트 관리</h2>
            </div>
            <p className="text-gray-600">사이트 설정을 관리합니다.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
