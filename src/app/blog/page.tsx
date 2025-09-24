'use client';

import PostList from '@/components/blog/PostList';

export default function BlogPage() {
  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Blog</h1>
        <p className="mt-2 text-gray-600">
          개발 과정에서 배운 것들과 경험을 공유합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        {/* 메인 콘텐츠 영역 */}
        <div className="lg:col-span-2">
          <PostList />
        </div>

        {/* 사이드바 영역 */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* 태그 섹션 */}
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">태그</h3>
                <span className="text-sm text-gray-500">더보기</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                  React
                </span>
                <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                  Next.js
                </span>
                <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                  TypeScript
                </span>
                <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                  JavaScript
                </span>
                <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                  CSS
                </span>
                <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                  Web
                </span>
              </div>
            </div>

            {/* 최근 포스트 섹션 */}
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4 text-lg font-semibold">최근 포스트</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 rounded bg-gray-200"></div>
                  <div className="flex flex-col justify-center">
                    <h4 className="line-clamp-2 text-sm font-medium">
                      React 18의 새로운 기능들
                    </h4>
                    <p className="text-xs text-gray-500">2024.01.15</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 rounded bg-gray-200"></div>
                  <div className="flex flex-col justify-center">
                    <h4 className="line-clamp-2 text-sm font-medium">
                      Next.js 14 App Router 완벽 가이드
                    </h4>
                    <p className="text-xs text-gray-500">2024.01.10</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 rounded bg-gray-200"></div>
                  <div className="flex flex-col justify-center">
                    <h4 className="line-clamp-2 text-sm font-medium">
                      TypeScript 타입 시스템 이해하기
                    </h4>
                    <p className="text-xs text-gray-500">2024.01.05</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
