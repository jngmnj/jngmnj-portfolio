import { getAdminAuth, getAdminDb } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const user = await getAdminAuth().verifySessionCookie(session, true);
    if (!user.admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const snapshot = await getAdminDb().collection('projects').get();
    const projects = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        isPublic: data.isPublic !== false,
        createdAt: data.createdAt instanceof Timestamp
          ? { seconds: data.createdAt.seconds, nanoseconds: data.createdAt.nanoseconds }
          : data.createdAt,
        updatedAt: data.updatedAt instanceof Timestamp
          ? { seconds: data.updatedAt.seconds, nanoseconds: data.updatedAt.nanoseconds }
          : data.updatedAt,
      };
    });
    return NextResponse.json(projects, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
