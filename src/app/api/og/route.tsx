import { renderOgImage } from '@/app/lib/og-image';
import { getOgPageCopy, type OgPage } from '@/app/lib/og-metadata';
import { getPostOgData } from '@/app/lib/post-og';
import { getProjectOgData } from '@/app/lib/project-og';

export const runtime = 'nodejs';

const pages = new Set<OgPage>([
  'home',
  'about',
  'projects',
  'project',
  'blog',
  'post',
  'contact',
  'login',
  'register',
  'mypage',
  'admin',
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'ko';
  const requestedPage = searchParams.get('page') as OgPage | null;
  const page =
    requestedPage && pages.has(requestedPage) ? requestedPage : 'home';
  const defaultCopy = getOgPageCopy(lang, page);

  const projectId = searchParams.get('projectId');
  const postId = searchParams.get('postId');
  const project =
    page === 'project' && projectId
      ? await getProjectOgData(projectId, lang)
      : null;
  const post = page === 'post' && postId ? await getPostOgData(postId) : null;

  return renderOgImage(
    {
      ...defaultCopy,
      title: project?.title ?? post?.title ?? defaultCopy.title,
      description:
        project?.description || post?.description || defaultCopy.description,
    },
    lang
  );
}
