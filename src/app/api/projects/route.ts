import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../lib/firebaseAdmin';

export async function GET() {
  try {
    const querySnapshot = await getAdminDb().collection('projects').get();
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
