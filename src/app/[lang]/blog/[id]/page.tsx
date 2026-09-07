import { createPageMetadata } from '@/app/lib/og-metadata';
import { getPostOgData } from '@/app/lib/post-og';
import BlogDetailClient from './BlogDetailClient';

type PostProps = {
  params: Promise<{ lang: string; id: string }>;
};

export async function generateMetadata({ params }: PostProps) {
  const { lang, id } = await params;
  const post = await getPostOgData(id);

  return createPageMetadata({
    lang,
    page: 'post',
    path: `/blog/${id}`,
    title: post?.title,
    description: post?.description,
    imageParams: { postId: id },
  });
}

export default async function BlogDetailPage({ params }: PostProps) {
  const { id } = await params;
  return <BlogDetailClient key={id} params={params} />;
}
