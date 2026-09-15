import { FirebaseProject } from '@/types';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

export default async function getProjects(): Promise<FirebaseProject[]> {
  const querySnapshot = await getDocs(collection(db, 'projects'));
  const projects = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Timestamp를 일반 객체로 변환 (서버 -> 클라이언트 전달을 위해)
      createdAt:
        data.createdAt instanceof Timestamp
          ? {
              seconds: data.createdAt.seconds,
              nanoseconds: data.createdAt.nanoseconds,
            }
          : data.createdAt,
      updatedAt:
        data.updatedAt instanceof Timestamp
          ? {
              seconds: data.updatedAt.seconds,
              nanoseconds: data.updatedAt.nanoseconds,
            }
          : data.updatedAt,
    } as FirebaseProject;
  });

  return projects;
}
