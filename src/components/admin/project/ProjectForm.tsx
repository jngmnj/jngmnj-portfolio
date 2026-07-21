'use client';

import ProjectFormBasicInfo from '@/components/admin/project/ProjectFormBasicInfo';
import ProjectFormCategory from '@/components/admin/project/ProjectFormCategory';
import ProjectFormDetailInfo from '@/components/admin/project/ProjectFormDetailInfo';
import ProjectFormSection from '@/components/admin/project/ProjectFormSection';
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
      titleEn: editingProject?.titleEn || '',
      description: editingProject?.description || '',
      descriptionEn: editingProject?.descriptionEn || '',
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
      formDataToSend.append('titleEn', data.titleEn || '');
      formDataToSend.append('description', data.description || '');
      formDataToSend.append('descriptionEn', data.descriptionEn || '');
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
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <p className="text-seagull-700 mb-2 text-sm font-semibold">
          {editingProject ? '프로젝트 편집' : '새 프로젝트 등록'}
        </p>
        <h2 className="text-2xl font-bold text-gray-950 sm:text-3xl">
          {editingProject ? editingProject.title : '프로젝트 정보를 입력하세요'}
        </h2>
        <p className="mt-2 text-sm leading-6 break-keep text-gray-500">
          <span className="font-semibold text-red-600">필수</span> 항목을 먼저
          입력하고, 영문과 상세 정보는 필요한 만큼 추가할 수 있습니다.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-5">
          <ProjectFormSection
            eyebrow="01 · Basic"
            title="기본 정보"
            description="프로젝트 목록과 카드에 먼저 노출되는 핵심 정보를 입력합니다."
          >
            <ProjectFormBasicInfo />
          </ProjectFormSection>

          <ProjectFormSection
            eyebrow="02 · Classification"
            title="분류와 연결"
            description="대표 기술, 카테고리, 저장소와 서비스 주소를 정리합니다."
          >
            <div className="space-y-6">
              <ProjectFormTechnologies />
              <div className="grid gap-5 lg:grid-cols-2">
                <ProjectFormCategory />
                <ProjectFormUrls />
              </div>
            </div>
          </ProjectFormSection>

          <ProjectFormDetailInfo />

          <div className="sticky bottom-3 z-10 flex flex-col-reverse gap-3 rounded-2xl border border-gray-200 bg-white/95 p-3 backdrop-blur sm:flex-row sm:justify-end sm:p-4">
            <Button
              type="button"
              onClick={onCancel}
              disabled={loading}
              color="linePrimary"
              className="min-h-11 w-full sm:w-auto"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={loading}
              color="secondary"
              className="min-h-11 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-28"
            >
              {loading
                ? editingProject
                  ? '수정 중…'
                  : '등록 중…'
                : editingProject
                  ? '수정'
                  : '등록'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
