'use client';

import { MarkdownViewer } from '@/components/blog/Markdown';
import Button from '@/components/common/Button';
import { LINKS } from '@/app/lib/constants';
import { Post } from '@/types';
import { useLocale } from '@/utils/useLocale';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../../../../../firebaseConfig';

type PostProps = {
  params: Promise<{ lang: string; id: string }>;
};

type PostData = Partial<Post> & {
  createdAt: string | null;
};

export default function BlogDetailPage({ params }: PostProps) {
  const router = useRouter();
  const lang = useLocale();
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then(({ id: paramId }) => {
      setId(paramId);
    });
  }, [params]);

  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          router.push(`/${lang}/404`);
          return;
        }

        const data = docSnap.data();
        const {
          createdAt,
          previewImgUrl,
          updatedAt: _updatedAt,
          ...restData
        } = data;

        setPostData({
          id,
          ...restData,
          createdAt: createdAt.toDate().toISOString(),
          previewImgUrl: previewImgUrl || null,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching post:', error);
        router.push(`/${lang}/404`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, lang, router]);

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
  const blogBase = `/${lang}${LINKS.blog}`;

  return (
    <div className="narrow container">
      <div className="">
        <div className="">
          <p>
            <Link
              href={`${blogBase}/category/${category}`}
              className="text-seagull-500 text-base font-semibold"
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
              onClick={() => router.push(`${blogBase}/edit/${id}`)}
            >
              수정
            </Button>
            <Button color="linePrimary" size="small">
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
                  href={`/${lang}${LINKS.tag}/${encodeURIComponent(tag)}`}
                  className="rounded-lg bg-gray-100 px-2 py-1 text-sm transition hover:bg-gray-200"
                >
                  # {tag}
                </Link>
              ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              type="submit"
              color="primary"
              size="large"
              href={`/${lang}/blog`}
            >
              목록으로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
