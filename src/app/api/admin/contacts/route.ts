import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'private, no-store' };

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session)
    return NextResponse.json(
      { error: '로그인이 필요합니다.' },
      { status: 401, headers }
    );
  try {
    const user = await getAdminAuth().verifySessionCookie(session, true);
    if (!user.admin)
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403, headers }
      );
  } catch {
    return NextResponse.json(
      { error: '다시 로그인해주세요.' },
      { status: 401, headers }
    );
  }
  const cursor = request.nextUrl.searchParams.get('cursor');
  if (cursor && !/^[a-zA-Z0-9_-]{1,150}$/.test(cursor))
    return NextResponse.json(
      { error: '잘못된 페이지 요청입니다.' },
      { status: 400, headers }
    );
  try {
    const collection = getAdminDb().collection('contacts');
    let query = collection.orderBy('createdAt', 'desc').limit(26);
    if (cursor) {
      const last = await collection.doc(cursor).get();
      if (!last.exists)
        return NextResponse.json(
          { error: '목록을 새로고침해주세요.' },
          { status: 400, headers }
        );
      query = query.startAfter(last);
    }
    const snapshot = await query.get();
    const docs = snapshot.docs.slice(0, 25);
    const contacts = docs.map((doc) => {
      const data = doc.data();
      const string = (value: unknown) =>
        typeof value === 'string' ? value : '';
      return {
        id: doc.id,
        name: string(data.name),
        company: string(data.company),
        email: string(data.email),
        title: string(data.title),
        content: string(data.content),
        createdAt:
          typeof data.createdAt?.toDate === 'function'
            ? data.createdAt.toDate().toISOString()
            : null,
      };
    });
    return NextResponse.json(
      {
        contacts,
        nextCursor: snapshot.docs.length > 25 ? docs[docs.length - 1].id : null,
      },
      { headers }
    );
  } catch {
    return NextResponse.json(
      { error: '문의를 불러오지 못했습니다. 다시 시도해주세요.' },
      { status: 503, headers }
    );
  }
}
