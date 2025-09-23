'use client';

import PostList from '@/components/blog/PostList';

export default function BlogPage() {
  return (
    <div className="container grid grid-cols-3 gap-10">
      <div className="col-span-2">
        <PostList />
      </div>
      <div className="">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="text-xl font-semibold">카테고리</div>
            <div className="text-sm text-gray-500">더보기</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xl font-semibold">태그</div>
            <div className="text-sm text-gray-500">더보기</div>
          </div>
        </div>
      </div>
    </div>
  );
}
