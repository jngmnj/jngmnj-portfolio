import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as string;
    const technologies = formData.get('technologies') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const liveUrl = formData.get('liveUrl') as string;
    const category = formData.get('category') as string;
    const detail = formData.get('detail') as string;

    let technologiesArray = [];
    if (technologies) {
      try {
        technologiesArray = JSON.parse(technologies);
      } catch (error) {
        console.error('Failed to parse technologies:', error);
      }
    }

    let detailObj = null;
    if (detail) {
      try {
        detailObj = JSON.parse(detail);
      } catch (error) {
        console.error('Failed to parse detail:', error);
      }
    }

    const createdAtTimestamp = Timestamp.now();

    const projectRequest = {
      title,
      description,
      image,
      technologies: technologiesArray,
      githubUrl,
      liveUrl: liveUrl || '',
      category,
      detail: detailObj,
      createdAt: createdAtTimestamp,
    };

    const docRef = await adminDb.collection('projects').add(projectRequest);
    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
