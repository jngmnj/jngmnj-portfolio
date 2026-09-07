'use client';

import ProjectFormImageUpload from '@/components/admin/project/ProjectFormImageUpload';
import FormField from '@/components/admin/project/FormField';
import FormTextarea from '@/components/admin/project/FormTextarea';

export default function ProjectFormBasicInfo() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <FormField
          name="title"
          label="프로젝트 제목"
          required
          placeholder="프로젝트 제목을 입력하세요"
        />
        <FormField
          name="titleEn"
          label="프로젝트 제목"
          optional
          language="en"
          placeholder="English project title"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <FormTextarea
          name="description"
          label="요약 설명"
          required
          rows={5}
          placeholder="목록과 카드에 표시할 프로젝트 설명을 입력하세요"
        />
        <FormTextarea
          name="descriptionEn"
          label="요약 설명"
          optional
          language="en"
          rows={5}
          placeholder="English project description"
        />
      </div>

      <ProjectFormImageUpload
        label="대표 이미지"
        fieldPath="image"
        required
        multiple={false}
      />
    </div>
  );
}
