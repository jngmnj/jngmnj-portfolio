import { Timestamp } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebaseAdmin';

function parseJsonField<T>(value: string, fallback: T, fieldName: string): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error(`Invalid ${fieldName}`);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const titleEn = formData.get('titleEn') as string;
    const description = formData.get('description') as string;
    const descriptionEn = formData.get('descriptionEn') as string;
    const image = formData.get('image') as string;
    const technologies = formData.get('technologies') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const liveUrl = formData.get('liveUrl') as string;
    const category = formData.get('category') as string;
    const detail = formData.get('detail') as string;

    const technologiesArray = parseJsonField<string[]>(
      technologies,
      [],
      'technologies'
    );
    const detailObj = parseJsonField<Record<string, unknown> | null>(
      detail,
      null,
      'detail'
    );

    const updatedAtTimestamp = Timestamp.now();

    const projectUpdate = {
      title,
      titleEn: titleEn || '',
      description,
      descriptionEn: descriptionEn || '',
      image,
      technologies: technologiesArray,
      githubUrl,
      liveUrl: liveUrl || '',
      category,
      detail: detailObj,
      updatedAt: updatedAtTimestamp,
    };

    await adminDb.collection('projects').doc(id).update(projectUpdate);

    return NextResponse.json({
      id,
      message: 'Updated successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error && error.message.startsWith('Invalid ')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await adminDb.collection('projects').doc(id).delete();

    return NextResponse.json({
      id,
      message: 'Deleted successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
