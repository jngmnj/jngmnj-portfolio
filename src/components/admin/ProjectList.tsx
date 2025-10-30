'use client';

import { FirebaseProject } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProjectListProps {
  onEdit: (project: FirebaseProject) => void;
}

export default function ProjectList({ onEdit }: ProjectListProps) {
  const [projects, setProjects] = useState<FirebaseProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string, projectTitle: string) => {
    if (!confirm(`"${projectTitle}" 프로젝트를 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('프로젝트가 삭제되었습니다.');
        fetchProjects(); // 목록 새로고침
      } else {
        alert('프로젝트 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('프로젝트 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center shadow">
        <p className="text-gray-500">등록된 프로젝트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-center gap-4 rounded-lg bg-white p-4 shadow"
        >
          <div className="relative h-20 w-20 overflow-hidden rounded-lg">
            <Image
              src={project.image || '/images/common/img_user.png'}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies?.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="bg-seagull-500 hover:bg-seagull-600 rounded-lg px-4 py-2 text-white transition"
            >
              수정
            </button>
            <button
              onClick={() =>
                project.id && handleDelete(project.id, project.title)
              }
              className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
