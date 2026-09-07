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
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <span>카테고리</span>
        <span className="text-xs font-medium text-red-600">필수</span>
      </label>
      <select
        {...register('category', {
          required: '카테고리를 선택해주세요.',
        })}
        aria-invalid={Boolean(errors.category)}
        className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 focus:ring-2 focus:outline-none"
      >
        {PROJECT_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {String(errors.category?.message)}
        </p>
      )}
    </div>
  );
}
