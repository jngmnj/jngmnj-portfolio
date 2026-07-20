'use client';

import { PROJECT_CATEGORIES } from '@/app/lib/constants';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormCategory() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        카테고리 <span className="text-red-500">*</span>
      </label>
      <select
        {...register('category', {
          required: '카테고리를 선택해주세요.',
        })}
        className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
      >
        {PROJECT_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className="mt-1 text-xs text-red-500">
          {String(errors.category?.message)}
        </p>
      )}
    </div>
  );
}
