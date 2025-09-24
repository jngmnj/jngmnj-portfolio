'use client';

import { MarkdownViewer } from '@/components/blog/Markdown';
import Button from '@/components/common/Button';
import { Post } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../../../../firebaseConfig';

type PostProps = {
  params: Promise<{
    id: string;
  }>;
};

type PostData = Partial<Post> & {
  createdAt: string | null;
};

export default function BlogDetailPage({ params }: PostProps) {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then(({ id: paramId }) => {
      setId(paramId);
    });
  }, [params]);
  const router = useRouter();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          router.push('/404');
          return;
        }

        const data = docSnap.data();
        const { createdAt, previewImgUrl, updatedAt, ...restData } = data;

        setPostData({
          id,
          ...restData,
          createdAt: createdAt.toDate().toISOString(),
          previewImgUrl: previewImgUrl || null,
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!postData) {
    return <div>Post not found</div>;
  }

  const {
    title,
    authorName,
    category,
    tags,
    content,
    createdAt,
    previewImgUrl,
  } = postData;

  const created = createdAt ? new Date(createdAt) : null;

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
          <div className="mb-8 flex gap-2">
            <div>{authorName}</div>
            <div>{created!.toLocaleDateString()}</div>
            <Button
              color="linePrimary"
              size="small"
              onClick={() => router.push(`/blog/edit/${id}`)}
            >
              수정
            </Button>
            <Button
              color="linePrimary"
              size="small"
              // onClick={() => handleDeletePost(id as string)}
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
            <MarkdownViewer source={content!} />
          </div>
          <div className="flex gap-2">
            {tags &&
              tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/tags/${tag}`}
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
}
