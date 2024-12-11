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
      <div className="">
        <div className="border">
          <h1>{title}</h1>
          <p>{category}</p>
          <p>{tags}</p>
          {/* <p>createdAt?.toDate().toLocaleDateString()}</p>*/}
          <p>
            {createdAt
              ? createdAt.toDate().toLocaleDateString()
              : 'No date available'}
          </p>
          <p>{content}</p>

          {previewImgUrl && (
            <Image src={previewImgUrl} alt="preview" width={800} height={400} />
          )}
        </div>
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
      // createdAt: createdAt ? createdAt.toDate().toISOString() : null,
      createdAt: createdAt || null,
      previewImgUrl: previewImgUrl || null,
    },
  };
};
