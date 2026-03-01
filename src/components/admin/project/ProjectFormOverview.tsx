'use client';

import { useFormContext } from 'react-hook-form';

export default function ProjectFormOverview() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Overview</label>
        <textarea
          {...register('detail.overview')}
          rows={3}
          className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          placeholder="프로젝트 개요를 입력하세요"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Overview (English)
        </label>
        <textarea
          {...register('detail.overviewEn')}
          rows={3}
          className="focus:border-seagull-500 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          placeholder="Enter the project overview in English"
        />
      </div>
    </div>
  );
}
