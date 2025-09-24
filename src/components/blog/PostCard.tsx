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
  createdAt,
  previewImgUrl: preview_img_url,
}) => {
  const stripHtmlTags = (content: string): string => {
    return content.replace(/<[^>]*>/g, '');
  };
  return (
    <div className="w-full">
      <Link
        href={`/blog/${id}`}
        className="group flex w-full flex-col gap-4 rounded-2xl p-0 transition-all ease-in-out hover:bg-gray-50 hover:p-4 sm:flex-row sm:gap-6 lg:gap-8"
      >
        {/* 텍스트 콘텐츠 */}
        <div className="flex-1">
          {/* 전체리스트일경우 카테고리 표시 */}
          <div className="text-seagull-500 mb-2 text-sm font-semibold">
            {category}
          </div>
          <div className="after:bg-seagull-200 relative mb-4 w-max text-xl font-semibold transition after:absolute after:bottom-0 after:block after:h-4 after:w-0 after:mix-blend-multiply after:transition-all after:duration-500 after:content-[''] group-hover:after:w-full sm:text-2xl">
            {title}
          </div>
          <div className="mb-3 line-clamp-3 text-sm text-gray-500 sm:text-base">
            {content ? stripHtmlTags(content) : ''}
          </div>
          <div className="text-xs text-gray-500">
            {createdAt?.toDate().toLocaleDateString()}
          </div>
        </div>

        {/* 이미지 */}
        <div className="h-48 w-full shrink-0 rounded-2xl border border-gray-100 sm:h-40 sm:w-48 lg:h-48 lg:w-52">
          <Image
            src={
              preview_img_url ? preview_img_url : '/images/common/img_user.png' // 임시 이미지
            }
            width={300}
            height={200}
            alt={title || 'Post thumbnail'}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
