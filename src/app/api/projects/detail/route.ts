import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id || id.includes('/')) {
    return NextResponse.json({ error: 'Invalid project id' }, { status: 400 });
  }
  try {
    const snapshot = await getDoc(doc(db, 'projects', id));
    if (!snapshot.exists() || snapshot.data().isPublic === false) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(
      { ...snapshot.data(), id: snapshot.id },
      {
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
