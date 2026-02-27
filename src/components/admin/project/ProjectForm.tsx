'use client';

import ProjectFormBasicInfo from '@/components/admin/project/ProjectFormBasicInfo';
import ProjectFormCategory from '@/components/admin/project/ProjectFormCategory';
import ProjectFormDetailInfo from '@/components/admin/project/ProjectFormDetailInfo';
import ProjectFormTechnologies from '@/components/admin/project/ProjectFormTechnologies';
import ProjectFormUrls from '@/components/admin/project/ProjectFormUrls';
import Button from '@/components/common/Button';
import { FirebaseProject } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface ProjectFormProps {
  editingProject?: FirebaseProject | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ProjectForm({
  editingProject,
  onCancel,
  onSuccess,
}: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      title: editingProject?.title || '',
      description: editingProject?.description || '',
      image: editingProject?.image || '',
      technologies: editingProject?.technologies || [],
      githubUrl: editingProject?.githubUrl || '',
      liveUrl: editingProject?.liveUrl || '',
      category: editingProject?.category || 'Web Development',
      // Detail fields
      detail: editingProject?.detail || {
        overview: '',
        features: [],
        images: [],
        techStack: {},
        timeline: {
          startDate: '',
          endDate: '',
          duration: '',
        },
        team: {
          size: 1,
          role: '',
          responsibilities: [],
        },
        contributions: [],
        challenges: [],
        results: [],
      },
    },
  });

  const { handleSubmit: handleFormSubmit } = methods;

  const onSubmit = async (data: Partial<FirebaseProject>) => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', data.title || '');
      formDataToSend.append('description', data.description || '');
      formDataToSend.append('image', data.image || '');
      formDataToSend.append(
        'technologies',
        JSON.stringify(data.technologies || [])
      );
      formDataToSend.append('githubUrl', data.githubUrl || '');
      formDataToSend.append('liveUrl', data.liveUrl || '');
      formDataToSend.append('category', data.category || '');
      formDataToSend.append('detail', JSON.stringify(data.detail || {}));

      // 수정 모드일 때는 PUT, 생성 모드일 때는 POST
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : '/api/projects/create';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        onSuccess();
        router.refresh();
      } else {
        alert(
          editingProject
            ? '프로젝트 수정에 실패했습니다.'
            : '프로젝트 등록에 실패했습니다.'
        );
      }
    } catch {
      alert(
        editingProject
          ? '프로젝트 수정 중 오류가 발생했습니다.'
          : '프로젝트 등록 중 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        {editingProject ? '프로젝트 수정' : '새 프로젝트'}
      </h2>

      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-4">
          <ProjectFormBasicInfo />

          <ProjectFormTechnologies />

          <ProjectFormUrls />

          <ProjectFormCategory />

          <ProjectFormDetailInfo />

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading
                ? editingProject
                  ? '수정 중...'
                  : '등록 중...'
                : editingProject
                  ? '수정'
                  : '등록'}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="w-full bg-gray-500 hover:bg-gray-600 sm:w-auto"
            >
              취소
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
