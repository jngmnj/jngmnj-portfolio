import {
  addDoc,
  collection,
  FirestoreError,
  Timestamp,
} from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { INTERNAL_BLOG_ENABLED } from '@/constants/features';
import { db } from '../../../../../firebaseConfig';

export async function POST(request: NextRequest) {
  if (!INTERNAL_BLOG_ENABLED) {
    return NextResponse.json(
      { error: 'Internal blog publishing is temporarily disabled.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;
    const tags = formData.get('tags') as string;
    const createdAt = formData.get('createdAt') as string;
    const isPublished = formData.get('isPublished') as string;
    const authorId = formData.get('authorId') as string;

    let tagsArray = [];
    if (tags) {
      try {
        tagsArray = JSON.parse(tags);
      } catch (error) {
        console.error('Failed to parse tags:', error);
      }
    }

    let createdAtTimestamp;
    if (createdAt) {
      createdAtTimestamp = Timestamp.fromDate(new Date(createdAt));
    } else {
      createdAtTimestamp = Timestamp.now();
    }

    const postRequest = {
      title,
      category,
      tags: tagsArray,
      content,
      createdAt: createdAtTimestamp,
      isPublished,
      authorId,
    };

    const docRef = await addDoc(collection(db, 'posts'), postRequest);
    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(error as FirestoreError, { status: 400 });
  }
}
