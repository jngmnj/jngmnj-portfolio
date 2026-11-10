import { isCareerList } from '@/data/careers';
import { defaultAboutContent, isAboutContent } from '@/data/aboutContent';
import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const collection = getAdminDb().collection('siteContent');
    const doc = await collection.doc('about').get();
    const content = doc.exists
      ? doc.data()?.content
      : structuredClone(defaultAboutContent);
    if (!doc.exists) {
      const legacy = await collection.doc('careers').get();
      if (legacy.exists) {
        const careers = legacy.data()?.careers;
        if (!isCareerList(careers)) throw new Error('Invalid careers');
        for (const locale of ['ko', 'en'] as const) {
          content[locale][0].content = careers.map((career) => ({
            startDate: career.startDate,
            endDate:
              career.endDate || (locale === 'en' ? 'Present' : '재직 중'),
            title:
              locale === 'en' ? career.titleEn || career.title : career.title,
            list: [
              locale === 'en'
                ? career.companyEn || career.company
                : career.company,
            ],
          }));
        }
      }
    }
    if (!isAboutContent(content)) throw new Error('Invalid about content');
    return NextResponse.json(
      { content },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json(
      { error: '소개 정보를 불러오지 못했습니다.' },
      { status: 503 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const cookie = request.cookies.get('admin_session')?.value;
  if (!cookie)
    return NextResponse.json(
      { error: '로그인이 필요합니다.' },
      { status: 401 }
    );
  try {
    const user = await getAdminAuth().verifySessionCookie(cookie, true);
    if (!user.admin)
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
  } catch {
    return NextResponse.json(
      { error: '다시 로그인해주세요.' },
      { status: 401 }
    );
  }
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin)
    return NextResponse.json(
      { error: '허용되지 않은 요청입니다.' },
      { status: 403 }
    );
  const body = await request.json().catch(() => null);
  const content: unknown = body?.content;
  if (!isAboutContent(content))
    return NextResponse.json(
      { error: '각 탭의 필수 항목과 아이콘을 확인해주세요.' },
      { status: 400 }
    );
  try {
    await getAdminDb().collection('siteContent').doc('about').set({ content });
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json(
      { error: '저장하지 못했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
