import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../firebaseConfig';

interface UploadImageResult {
  url: string;
  path: string;
}

interface UploadProgress {
  progress: number;
  status: 'uploading' | 'success' | 'error';
}

/**
 * 이미지 파일을 Firebase Storage에 업로드합니다.
 * @param file - 업로드할 파일
 * @param folder - 저장할 폴더 경로 (기본값: 'images')
 * @param onProgress - 업로드 진행률 콜백 함수
 * @returns 업로드된 이미지의 URL과 경로
 */
export async function uploadImage(
  file: File,
  folder: string = 'images',
  onProgress?: (progress: number) => void
): Promise<UploadImageResult> {
  try {
    // 고유한 파일명 생성 (타임스탬프 + 랜덤 문자열)
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 9);
    const extension = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${extension}`;
    const filePath = `${folder}/${fileName}`;

    const fileRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // 진행률 계산
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          console.error('Image upload failed:', error);
          reject(new Error('Image upload failed'));
        },
        async () => {
          // 업로드 완료
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ url, path: filePath });
        }
      );
    });
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('Image upload failed');
  }
}

/**
 * Firebase Storage에서 이미지를 삭제합니다.
 * @param filePath - 삭제할 파일의 경로
 */
export async function deleteImage(filePath: string): Promise<void> {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Image delete failed:', error);
    throw new Error('Image delete failed');
  }
}

/**
 * URL에서 파일 경로를 추출합니다.
 * @param url - Firebase Storage URL
 * @returns 파일 경로
 */
export function getFilePathFromUrl(url: string): string | null {
  try {
    // Firebase Storage URL 형식: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media&token={token}
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(/\/o\/(.+?)(\?|$)/);
    if (pathMatch && pathMatch[1]) {
      return decodeURIComponent(pathMatch[1]);
    }
    return null;
  } catch (error) {
    console.error('Failed to extract file path from URL:', error);
    return null;
  }
}

/**
 * 여러 이미지를 한번에 업로드합니다.
 * @param files - 업로드할 파일 배열
 * @param folder - 저장할 폴더 경로
 * @param onProgress - 전체 진행률 콜백 함수
 * @returns 업로드된 이미지들의 URL과 경로 배열
 */
export async function uploadMultipleImages(
  files: File[],
  folder: string = 'images',
  onProgress?: (progress: number) => void
): Promise<UploadImageResult[]> {
  const totalFiles = files.length;
  let completedFiles = 0;

  const uploadPromises = files.map((file) =>
    uploadImage(file, folder, (fileProgress) => {
      // 각 파일의 진행률을 합산하여 전체 진행률 계산
      const overallProgress =
        ((completedFiles + fileProgress / 100) / totalFiles) * 100;
      if (onProgress) {
        onProgress(overallProgress);
      }
    }).then((result) => {
      completedFiles++;
      return result;
    })
  );

  return Promise.all(uploadPromises);
}

/**
 * Firebase Storage에서 이미지 URL을 가져옵니다.
 * @param filePath - Firebase Storage에 저장된 파일 경로
 * @returns 이미지의 다운로드 URL
 */
export async function getImageUrl(filePath: string): Promise<string> {
  try {
    const fileRef = ref(storage, filePath);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error('Failed to get image URL:', error);
    throw new Error('Failed to get image URL');
  }
}
