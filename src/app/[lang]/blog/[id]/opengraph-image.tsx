import { renderOgImage } from '@/app/lib/og-image';
import { getOgPageCopy } from '@/app/lib/og-metadata';
import { getPostOgData } from '@/app/lib/post-og';

export const alt = 'Article by Jungmin Ji';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const fallback = getOgPageCopy(lang, 'post');
  const post = await getPostOgData(id);

  return renderOgImage(
    {
      ...fallback,
      title: post?.title ?? fallback.title,
      description: post?.description || fallback.description,
    },
    lang
  );
}
