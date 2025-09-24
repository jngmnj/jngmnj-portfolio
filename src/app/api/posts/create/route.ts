import {
  addDoc,
  collection,
  FirestoreError,
  Timestamp,
} from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../firebaseConfig';

export async function POST(request: NextRequest) {
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
