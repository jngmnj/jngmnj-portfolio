import {
  deleteDoc,
  doc,
  FirestoreError,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../firebaseConfig';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updatedAtTimestamp = Timestamp.now();

    const projectUpdate = {
      title,
      description,
      image,
      technologies: technologiesArray,
      githubUrl,
      liveUrl: liveUrl || '',
      category,
      detail: detailObj,
      updatedAt: updatedAtTimestamp,
    };

    const projectRef = doc(db, 'projects', params.id);
    await updateDoc(projectRef, projectUpdate);

    return NextResponse.json({
      id: params.id,
      message: 'Updated successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(error as FirestoreError, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectRef = doc(db, 'projects', params.id);
    await deleteDoc(projectRef);

    return NextResponse.json({
      id: params.id,
      message: 'Deleted successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(error as FirestoreError, { status: 400 });
  }
}
