import { renderOgImage } from '@/app/lib/og-image';
import { getOgPageCopy } from '@/app/lib/og-metadata';
import { getProjectOgData } from '@/app/lib/project-og';

export const alt = 'Project by Jungmin Ji';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const fallback = getOgPageCopy(lang, 'project');
  const project = await getProjectOgData(id, lang);

  return renderOgImage(
    {
      ...fallback,
      title: project?.title ?? fallback.title,
      description: project?.description || fallback.description,
    },
    lang
  );
}
