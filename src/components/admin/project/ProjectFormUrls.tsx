'use client';

import Input from '@/components/common/Input';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormUrls() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">
          GitHub URL <span className="text-red-500">*</span>
        </label>
        <Input
          type="url"
          {...register('githubUrl', {
            required: 'GitHub URL을 입력해주세요.',
          })}
          placeholder="https://github.com/..."
        />
        {errors.githubUrl && (
          <p className="mt-1 text-xs text-red-500">
            {String(errors.githubUrl?.message)}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Live URL (선택)
        </label>
        <Input type="url" {...register('liveUrl')} placeholder="https://..." />
      </div>
    </div>
  );
}
