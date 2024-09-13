import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type PostCardProps = {
  id: string;
  title: string;
  category: string;
  content: string;
  created_at: string;
  preview_img_url: string;
};
const PostCard: FC<PostCardProps> = ({
  id,
  title,
  category,
  content,
  created_at,
  preview_img_url,
}) => {
  return (
    <div>
      <Link
        href={`/blog/${id}`}
        className="group flex w-full gap-8 rounded-2xl p-0 transition-all ease-in-out hover:bg-gray-50 hover:p-4"
      >
        <div>
          {/* 전체리스트일경우 카테고리 표시 */}
          <div className="font-semibold text-seagull-500">개발</div>
          <div className="relative mb-4 w-max text-2xl font-semibold transition after:absolute after:bottom-0 after:block after:h-4 after:w-0 after:bg-seagull-200 after:mix-blend-multiply after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full">
            MySQL 콜레이션 사용 시 주의할 점은?
          </div>
          <div className="mb-2 line-clamp-3 text-base text-gray-500">
            지난 글에서는 전반적인 개요와 함께 MySQL 8.0에 새롭게 추가된
            콜레이션들을 위주로 어떻게 동작하는지, 동작 방식과 설정하기 등을
            살펴봤는데요. 이번 글에서는 MySQL의 콜레이션 사용 시 주의해야 할
            점에 대해 알아보겠습니다. MySQL의 콜레이션은 데이터베이스의 문자
            데이터를 비교하거나 정렬할 때 사용되는 규칙을 정의하는데요.
            콜레이션은 데이터베이스, 테이블, 열 또는 심지어 쿼리에 대해
          </div>
          <div className="text-xs text-gray-500">2021년 10월 10일</div>
        </div>
        <div className="size-[200px] shrink-0 rounded-2xl border border-gray-100">
          <Image
            src="/images/about/img_temp.png"
            width={300}
            height={200}
            alt={''}
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
