'use client';

import Input from '@/components/common/Input';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormTimeline() {
  const { register } = useFormContext();

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">Timeline</label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs text-gray-600">시작일</label>
          <Input
            type="text"
            {...register('detail.timeline.startDate')}
            placeholder="2024.01"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">종료일</label>
          <Input
            type="text"
            {...register('detail.timeline.endDate')}
            placeholder="2024.12"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">기간</label>
          <Input
            type="text"
            {...register('detail.timeline.duration')}
            placeholder="12개월"
          />
        </div>
      </div>
    </div>
  );
}
