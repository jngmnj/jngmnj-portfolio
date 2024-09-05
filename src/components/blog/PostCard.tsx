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
      <Link href={`/blog/${id}`}>
        <div className="category">개발</div>
        <div className="title">MySQL 콜레이션 사용 시 주의할 점은?</div>
        <div className="content">
          지난 글에서는 전반적인 개요와 함께 MySQL 8.0에 새롭게 추가된
          콜레이션들을 위주로 어떻게 동작하는지, 동작 방식과 설정하기 등을
          살펴봤는데요. 이번 글에서는 MySQL의 콜레이션 사용 시 주의해야 할 점에
          대
        </div>
        <div className="date">2021.10.10</div>
      </Link>
    </div>
  );
};

export default PostCard;
