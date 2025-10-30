import { deleteImage, uploadImage } from '@/utils/imageUpload';
import { NextRequest, NextResponse } from 'next/server';

// 허용된 파일 타입
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// 최대 파일 크기 (100MB)
const MAX_FILE_SIZE = 100 * 1024 * 1024;

/**
 * POST: 이미지 업로드
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'images';

    // 파일 검증
    if (!file) {
      return NextResponse.json(
        { error: '파일이 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 파일 타입 검증
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `지원하지 않는 파일 형식입니다. (허용: ${ALLOWED_TYPES.join(', ')})`,
        },
        { status: 400 }
      );
    }

    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '파일 크기는 100MB를 초과할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 이미지 업로드
    const result = await uploadImage(file, folder);

    return NextResponse.json(
      {
        url: result.url,
        path: result.path,
        message: '이미지가 성공적으로 업로드되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : '이미지 업로드 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE: 이미지 삭제
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: '파일명이 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 이미지 삭제
    await deleteImage(filename);

    return NextResponse.json(
      { message: '이미지가 성공적으로 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Image delete error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : '이미지 삭제 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}

