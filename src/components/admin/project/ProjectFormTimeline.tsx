'use client';

import Input from '@/components/common/Input';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormTimeline() {
  const { register } = useFormContext();

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-800">진행 기간</p>
        <span className="text-xs font-medium text-gray-400">선택</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            시작일
          </label>
          <Input
            type="text"
            {...register('detail.timeline.startDate')}
            placeholder="2024.01"
            className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            종료일
          </label>
          <Input
            type="text"
            {...register('detail.timeline.endDate')}
            placeholder="2024.12"
            className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            기간
          </label>
          <Input
            type="text"
            {...register('detail.timeline.duration')}
            placeholder="12개월"
            className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
