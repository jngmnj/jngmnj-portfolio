import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

// type PostCardProps = {
//   id: string;
//   title?: string;
//   category?: string;
//   content?: string;
//   created_at?: string;
//   preview_img_url?: string;
// };

type PostCardProps = Partial<Post>;

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
          <div className="font-semibold text-seagull-500">{category}</div>
          <div className="relative mb-4 w-max text-2xl font-semibold transition after:absolute after:bottom-0 after:block after:h-4 after:w-0 after:bg-seagull-200 after:mix-blend-multiply after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full">
            {title}
          </div>
          <div className="mb-2 line-clamp-3 text-base text-gray-500">
            {content}
          </div>
          <div className="text-xs text-gray-500">{created_at}</div>
        </div>
        <div className="size-[200px] shrink-0 rounded-2xl border border-gray-100">
          <Image
            src={
              preview_img_url ? preview_img_url : '/images/common/img_user.png' // 임시 이미지
            }
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
