import { Post } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { db } from '../../../firebase';

type PostProps = Partial<Post>;

const PostView = ({
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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = query;
  const docRef = doc(db, 'posts', id as string);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return { notFound: true };

  const data = docSnap.data();
  const { title, tags, category, content, createdAt, previewImgUrl } = data;

  return {
    props: {
      title,
      category,
      tags,
      content,
      createdAt: createdAt ? createdAt.toDate().toISOString() : null,
      previewImgUrl: previewImgUrl || null,
    },
  };
};
