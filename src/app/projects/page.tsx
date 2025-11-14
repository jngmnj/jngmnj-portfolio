import ProjectsSkeleton from '@/components/projects/ProjectsSkeleton';
import { FirebaseProject } from '@/types';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { Suspense } from 'react';
import { db } from '../../../firebaseConfig';
import ProjectsContent from './ProjectsContent';

async function getProjects() {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Timestamp를 일반 객체로 변환 (서버 -> 클라이언트 전달을 위해)
        createdAt: data.createdAt instanceof Timestamp
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
      };
    });

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="content container flex flex-col">
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          Projects
        </h1>
        <p className="text-lg text-gray-600 md:text-xl">
          프로젝트들과 개발과정을 소개합니다.
        </p>
      </div>

      {/* Projects Grid */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent initialProjects={projects} />
      </Suspense>
    </div>
  );
}
