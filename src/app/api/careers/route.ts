import { Career, defaultCareers, isCareerList } from '@/data/careers';
import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const doc = await getAdminDb()
      .collection('siteContent')
      .doc('careers')
      .get();
    const careers = doc.exists ? doc.data()?.careers : defaultCareers;
    if (!isCareerList(careers)) throw new Error('Invalid stored careers');
    return NextResponse.json(
      { careers },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json(
      { error: '경력을 불러오지 못했습니다.' },
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
  if (!isCareerList(body?.careers))
    return NextResponse.json(
      { error: '회사명, 직무와 날짜(YYYY.MM)를 확인해주세요.' },
      { status: 400 }
    );
  const careers = body.careers.map((item: Career) => ({
    id: item.id,
    company: item.company.trim(),
    companyEn: item.companyEn.trim(),
    title: item.title.trim(),
    titleEn: item.titleEn.trim(),
    startDate: item.startDate,
    endDate: item.endDate,
  }));
  try {
    await getAdminDb()
      .collection('siteContent')
      .doc('careers')
      .set({ careers });
    return NextResponse.json({ careers });
  } catch {
    return NextResponse.json(
      { error: '저장하지 못했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
