import { MarkdownViewer } from '@/components/blog/Markdown';
import Button from '@/components/common/Button';
import { Post } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '../../../../firebase';

type PostProps = Partial<Post> & {
  createdAt: string | null;
};

const PostEdit = ({
  id,
  title,
  authorName,
  category,
  tags,
  content,
  createdAt,
  previewImgUrl,
}: PostProps) => {
  const created = createdAt ? new Date(createdAt) : null;
  const router = useRouter();

  const handleUpdatePost = (postId: string) => {
    router.push(`/blog/edit/${postId}`);
  };

  return (
    <div className="narrow container">
      <div className="">
        <div className="">
          <p>
            <Link
              href={`/blog/category/`}
              className="text-base font-semibold text-seagull-500"
            >
              {category}
            </Link>
          </p>
          <h1 className="mb-3 text-3xl font-medium">{title}</h1>
          <div className="mb-8 flex gap-4">
            <div>{authorName}</div>
            <div>{created!.toLocaleDateString()}</div>
            <Button
              color="primary"
              size="small"
              onClick={handleUpdatePost(`${id}`)}
            >
              수정
            </Button>
            <Button
              color="primary"
              size="small"
              onClick={handleDeletePost(`${id}`)}
            >
              삭제
            </Button>
          </div>
          <div className="mb-8">
            {previewImgUrl && (
              <Image
                src={previewImgUrl}
                alt="preview"
                width={800}
                height={400}
              />
            )}
            {/* <p>{parse(content!)}</p> */}
            <MarkdownViewer source={content!} />
          </div>
          <div className="flex gap-2">
            {tags &&
              tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/tags/${tag}`}
                  className="rounded-lg bg-gray-100 px-2 py-1 text-sm transition hover:bg-gray-200"
                >
                  # {tag}
                </Link>
              ))}
          </div>
          <div className="mt-12 text-center">
            <Button type="submit" color="primary" size="large" href="/blog">
              목록으로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = query;
  const docRef = doc(db, 'posts', id as string);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return { notFound: true };

  const data = docSnap.data();
  const { createdAt, previewImgUrl, updatedAt, ...restData } = data;

  return {
    props: {
      ...restData,
      createdAt: createdAt.toDate().toISOString(),
      previewImgUrl: previewImgUrl || null,
    },
  };
};