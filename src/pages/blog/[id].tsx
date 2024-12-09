import { Post } from '@/types';
import Image from 'next/image';

type PostProps = Partial<Post>;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const allPostsData = await res.json();

  const paths = allPostsData.map((post: Post) => ({
    params: {
      id: post.id,
    },
  }));

  return {
    paths: [],
    fallback: false, // fallback: false로 설정하면 존재하지 않는 페이지는 404 페이지로 이동, true로 설정하면 getStaticProps에서 데이터를 불러옴
  };
}

const PostView = ({
  id,
  title,
  category,
  tags,
  content,
  createdAt,
  previewImgUrl,
}: PostProps) => {
  return (
    <div className="container">
      <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-4 lg:grid-rows-1">
        <div className="col-span-3 border lg:col-span-2">
          <Image
            src={previewImgUrl || '/images/common/img_user.png'}
            alt="preview"
            width={800}
            height={400}
          />
        </div>
        <div className="col-span-3 border lg:col-span-1">dd</div>
      </div>
    </div>
  );
};

export default PostView;
