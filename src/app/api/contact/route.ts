import {
  addDoc,
  collection,
  FirestoreError,
  Timestamp,
} from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../firebaseConfig';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const company = formData.get('company') as string;
    const email = formData.get('email') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const createdAt = formData.get('createdAt') as string;

    let createdAtTimestamp;
    if (createdAt) {
      createdAtTimestamp = Timestamp.fromDate(new Date(createdAt));
    } else {
      createdAtTimestamp = Timestamp.now();
    }

    const postRequest = {
      name,
      company,
      email,
      title,
      content,
      createdAt: createdAtTimestamp,
    };

    const docRef = await addDoc(collection(db, 'contacts'), postRequest);
    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(error as FirestoreError, { status: 400 });
  }
}
