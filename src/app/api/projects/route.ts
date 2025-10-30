import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '../../../../firebaseConfig';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
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
