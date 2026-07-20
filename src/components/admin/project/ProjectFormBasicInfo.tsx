'use client';

import ProjectFormImageUpload from '@/components/admin/project/ProjectFormImageUpload';
import Input from '@/components/common/Input';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormBasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">
          제목 <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          {...register('title', { required: '제목을 입력해주세요.' })}
          placeholder="프로젝트 제목을 입력하세요"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">
            {String(errors.title?.message)}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">영문 제목</label>
        <Input
          type="text"
          {...register('titleEn')}
          placeholder="English project title"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          설명 <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('description', { required: '설명을 입력해주세요.' })}
          rows={4}
          className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {String(errors.description?.message)}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">영문 설명</label>
        <textarea
          {...register('descriptionEn')}
          rows={4}
          className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          placeholder="English project description"
        />
      </div>

      <ProjectFormImageUpload
        label="썸네일 이미지"
        fieldPath="image"
        required
        multiple={false}
      />
    </div>
  );
}
