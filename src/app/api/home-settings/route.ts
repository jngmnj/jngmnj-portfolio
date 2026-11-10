import { isHomeSettings } from '@/data/homeSettings';
import { getHomeSettings } from '@/app/lib/getHomeSettings';
import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    return NextResponse.json(
      { settings: await getHomeSettings() },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json(
      { error: '메인 설정을 불러오지 못했습니다.' },
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
  const settings: unknown = body?.settings;
  if (!isHomeSettings(settings))
    return NextResponse.json(
      { error: '최소 한 섹션과 대표 프로젝트 설정을 확인해주세요.' },
      { status: 400 }
    );
  try {
    await getAdminDb().collection('siteContent').doc('home').set({ settings });
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json(
      { error: '저장하지 못했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
