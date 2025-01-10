import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebaseConfig';

interface UploadImageResult {
  url: string;
}

export async function uploadImage(file: File): Promise<UploadImageResult> {
  try {
    const fileRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { url }; // 업로드된 이미지의 URL 반환
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('Image upload failed');
  }
}
