'use client';

import Input from '@/components/common/Input';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormUrls() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span>GitHub URL</span>
          <span className="text-xs font-medium text-red-600">필수</span>
        </label>
        <Input
          type="url"
          {...register('githubUrl', {
            required: 'GitHub URL을 입력해주세요.',
          })}
          placeholder="https://github.com/..."
          className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
          aria-invalid={Boolean(errors.githubUrl)}
        />
        {errors.githubUrl && (
          <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
            {String(errors.githubUrl?.message)}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span>Live URL</span>
          <span className="text-xs font-medium text-gray-400">선택</span>
        </label>
        <Input
          type="url"
          {...register('liveUrl')}
          placeholder="https://..."
          className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
        />
      </div>
    </div>
  );
}
