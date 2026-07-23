import { getOgPageCopy, type OgPage } from '@/app/lib/og-metadata';
import { getProjectOgData } from '@/app/lib/project-og';
import { ImageResponse } from 'next/og';

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

function truncate(value: string, maxLength: number) {
  return value.length > maxLength
    ? `${value.slice(0, maxLength).trimEnd()}…`
    : value;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'ko';
  const requestedPage = searchParams.get('page') as OgPage | null;
  const page =
    requestedPage && pages.has(requestedPage) ? requestedPage : 'home';
  const defaultCopy = getOgPageCopy(lang, page);
  const projectId = searchParams.get('projectId');
  const project =
    page === 'project' && projectId
      ? await getProjectOgData(projectId, lang)
      : null;
  const copy = {
    ...defaultCopy,
    title: truncate(project?.title ?? defaultCopy.title, 52),
    description: truncate(
      project?.description || defaultCopy.description,
      lang === 'ko' ? 110 : 150
    ),
  };
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f6f8fb',
          color: '#172033',
          padding: '72px 84px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 99,
              background: '#21a7c7',
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: '#387186',
            }}
          >
            {copy.label}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.16,
              letterSpacing: '-0.035em',
            }}
          >
            {copy.title}
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 450,
              lineHeight: 1.45,
              color: '#5a6577',
            }}
          >
            {copy.description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 650 }}>JUNGMIN JI</div>
          <div style={{ fontSize: 24, color: '#758094' }}>jngmnj.dev</div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: -110,
            top: -130,
            width: 390,
            height: 390,
            borderRadius: 999,
            background: '#dff4f8',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 110,
            bottom: 92,
            width: 112,
            height: 112,
            borderRadius: 32,
            border: '18px solid #c7eaf1',
            transform: 'rotate(18deg)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control':
          'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  );
}
